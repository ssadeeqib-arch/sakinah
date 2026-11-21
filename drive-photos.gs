/**
 * Sakinah photo album: saves photos into Sadiq's Google Drive.
 * Deploy: Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone.
 * It also sends phone alerts (Firebase Cloud Messaging) when one of you sends something to the other.
 * Only the two signed-in members of the couple can use it. Each request carries
 * a Firebase sign-in token that is checked with Google before anything is saved or read.
 */
var API_KEY = 'AIzaSyDKuRfO5K0RLIasmYkWWQPXuaXIeF6AlSI';
var PROJECT = 'sakinah-280cf';
var ROOT = 'Sakinah Photos';
var ALBUMS = { us: 'Us two', kids: 'Our kids' };

function doGet() { return out({ ok: true, app: 'Sakinah photos' }); }

function doPost(e) {
  try {
    var q = JSON.parse(e.postData.contents);
    var who = check(q.tok, q.cid);
    if (q.a === 'up') return out(upload(q, who));
    if (q.a === 'get') return out(fetchPhoto(inAlbum(q.id)));
    if (q.a === 'notify') return out(notify(q, who));
    if (q.a === 'del') { DriveApp.getFileById(inAlbum(q.id)).setTrashed(true); return out({ ok: true }); }
    return out({ ok: false, err: 'unknown action' });
  } catch (err) {
    return out({ ok: false, err: String(err && err.message || err) });
  }
}

/* Confirms the token is a real sign-in for this app and that the person is in the couple. */
function check(tok, cid) {
  if (!tok || !cid || !/^[A-Za-z0-9]{6,40}$/.test(cid)) throw new Error('not allowed');
  var cache = CacheService.getScriptCache(), key = 'ok_' + Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, tok + cid));
  var hit = cache.get(key); if (hit) return hit;
  var r = UrlFetchApp.fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=' + API_KEY, {
    method: 'post', contentType: 'application/json', payload: JSON.stringify({ idToken: tok }), muteHttpExceptions: true });
  if (r.getResponseCode() !== 200) throw new Error('sign-in expired');
  var uid = JSON.parse(r.getContentText()).users[0].localId;
  var d = UrlFetchApp.fetch('https://firestore.googleapis.com/v1/projects/' + PROJECT + '/databases/(default)/documents/couples/' + cid, {
    headers: { Authorization: 'Bearer ' + tok }, muteHttpExceptions: true });
  if (d.getResponseCode() !== 200) throw new Error('not allowed');
  var doc = JSON.parse(d.getContentText());
  var mem = (((doc.fields || {}).members || {}).arrayValue || {}).values || [];
  if (!mem.some(function (v) { return v.stringValue === uid; })) throw new Error('not allowed');
  cache.put(key, uid, 1800);
  return uid;
}

/* Only photos inside the Sakinah albums can be viewed or removed through the app. */
function inAlbum(id) {
  var ok = [folder('us').getId(), folder('kids').getId()];
  var ps = DriveApp.getFileById(String(id)).getParents();
  while (ps.hasNext()) if (ok.indexOf(ps.next().getId()) >= 0) return String(id);
  throw new Error('not allowed');
}

function folder(album) {
  var name = ALBUMS[album]; if (!name) throw new Error('unknown album');
  var root = sub(DriveApp.getRootFolder(), ROOT);
  return sub(root, name);
}
function sub(parent, name) {
  var it = parent.getFoldersByName(name);
  return it.hasNext() ? it.next() : parent.createFolder(name);
}

function upload(q, uid) {
  var f = folder(q.album);
  var mime = /^image\/(jpeg|png|webp|heic|heif|gif)$/.test(q.mime || '') ? q.mime : 'image/jpeg';
  var name = String(q.name || 'photo.jpg').replace(/[^\w .()-]/g, '_').slice(0, 80);
  var blob = Utilities.newBlob(Utilities.base64Decode(q.data), mime, name);
  var file = f.createFile(blob);
  if (q.cap) file.setDescription(String(q.cap).slice(0, 500) + ' (added by ' + (q.by || 'Sakinah') + ')');
  return { ok: true, id: file.getId() };
}

/* Returns a phone-sized copy of the photo for viewing in the app. */
function fetchPhoto(id) {
  var token = ScriptApp.getOAuthToken();
  try {
    var m = UrlFetchApp.fetch('https://www.googleapis.com/drive/v3/files/' + id + '?fields=thumbnailLink', {
      headers: { Authorization: 'Bearer ' + token }, muteHttpExceptions: true });
    var link = JSON.parse(m.getContentText()).thumbnailLink;
    if (link) {
      var img = UrlFetchApp.fetch(link.replace(/=s\d+$/, '=s1600'), { headers: { Authorization: 'Bearer ' + token }, muteHttpExceptions: true });
      if (img.getResponseCode() === 200) return { ok: true, mime: 'image/jpeg', b64: Utilities.base64Encode(img.getContent()) };
    }
  } catch (e) {}
  var b = DriveApp.getFileById(id).getBlob();
  return { ok: true, mime: b.getContentType(), b64: Utilities.base64Encode(b.getBytes()) };
}

