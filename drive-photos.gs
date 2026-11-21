/**
 * Sakinah photo album: saves photos into Sadiq's Google Drive.
 * Deploy: Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone.
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