function out(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

/* Run once from the editor to approve Drive access and create the folders. */
function setup() { folder('us'); folder('kids'); Logger.log('Folders ready'); }


/* ---------- Phone alerts ---------- */
var NOTE = {
  text: ['New message', 'sent you a message', 'chat'],
  quick: ['New message', 'sent you a message', 'chat'],
  whisper: ['A whisper for you', 'sent you a whisper', 'chat'],
  card: ['A gift for you', 'sent you something to read', 'chat'],
  pc: ['A postcard for you', 'sent you a postcard', 'chat'],
  react: ['New reaction', 'reacted to something you sent', 'chat'],
  photo: ['New photo', 'added a photo to the album', 'album'],
  beat: ['A heartbeat', 'is thinking of you', 'us']
};

/* Sends a short alert to the other person's phones. Never includes the message text. */
function notify(q, uid) {
  var kind = NOTE[q.kind] ? q.kind : 'text';
  var cache = CacheService.getScriptCache(), lk = 'n_' + uid + '_' + kind;
  if (cache.get(lk)) return { ok: true, skipped: 'recent' };
  cache.put(lk, '1', kind === 'beat' ? 300 : 6);
  var tok = ScriptApp.getOAuthToken();
  var H = { Authorization: 'Bearer ' + tok, 'x-goog-user-project': PROJECT };
  var base = 'https://firestore.googleapis.com/v1/projects/' + PROJECT + '/databases/(default)/documents/';
  var c = JSON.parse(UrlFetchApp.fetch(base + 'couples/' + q.cid, { headers: H }).getContentText());
  var f = c.fields || {};
  var mem = (((f.members || {}).arrayValue || {}).values || []).map(function (v) { return v.stringValue; });
  var other = mem.filter(function (id) { return id !== uid; })[0];
  if (!other) return { ok: true, sent: 0 };
  var roles = ((f.roles || {}).mapValue || {}).fields || {}, names = ((f.names || {}).mapValue || {}).fields || {};
  var myRole = (roles[uid] || {}).stringValue;
  var who = ((names[myRole] || {}).stringValue) || 'Your partner';
  var udoc = UrlFetchApp.fetch(base + 'users/' + other, { headers: H, muteHttpExceptions: true });
  if (udoc.getResponseCode() !== 200) return { ok: true, sent: 0 };
  var vals = ((((JSON.parse(udoc.getContentText()).fields || {}).fcm || {}).arrayValue || {}).values || []).map(function (v) { return v.stringValue; });
  var keep = [], sent = 0, n = NOTE[kind];
  vals.forEach(function (t) {
    var r = UrlFetchApp.fetch('https://fcm.googleapis.com/v1/projects/' + PROJECT + '/messages:send', {
      method: 'post', contentType: 'application/json', headers: H, muteHttpExceptions: true,
      payload: JSON.stringify({ message: { token: t,
        data: { title: n[0], body: who + ' ' + n[1], tag: kind, url: './?tab=' + n[2] },
        webpush: { headers: { Urgency: 'high', TTL: '86400' } } } }) });
    var code = r.getResponseCode();
    if (code === 200) { keep.push(t); sent++; }
    else if (code !== 404 && code !== 400) keep.push(t); /* keep the token on temporary errors */
    else Logger.log('Removed an old phone token: ' + r.getContentText().slice(0, 120));
  });
  if (keep.length !== vals.length) {
    UrlFetchApp.fetch(base + 'users/' + other + '?updateMask.fieldPaths=fcm', { method: 'patch', contentType: 'application/json', headers: H, muteHttpExceptions: true,
      payload: JSON.stringify({ fields: { fcm: { arrayValue: { values: keep.map(function (t) { return { stringValue: t }; }) } } } }) });
  }
  return { ok: true, sent: sent };
}

/* Run once from the editor to approve the new permissions and test the sender. */
function testNotify() {
  var tok = ScriptApp.getOAuthToken();
  var r = UrlFetchApp.fetch('https://fcm.googleapis.com/v1/projects/' + PROJECT + '/messages:send', {
    method: 'post', contentType: 'application/json', muteHttpExceptions: true,
    headers: { Authorization: 'Bearer ' + tok, 'x-goog-user-project': PROJECT },
    payload: JSON.stringify({ validate_only: true, message: { topic: 'test', data: { a: 'b' } } }) });
  Logger.log(r.getResponseCode() + ' ' + r.getContentText().slice(0, 300));
}
