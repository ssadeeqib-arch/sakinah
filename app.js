{
const $=s=>document.querySelector(s);
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const IC={
img:'<rect x="3.5" y="4.5" width="17" height="15" rx="3"/><circle cx="9" cy="10" r="1.8"/><path d="M4 17l4.5-4.5 3.5 3.5 3-3 5 5"/>',
plus:'<path d="M12 5v14M5 12h14"/>',
trash:'<path d="M5 7h14M10 7V5h4v2M7 7l1 12h8l1-12"/>',
sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/>',
grid:'<rect x="3.5" y="3.5" width="7" height="7" rx="2"/><rect x="13.5" y="3.5" width="7" height="7" rx="2"/><rect x="3.5" y="13.5" width="7" height="7" rx="2"/><rect x="13.5" y="13.5" width="7" height="7" rx="2"/>',
heart:'<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
chat:'<path d="M4 5h16v11H9l-5 4z"/>',
spark:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>',
gear:'<circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>',
book:'<path d="M6 3h12v18l-6-4-6 4z"/>',
send:'<path d="M4 12l16-8-6 16-3-6z"/>',
sound:'<path d="M4 9.5v5h3.5l4.5 4V5.5l-4.5 4zM15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>',
check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
vol:'<path d="M4 9.5v5h3.5l4.5 4V5.5l-4.5 4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>',
volx:'<path d="M4 9.5v5h3.5l4.5 4V5.5l-4.5 4z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/>',
bell:'<path d="M6 17V11a6 6 0 1112 0v6l1.5 2h-15L6 17z"/><path d="M10 21h4"/>',
close:'<path d="M6 6l12 12M18 6L6 18"/>',
back:'<path d="M15 5l-7 7 7 7"/>',
flame:'<path d="M12 21c-4 0-6.5-2.8-6.5-6.2C5.5 10.5 10 9 10 4c3 1.8 4.5 4.3 4.3 6.8C15.5 10 16 9 16 8c2 2 2.5 4.6 2.5 6.8C18.5 18.2 16 21 12 21z"/>',
cal:'<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
gift:'<rect x="3.5" y="9" width="17" height="12" rx="1.5"/><path d="M3.5 13h17M12 9v12M12 9C10 5 6.5 5 6.5 7.3S12 9 12 9zm0 0c2-4 5.5-4 5.5-1.7S12 9 12 9z"/>',
shuffle:'<path d="M3 7h4c4 0 6 10 10 10h4M3 17h4c1.5 0 2.7-1.4 3.7-3M14 10c1-1.7 2-3 3-3h4M18 4l3 3-3 3M18 14l3 3-3 3"/>',
mail:'<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/>',
out:'<path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10"/>',
play:'<path d="M8 5.5v13l11-6.5z" fill="currentColor"/>'};
const ic=(n,c)=>'<svg class="'+(c==null?"i":c)+'" viewBox="0 0 24 24" aria-hidden="true">'+IC[n]+'</svg>';
const heartFill='<svg viewBox="0 0 24 24"><path d="M12 21s-8-5-8-11.2A4.6 4.6 0 0 1 12 6.6a4.6 4.6 0 0 1 8 3.2C20 16 12 21 12 21z"/></svg>';
const z=n=>String(n).padStart(2,"0");
const dk=d=>d.getFullYear()+"-"+z(d.getMonth()+1)+"-"+z(d.getDate());
const today=()=>dk(new Date());
const dayN=()=>Math.floor((new Date(today()+"T12:00:00")-new Date("2026-01-01T12:00:00"))/864e5);
const weekKey=()=>{const d=new Date(today()+"T12:00:00");const m=(d.getDay()+6)%7;d.setDate(d.getDate()-m);return dk(d)};
const weekN=()=>Math.floor(dayN()/7);
const DEL="__del__";const inc=n=>({__inc:n});

const S={mode:null,ready:false,screen:"splash",r:null,o:null,tab:(["today","explore","us","album","chat","glow"].includes(new URLSearchParams(location.search).get("tab"))?new URLSearchParams(location.search).get("tab"):"today"),couple:null,st:{h:{},w:{}},msgs:[],games:[],day:{},sub:null,user:null,code:null};
let A=null;
const me=()=>S.st[S.r]||{},them=()=>S.st[S.o]||{};
const nm=r=>(S.couple&&S.couple.names&&S.couple.names[r])||(r==="h"?"Sadiq":"Fatima");
const ME=()=>nm(S.r),THEM=()=>nm(S.o);
const isW=()=>S.r==="w";

/* ---------- adapters ---------- */
function deep(t,s){for(const k in s){const v=s[k];if(v===DEL)delete t[k];else if(v&&typeof v==="object"&&"__inc" in v)t[k]=(Number(t[k])||0)+v.__inc;else if(v&&typeof v==="object"&&!Array.isArray(v)){if(!t[k]||typeof t[k]!=="object")t[k]={};deep(t[k],v)}else t[k]=v}return t}
function localAdapter(role){const K="sakinah2.demo";let D=null;try{D=JSON.parse(localStorage.getItem(K)||"null")}catch(e){}
D=D||{docs:{"":{names:{h:"Sadiq",w:"Fatima"},members:["demo-h","demo-w"],roles:{"demo-h":"h","demo-w":"w"}}},colls:{msgs:{},games:{},photos:{}}};D.colls.photos=D.colls.photos||{};
const W={},CW={};const save=()=>{try{localStorage.setItem(K,JSON.stringify(D))}catch(e){}};
const isColl=p=>{const a=p.split("/");return(a[0]==="msgs"||a[0]==="games"||a[0]==="photos")&&a.length===2};
const getD=p=>{if(isColl(p)){const a=p.split("/");return D.colls[a[0]][a[1]]||null}return D.docs[p]||null};
const list=c=>Object.entries(D.colls[c]).map(([id,v])=>Object.assign({id},v)).sort((a,b)=>b.t-a.t);
const fire=p=>{const c=JSON.parse(JSON.stringify(getD(p)));(W[p]||[]).forEach(cb=>cb(c));if(isColl(p)){const k=p.split("/")[0];(CW[k]||[]).forEach(f=>f[0](list(k).slice(0,f[1])))}};
return{watch:(p,cb)=>{(W[p]=W[p]||[]).push(cb);setTimeout(()=>cb(JSON.parse(JSON.stringify(getD(p)))),0);return()=>{W[p]=W[p].filter(x=>x!==cb)}},
watchColl:(c,n,cb)=>{const f=[cb,n];(CW[c]=CW[c]||[]).push(f);setTimeout(()=>cb(list(c).slice(0,n)),0);return()=>{CW[c]=CW[c].filter(x=>x!==f)}},
merge:(p,d)=>{if(isColl(p)){const a=p.split("/");D.colls[a[0]][a[1]]=deep(D.colls[a[0]][a[1]]||{},d)}else D.docs[p]=deep(D.docs[p]||{},d);save();fire(p);return Promise.resolve()},
add:(c,d)=>{const id="x"+Date.now()+Math.random().toString(36).slice(2,6);D.colls[c][id]=d;save();fire(c+"/"+id);return Promise.resolve(id)},
reset:()=>{try{localStorage.removeItem(K)}catch(e){}}}}
function fireAdapter(F,db,cid){const base=["couples",cid];
const ref=p=>p?F.doc(db,...base,...p.split("/")):F.doc(db,...base);
const conv=o=>{const r={};for(const k in o){const v=o[k];r[k]=v===DEL?F.deleteField():(v&&typeof v==="object"&&"__inc" in v)?F.increment(v.__inc):(v&&typeof v==="object"&&!Array.isArray(v))?conv(v):v}return r};
const err=e=>{console.warn(e);if(e&&e.code==="permission-denied")toast("You don’t have access to this space.")};
return{watch:(p,cb)=>F.onSnapshot(ref(p),s=>cb(s.exists()?s.data():null),err),
watchColl:(c,n,cb)=>F.onSnapshot(F.query(F.collection(db,...base,c),F.orderBy("t","desc"),F.limit(n)),qs=>cb(qs.docs.map(d=>Object.assign({id:d.id},d.data()))),err),
merge:(p,d)=>F.setDoc(ref(p),conv(d),{merge:true}).catch(err),
add:(c,d)=>F.addDoc(F.collection(db,...base,c),d).then(r=>r.id).catch(err)}}

let unsubs=[];
function attach(){unsubs.forEach(u=>{try{u()}catch(e){}});unsubs=[];
unsubs.push(A.watch("",d=>{S.couple=d||S.couple;render()}));
S.stOk=false;["h","w"].forEach(r=>unsubs.push(A.watch("state/"+r,d=>{S.st[r]=d||{};if(r===S.r&&!S.stOk){S.stOk=true;setTimeout(checkEnvelope,200)}soft()})));
unsubs.push(A.watchColl("msgs",300,l=>{const old=S.msgs.length;S.msgs=l;soft(true);checkEnvelope();if(old&&l.length>old&&l[0].from===S.o&&S.tab!=="chat"&&l[0].k==="text"){SFX.play("recv");toast(THEM()+": "+String(l[0].x).slice(0,60))}}));
unsubs.push(A.watchColl("games",30,l=>{S.games=l;soft()}));
let phFirst=true;unsubs.push(A.watchColl("photos",800,l=>{const old=new Set((S.photos||[]).map(p=>p.id));S.photos=l.filter(p=>!p.gone);const fresh=S.photos.filter(p=>p.by===S.o&&!old.has(p.id));if(!phFirst&&fresh.length&&S.tab!=="album")toast(THEM()+" added "+(fresh.length>1?fresh.length+" photos":"a photo")+" to "+ALB[fresh[0].album]);phFirst=false;if(S.tab==="album")seePhotos();soft()}));
watchDay()}
let dayUn=null,dayKey=null,lastBeats=null;
function watchDay(){dayKey=today();if(dayUn)dayUn();dayUn=A.watch("days/"+dayKey,d=>{S.day=d||{};const b=(S.day.beats||{})[S.o]||0;if(lastBeats!=null&&b>lastBeats){heartsBurst(18);toast(THEM()+" is thinking of you")}lastBeats=b;soft()})}
document.addEventListener("visibilitychange",()=>{if(!document.hidden&&A&&dayKey!==today()){lastBeats=null;watchDay();render()}});

/* ---------- maths ---------- */
const lpTotal=()=>(Number(S.st.h.lp)||0)+(Number(S.st.w.lp)||0);
function lvl(x){let i=0;COUPLE_LEVELS.forEach((L,j)=>{if(x>=L[0])i=j});const nx=COUPLE_LEVELS[i+1];return{i,n:COUPLE_LEVELS[i][1],next:nx,p:nx?(x-COUPLE_LEVELS[i][0])/(nx[0]-COUPLE_LEVELS[i][0]):1}}
const readOf=st=>st.read||{};
function readDays(st){const c={};Object.values(readOf(st)).forEach(t=>{const d=dk(new Date(t));c[d]=(c[d]||0)+1});return c}
function streak(st){const c=readDays(st);let s=0;const d=new Date();if((c[dk(d)]||0)<3)d.setDate(d.getDate()-1);while(s<999&&(c[dk(d)]||0)>=3){s++;d.setDate(d.getDate()-1)}return s}
const glowPts=st=>Object.keys(readOf(st)).length*5+Object.keys(st.tried||{}).length*15;
function ringOf(st,s){const ids=CARDS.filter(c=>c.s===s).map(c=>c.id);const r=ids.filter(id=>readOf(st)[id]).length,t=ids.filter(id=>(st.tried||{})[id]).length;return Math.min(1,(r+t)/(ids.length*1.5))}
function todaysFive(){const n=dayN();return(DECK[S.r]||Object.keys(STASHES)).map((s,i)=>{const L=CARDS.filter(c=>c.s===s);return L[(n+i*3)%L.length]})}
function fromHim(){const seen=new Set();return S.msgs.filter(m=>m.k==="card"&&m.from===S.o).filter(m=>{if(seen.has(m.card)||readOf(me())[m.card])return false;seen.add(m.card);return true}).map(m=>CARDS.find(c=>c.id===m.card)).filter(Boolean)}
const newPh=()=>(S.photos||[]).filter(p=>p.by===S.o&&p.t>(me().seenPh||0)).length;
function unread(){const lr=me().lastRead||0;return S.msgs.filter(m=>m.from===S.o&&m.t>lr&&m.k!=="react").length}

/* ---------- fx ---------- */
function toast(t){const el=$("#toast");el.textContent=t;el.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove("on"),2600)}
function heartsBurst(n,x,y){const fx=$("#fx");x=x==null?innerWidth/2:x;y=y==null?innerHeight/2:y;for(let i=0;i<(n||14);i++){const h=document.createElement("div");h.className="fh";h.innerHTML=heartFill;const a=Math.random()*Math.PI*2,r=60+Math.random()*120;h.style.cssText="left:"+(x-11)+"px;top:"+(y-11)+"px;color:"+(i%3?"var(--rose)":i%2?"var(--gold)":"#fff")+";--dx:"+Math.cos(a)*r+"px;--dy:"+(Math.sin(a)*r-80)+"px;--r:"+(Math.random()*80-40)+"deg";fx.appendChild(h);setTimeout(()=>h.remove(),1700)}}
function burstAt(el,n){const r=el.getBoundingClientRect();heartsBurst(n,r.left+r.width/2,r.top+r.height/2)}
function speak(t){try{const u=new SpeechSynthesisUtterance(t);u.lang="en-GB";u.rate=.95;const vs=speechSynthesis.getVoices();const v=vs.find(v=>v.lang.startsWith("en")&&/female|samantha|serena|victoria|karen|moira|tessa|zira|libby|sonia/i.test(v.name))||vs.find(v=>v.lang.startsWith("en"));if(v)u.voice=v;speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){toast("Listening isn’t available on this phone")}}
let AUD=null,audId=null;
function stopAudio(){try{speechSynthesis.cancel()}catch(e){}if(AUD){AUD.pause();AUD=null}audId=null;document.querySelectorAll(".playing").forEach(x=>x.classList.remove("playing"))}
function playCard(id,btn){const was=audId===id;stopAudio();if(was)return;const c=CARDS.find(x=>x.id===id)||storyOf(id);if(!c)return;audId=id;document.querySelectorAll('[data-a="listen"][data-id="'+id+'"]').forEach(x=>x.classList.add("playing"));
const fallback=()=>{if(audId!==id)return;speak(c.p?c.t+". "+c.p.join(" ")+" The heart of it: "+c.m:c.t+". "+(c.q?c.q[0]+" ":"")+cB(c)+" "+(c.f&&c.f[0]?c.f[0]+" ":"")+"Try it today: "+cA(c));setTimeout(()=>{if(audId===id)markRead(id)},4000)};
if(location.protocol==="https:"&&!location.hostname.endsWith("claude.ai")&&!location.hostname.endsWith("claudeusercontent.com")){AUD=new Audio("audio/"+id+(!c.p&&S.r==="h"&&(c.ha||c.hb)?"h":"")+".mp3");AUD.onended=()=>{stopAudio();markRead(id)};AUD.onerror=()=>{AUD=null;fallback()};AUD.play().catch(()=>{AUD=null;fallback()})}else fallback()}
function vib(){try{navigator.vibrate&&navigator.vibrate(15)}catch(e){}}
const addLP=n=>A.merge("state/"+S.r,{lp:inc(n)});

/* ---------- postcard art ---------- */
let gid=0;
function art(p){if(p.photo)return'<div class="phpc" style="background-image:url('+photo(p.photo,600)+')"><span>'+esc(p.t)+'</span></div>';const g="g"+(gid++),c0=p.c[0],c1=p.c[1];let s='<svg viewBox="0 0 300 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="'+g+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="'+c0+'"/><stop offset="1" stop-color="'+c1+'"/></linearGradient></defs><rect width="300" height="180" fill="url(#'+g+')"/>';
const stars=n=>{let o="";for(let i=0;i<n;i++)o+='<circle class="a-tw" style="animation-delay:'+(i*.37%2.4).toFixed(2)+'s" cx="'+((i*61+23)%290)+'" cy="'+((i*37+11)%100+6)+'" r="'+(i%3?1.1:1.8)+'" fill="#fff"/>';return o};
const hearts=(n,y)=>{let o="";for(let i=0;i<n;i++)o+='<path class="a-up" style="animation-delay:'+(i*.8)+'s" transform="translate('+(60+i*45)+' '+y+') scale(.7)" d="M12 21s-8-5-8-11.2A4.6 4.6 0 0 1 12 6.6a4.6 4.6 0 0 1 8 3.2C20 16 12 21 12 21z" fill="#ffd0dc" opacity=".9"/>';return o};
switch(p.art){
case"birds":s+=stars(6)+'<path d="M0 118 Q150 100 300 118" stroke="#2a0f1c" stroke-width="2" fill="none"/><g transform="translate(108 92)"><ellipse cx="0" cy="10" rx="14" ry="11" fill="#2a0f1c"/><circle cx="9" cy="1" r="7" fill="#2a0f1c"/><path d="M15 1l6 2-6 2z" fill="#f2c46d"/></g><g transform="translate(196 92) scale(-1 1)"><ellipse cx="0" cy="10" rx="14" ry="11" fill="#2a0f1c"/><circle cx="9" cy="1" r="7" fill="#2a0f1c"/><path d="M15 1l6 2-6 2z" fill="#f2c46d"/></g>'+hearts(3,70);break;
case"moon":s+=stars(16)+'<path d="M196 30a40 40 0 1 0 34 62 32 32 0 1 1-34-62z" fill="#f6e2a8" class="a-glow"/>';break;
case"cups":s+='<g fill="#fff4ea"><path d="M88 96h50v34a14 14 0 0 1-14 14h-22a14 14 0 0 1-14-14z"/><path d="M162 96h50v34a14 14 0 0 1-14 14h-22a14 14 0 0 1-14-14z"/></g><g stroke="#fff4ea" stroke-width="3" fill="none" stroke-linecap="round"><path d="M138 104c10 0 10 18 0 18M212 104c10 0 10 18 0 18"/><path class="a-steam" d="M104 88c-6-8 6-12 0-22M122 88c-6-8 6-12 0-22"/><path class="a-steam" style="animation-delay:1s" d="M178 88c-6-8 6-12 0-22M196 88c-6-8 6-12 0-22"/></g><path d="M150 62s-9-5-9-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6-9 11-9 11z" fill="#f4a6b8" class="a-beat"/><rect y="144" width="300" height="36" fill="rgba(0,0,0,.25)"/>';break;
case"star":s+=stars(10)+'<g class="a-spin"><path d="M150 40l12 34 36 6-36 6-12 34-12-34-36-6 36-6z" fill="#fff1c9"/></g><circle cx="150" cy="80" r="46" fill="none" stroke="#fff1c9" stroke-opacity=".3" stroke-width="2"/>';break;
case"lake":s+=stars(8)+'<circle cx="150" cy="58" r="26" fill="#f6e2a8"/><rect y="104" width="300" height="76" fill="rgba(0,20,30,.45)"/><g fill="#f6e2a8" opacity=".6"><rect class="a-wave" x="128" y="114" width="44" height="3" rx="2"/><rect class="a-wave" style="animation-delay:.6s" x="134" y="126" width="32" height="3" rx="2"/><rect class="a-wave" style="animation-delay:1.2s" x="140" y="138" width="20" height="3" rx="2"/></g>';break;
case"sun":s+='<g class="a-spin" style="transform-origin:150px 130px">'+Array.from({length:12},(_,i)=>'<rect x="148" y="40" width="4" height="30" rx="2" fill="#ffe2a8" opacity=".7" transform="rotate('+(i*30)+' 150 130)"/>').join("")+'</g><circle cx="150" cy="130" r="38" fill="#ffd27a"/><rect y="128" width="300" height="52" fill="rgba(60,20,10,.55)"/>';break;
case"flower":s+='<g class="a-sway"><path d="M150 180V96" stroke="#3d7a3a" stroke-width="5"/><path d="M150 140c-20-4-28-18-28-18s18-2 28 10z" fill="#4f9a4a"/>'+Array.from({length:12},(_,i)=>'<ellipse cx="150" cy="58" rx="9" ry="22" fill="#ffd23a" transform="rotate('+(i*30)+' 150 80)"/>').join("")+'<circle cx="150" cy="80" r="16" fill="#6a3a12"/></g>'+hearts(2,60);break;
case"lantern":s+=stars(10)+'<path d="M150 0v34" stroke="#f2c46d" stroke-width="2"/><g class="a-sway" style="transform-origin:150px 34px"><path d="M134 40h32l6 10v44l-6 10h-32l-6-10V50z" fill="#f2c46d"/><rect x="136" y="54" width="28" height="36" rx="4" fill="#fff6d0" class="a-glow"/><path d="M140 34h20v6h-20z" fill="#b8872c"/></g><circle cx="150" cy="72" r="60" fill="#f2c46d" opacity=".12" class="a-glow"/>';break;
case"house":s+=stars(12)+'<path d="M95 100l55-44 55 44v62H95z" fill="#2a1430"/><rect x="138" y="118" width="24" height="44" fill="#1a0c1e"/><rect x="108" y="108" width="20" height="18" fill="#ffd27a" class="a-glow"/><rect x="172" y="108" width="20" height="18" fill="#ffd27a" class="a-glow" style="animation-delay:1s"/><path d="M150 84s-7-4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5-7 9-7 9z" fill="#f4a6b8"/>';break;
case"heart":s+='<g class="a-beat"><path transform="translate(102 34) scale(4)" d="M12 21s-8-5-8-11.2A4.6 4.6 0 0 1 12 6.6a4.6 4.6 0 0 1 8 3.2C20 16 12 21 12 21z" fill="#ffd0dc"/></g>'+hearts(4,150)+'<rect x="16" y="16" width="268" height="148" rx="10" fill="none" stroke="#fff" stroke-opacity=".5" stroke-dasharray="6 6"/>';break}
return s+'</svg>'}
const PC=id=>POSTCARDS.find(p=>p.id===id)||POSTCARDS[0];
const photo=(k,w)=>"https://images.unsplash.com/photo-"+(PHOTOS[k]||PHOTOS.rose1)+"?auto=format&fit=crop&w="+(w||800)+"&q=70";
function cardPhoto(c){if(c.img)return c.img;const L=STASH_PHOTOS[c.s]||["rose1"];const i=CARDS.filter(x=>x.s===c.s).indexOf(c);return L[i%L.length]}
function bloom(x,y,r,c,rot){let o='<g transform="translate('+x+' '+y+') rotate('+(rot||0)+')">';for(let k=0;k<5;k++)o+='<ellipse cx="0" cy="'+(-r*.55)+'" rx="'+(r*.42)+'" ry="'+(r*.6)+'" style="fill:'+c+'" transform="rotate('+(k*72)+')"/>';return o+'<circle r="'+(r*.28)+'" style="fill:var(--gold)"/></g>'}
function spray(cls){return'<svg class="'+(cls||"spray")+'" viewBox="0 0 160 120" aria-hidden="true"><path d="M150 8 C110 20 90 50 60 62 S14 92 6 116" fill="none" style="stroke:var(--leaf)" stroke-width="2.2"/><g style="fill:var(--leaf)"><path d="M118 26c-10-2-16 4-18 10 8 1 15-3 18-10z"/><path d="M86 52c-2-9-10-12-16-11 1 7 7 12 16 11z"/><path d="M48 76c-9-1-15 5-16 11 8 0 14-4 16-11z"/><path d="M30 92c2 8 9 11 15 10-1-6-7-11-15-10z"/></g>'+bloom(140,14,15,"var(--rose)",10)+bloom(104,34,11,"var(--blush)",40)+bloom(70,58,13,"var(--rose2)",0)+bloom(38,82,9,"var(--blush)",20)+bloom(16,104,11,"var(--rose)",50)+'</svg>'}

/* ---------- card view ---------- */
const cA=(c,r)=>((r||S.r)==="h"&&c.ha)||c.a,cB=(c,r)=>((r||S.r)==="h"&&c.hb)||c.b,canSend=c=>(SEND[S.r]||[]).includes(c.s);
function cardHTML(c,i,tot,from){const st=STASHES[c.s],m=me(),saved=(m.saved||{})[c.id],tried=(m.tried||{})[c.id],read=readOf(m)[c.id];
return'<article class="kc" data-card="'+c.id+'" style="--c:'+st.c+'"><div class="hero" style="background-image:url('+photo(cardPhoto(c),700)+')"><div class="top"><span class="sc">'+st.n+(c.from?' · '+c.from:'')+'</span>'+(from?'<span class="fromh">'+ic("heart")+'From '+esc(THEM())+'</span>':tot?'<span class="pg">'+(i+1)+' of '+tot+(read?' · read':'')+'</span>':"")+'</div><button class="play" data-a="listen" data-id="'+c.id+'" aria-label="Listen">'+ic("play")+'</button></div><h2>'+(S.r==="h"&&c.ht||c.t)+'</h2>'+(c.q?'<blockquote>“'+c.q[0]+'”<small>'+c.q[1]+'</small></blockquote>':"")+'<p class="b">'+cB(c)+'</p>'+(c.f&&c.f[0]?'<div class="faith">'+c.f[0]+(c.f[1]?'<small>'+c.f[1]+'</small>':"")+'</div>':c.f&&c.f[1]?'<div class="faith"><small>'+c.f[1]+'</small></div>':"")+
'<div class="try"><b>Try it today</b><p>'+cA(c)+'</p>'+triedBtn(c.id,!!tried)+'</div>'+
'<div class="acts"><button class="'+(saved?"on":"")+'" data-a="save" data-id="'+c.id+'">'+ic("book")+(saved?"Saved":"Save")+'</button><button data-a="listen" data-id="'+c.id+'">'+ic("sound")+'Listen</button>'+(canSend(c)?'<button data-a="sendcard" data-id="'+c.id+'">'+ic("send")+'Send to '+esc(THEM())+'</button>':'')+'</div></article>'}

/* ---------- views ---------- */
function greet(){const h=new Date().getHours();return h<12?"Good morning":h<17?"Good afternoon":"Good evening"}
function vToday(){const five=todaysFive(),fh=fromHim(),all=fh.concat(five),m=me();const nRead=five.filter(c=>readOf(m)[c.id]).length,N=five.length;
let o='<div class="todayhead">'+spray()+'<h1>'+greet()+', '+esc(ME())+'</h1><p class="mut sm" style="margin:2px 0 0">'+(nRead<N?"Today’s "+N+" ideas, then a story. Swipe, read or listen.":"All read today. MashaAllah!")+'</p><div class="dots">'+five.map(c=>'<i class="'+(readOf(m)[c.id]?"on":"")+'"></i>').join("")+'</div></div><div class="deck" id="deck">';
o+=fromStories().map(x=>storySlide(x,true)).join("");o+=all.map((c,i)=>cardHTML(c,i-fh.length,N,i<fh.length)).join("");o+=storySlide(storyDay(),false)+whisperSlide();
o+='<div class="endcard"><div><div class="splash" style="height:auto;padding:0"><div class="logo" style="width:70px;height:70px">'+heartFill+'</div></div><h2 style="margin:14px 0 6px">That’s today’s ideas</h2><p class="mut">Come back tomorrow for new ones. Meanwhile, send '+esc(THEM())+' some love.</p><button class="btn" data-a="tab" data-id="us">'+ic("heart")+'Go to Us</button></div></div></div>';
o+=jokeCard();return o}
function jokeCard(){const n=(dayN()+(S.jk||0))%JOKES.length;return'<div class="card joke" style="margin-top:14px">'+spray("spray sm")+'<span class="tag g">Joke of the day</span><p style="font-size:17px;line-height:1.5;margin:10px 0 12px;font-weight:700">'+JOKES[n]+'</p><div class="row" style="gap:8px"><button class="btn ghost sm" style="flex:1" data-a="joke">'+ic("spark")+'Another one</button><button class="btn sm" style="flex:1" data-a="sendjoke" data-i="'+n+'">'+ic("send")+'Send to '+esc(THEM())+'</button></div></div>'}
function vExplore(){if(S.sub==="stories")return vStories();if(S.sub){const s=S.sub,m=me();const L=s==="saved"?CARDS.filter(c=>(m.saved||{})[c.id]):CARDS.filter(c=>c.s===s);const st=STASHES[s]||{n:"Saved ideas",c:"#f4a6b8",d:"Ideas you kept"};
return'<div class="row" style="margin-top:4px"><button class="ib" data-a="sub" data-id="" aria-label="Back">'+ic("back")+'</button><div><h2>'+st.n+'</h2><p class="mut sm" style="margin:0">'+st.d+'</p></div></div>'+(L.length||(s==="saved"&&SSV().length)?L.map(c=>'<button class="li" style="--c:'+STASHES[c.s].c+'" data-a="open" data-id="'+c.id+'"><span class="ck '+(readOf(m)[c.id]?"on":"")+'" data-a="toggleread" data-id="'+c.id+'" role="checkbox" aria-checked="'+(!!readOf(m)[c.id])+'" aria-label="Mark as read or unread">'+(readOf(m)[c.id]?ic("check"):"")+'</span><span><b>'+c.t+'</b><small>'+(c.q?c.q[1]:cB(c).slice(0,60)+"…")+'</small></span></button>').join("")+(s==="saved"?SSV().map(storyRow).join(""):""):'<p class="mut" style="margin-top:20px">Nothing saved yet. Tap Save on any idea to keep it here.</p>')}
const m=me();return'<div class="hello flor">'+spray()+'<h1>Explore</h1><p>Read anything, any time. Every idea you read makes you glow.</p></div><div class="grid">'+storiesTile()+Object.entries(STASHES).sort((a,b)=>{const d=DECK[S.r]||[];const x=d.indexOf(a[0]),y=d.indexOf(b[0]);return(x<0?99:x)-(y<0?99:y)}).map(([k,s])=>{const L=CARDS.filter(c=>c.s===k),r=L.filter(c=>readOf(m)[c.id]).length;return'<button class="st" style="--c:'+s.c+';background-image:linear-gradient(170deg,transparent 20%,rgba(var(--bgrgb),.92) 80%),url('+photo((STASH_PHOTOS[k]||["rose1"])[0],500)+')" data-a="sub" data-id="'+k+'"><div><h3>'+s.n+'</h3><p>'+s.d+'</p></div><span class="n">'+r+' of '+L.length+' read</span></button>'}).join("")+'<button class="st" style="--c:#f4a6b8;background-image:linear-gradient(170deg,transparent 20%,rgba(var(--bgrgb),.92) 80%),url('+photo("paper",500)+')" data-a="sub" data-id="saved"><div><h3>Saved</h3><p>Your favourite ideas</p></div><span class="n">'+Object.keys(m.saved||{}).length+' saved</span></button></div>'}
function daysTo(){const m=S.couple&&S.couple.meet;if(!m)return null;const d=Math.round((new Date(m+"T12:00:00")-new Date(today()+"T12:00:00"))/864e5);return d}
function vUs(){const L=lvl(lpTotal()),d=daysTo(),beats=S.day.beats||{},qi=dayN()%QUESTIONS.length,qa=S.day.qa||{},mineA=qa[S.r],theirA=qa[S.o];
let o='<div class="uhero" style="background-image:linear-gradient(180deg,rgba(var(--bgrgb),.1),rgba(var(--bgrgb),.85)),url('+photo("hands",900)+')"><h1>'+esc(nm("w"))+' &amp; '+esc(nm("h"))+'</h1><p>Two hearts, one home.</p></div><div class="card hot">'+spray("spray sm")+'<div class="meter"><div class="heart">'+heartFill+'</div><div style="flex:1"><span class="tag g">Our love level</span><h2 style="margin:6px 0 2px">'+L.n+'</h2><div class="xs mut">'+lpTotal()+' love points'+(L.next?' · '+(L.next[0]-lpTotal())+' to '+L.next[1]:"")+'</div><div class="bar" style="margin-top:8px"><i style="width:'+Math.round(L.p*100)+'%"></i></div></div></div>';
o+='<div class="row between" style="margin-top:16px;padding-top:14px;border-top:1px solid var(--line)">'+(d!=null&&d>=0?'<div><div class="count">'+(d===0?"Today!":d)+'</div><div class="xs mut">'+(d===0?"We meet today":d===1?"day until we meet":"days until we meet")+'</div></div>':'<div class="sm mut">When do we meet next?</div>')+'<label class="btn ghost sm" style="position:relative">'+ic("cal")+(d!=null&&d>=0?"Change":"Set date")+'<input type="date" id="meet" value="'+esc(S.couple&&S.couple.meet||"")+'" style="position:absolute;inset:0;opacity:0;cursor:pointer"></label></div></div>';
o+='<div class="card" style="text-align:center"><h3>Send a heartbeat</h3><p class="mut sm" style="margin:4px 0 10px">One tap tells '+esc(THEM())+': I’m thinking of you.</p><button class="beatbtn" data-a="beat" id="beat" aria-label="Send a heartbeat">'+heartFill+'</button><p class="sm" style="margin:8px 0 0"><b style="color:var(--rose)">'+(beats[S.r]||0)+'</b> sent today · <b style="color:var(--gold)">'+(beats[S.o]||0)+'</b> from '+esc(THEM())+'</p></div>';
const recv=S.msgs.filter(m=>m.k==="pc"&&m.from===S.o).slice(0,6),seen=me().seenPc||0;
o+=whisperCard()+storyUsCard();o+='<div class="card"><div class="row between"><h3>Send a postcard</h3>'+ic("mail")+'</div><p class="mut sm" style="margin:4px 0 0">Make '+esc(THEM())+' smile. Pick a card.</p><div class="pcs">'+POSTCARDS.map(p=>'<button data-a="pc" data-id="'+p.id+'"><div class="mini">'+art(p)+'</div><span>'+p.t+'</span></button>').join("")+'</div>'+(recv.length?'<h3 style="margin-top:14px;font-size:19px">From '+esc(THEM())+'</h3><div class="inbox">'+recv.map(m=>{const p=PC(m.pc);return'<button data-a="viewpc" data-id="'+m.id+'"><div class="mini '+(m.t>seen?"new":"")+'">'+art(p)+'</div><small>'+(p.coupon?(m.used?"Coupon used":"Coupon"):p.t)+'</small></button>'}).join("")+'</div>':"")+'</div>';
o+='<div class="card"><span class="tag">Today’s question</span><h3 style="margin:8px 0 4px">'+QUESTIONS[qi]+'</h3>';
if(mineA){o+='<div class="qa"><b>You</b><p>'+esc(mineA)+'</p></div>'+(theirA?'<div class="qa"><b>'+esc(THEM())+'</b><p>'+esc(theirA)+'</p></div>':'<p class="mut sm" style="margin-top:10px">Waiting for '+esc(THEM())+'’s answer…</p>')}
else o+=(theirA?'<p class="sm" style="color:var(--gold);font-weight:800;margin:4px 0">'+esc(THEM())+' has answered! Answer to see it.</p>':'<p class="mut sm" style="margin:4px 0">Both answer. You see each other’s answer when both are done.</p>')+'<textarea id="qans" maxlength="500" placeholder="Your answer…" style="margin-top:8px"></textarea><button class="btn wide" style="margin-top:10px" data-a="answer">Share my answer · +10</button>';
o+='</div>';
const toGuess=S.games.filter(g=>g.by===S.o&&g.guess==null),done=S.games.filter(g=>g.guess!=null).slice(0,3),waiting=S.games.filter(g=>g.by===S.r&&g.guess==null);
o+='<div class="card"><span class="tag g">Game</span><h3 style="margin:8px 0 4px">Who knows me best?</h3><p class="mut sm" style="margin:0 0 10px">Answer a question about yourself. '+esc(THEM())+' has to guess!</p>';
toGuess.forEach(g=>{const G=GUESS[g.q];o+='<div class="qa"><b>'+esc(THEM())+' asks you to guess:</b><p style="font-weight:800">'+G.q+'</p>'+G.o.map((x,i)=>'<button class="opt" data-a="guess" data-id="'+g.id+'" data-i="'+i+'">'+x+'</button>').join("")+'</div>'});
done.forEach(g=>{const G=GUESS[g.q],ok=g.guess===g.ans,who=g.by===S.r?"you":esc(THEM());o+='<div class="qa"><b>'+(ok?"Correct! ":"Not quite! ")+'</b><p class="sm">'+G.q+' <b>'+G.o[g.ans]+'</b> ('+(g.by===S.r?esc(THEM())+" guessed "+G.o[g.guess]:"you guessed "+G.o[g.guess])+')</p></div>'});
if(waiting.length)o+='<p class="xs mut" style="margin-top:8px">'+waiting.length+' waiting for '+esc(THEM())+' to guess.</p>';
o+='<button class="btn gold wide" style="margin-top:12px" data-a="newgame">'+ic("spark")+'Ask a new question</button></div>';
const wk=weekKey(),n=weekN(),ms=[0,1,2].map(i=>(n*3+i)%MISSIONS.length),mm=(me().missions||{})[wk]||{},tm=(them().missions||{})[wk]||{};
o+='<div class="card"><span class="tag">This week’s love missions</span><p class="mut sm" style="margin:6px 0 4px">Do them together. Tick yours when done · +15 each</p>'+ms.map(i=>'<div class="mis"><p>'+MISSIONS[i]+'</p><button class="tk '+(mm[i]?"on":"")+'" data-a="mission" data-i="'+i+'" aria-label="Mark mine done">'+(mm[i]?ic("check"):"You")+'</button><span class="tk them '+(tm[i]?"on":"")+'" title="'+esc(THEM())+'">'+(tm[i]?ic("check"):esc(THEM().charAt(0)))+'</span></div>').join("")+'</div>';
return o}
function vGlow(){const who=S.gw||"w",P=S.st[who]||{},mine=who===S.r,name=esc(nm(who)),he=who==="h",st=streak(P),pts=glowPts(P),deck=DECK[who]||Object.keys(STASHES);
let o='<div class="seg" style="display:flex;gap:6px;margin:4px 0 12px">'+["w","h"].map(r=>'<button class="btn sm '+(who===r?"":"ghost")+'" style="flex:1" data-a="gw" data-id="'+r+'">'+(r===S.r?"Me":esc(nm(r)))+'</button>').join("")+'</div>';
o+='<div class="hello flor">'+spray()+'<h1>'+(mine?"Your glow":name+"’s glow")+'</h1><p>'+(mine?"Every idea you read and try makes you shine brighter.":"See how "+(he?"he":"she")+" is growing. Cheer "+(he?"him":"her")+" on in the chat.")+'</p></div>';
o+='<div class="stats"><div class="stat"><b>'+st+'</b><span>Day streak</span></div><div class="stat"><b>'+pts+'</b><span>Glow points</span></div><div class="stat"><b>'+Object.keys(P.tried||{}).length+'</b><span>Ideas tried</span></div></div>';
o+='<div class="card"><h3>Ways to glow</h3><div class="rings">'+deck.map(k=>{const s=STASHES[k],p=ringOf(P,k),C=2*Math.PI*26;return'<div><svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,.1)" stroke-width="7"/><circle cx="32" cy="32" r="26" fill="none" stroke="'+s.c+'" stroke-width="7" stroke-linecap="round" stroke-dasharray="'+(C*p).toFixed(1)+' '+C.toFixed(1)+'" transform="rotate(-90 32 32)"/><text x="32" y="37" text-anchor="middle" font-size="14" font-weight="800" fill="#fff3f0" font-family="Nunito,sans-serif">'+Math.round(p*100)+'</text></svg><span>'+s.n+'</span></div>'}).join("")+'</div></div>';
const days=[];for(let i=6;i>=0;i--){const x=new Date();x.setDate(x.getDate()-i);days.push(x)}const rd=readDays(P);
o+='<div class="card"><h3>This week</h3><div class="row" style="align-items:flex-end;gap:6px;margin-top:12px;height:90px">'+days.map(x=>{const v=rd[dk(x)]||0;return'<div style="flex:1;text-align:center"><div style="height:'+Math.max(4,Math.min(5,v)/5*70)+'px;border-radius:8px;background:'+(v?"linear-gradient(180deg,var(--gold),var(--rose))":"rgba(255,255,255,.08)")+'"></div><span class="xs mut">'+x.toLocaleDateString("en-GB",{weekday:"narrow"})+'</span></div>'}).join("")+'</div><p class="xs mut" style="margin:8px 0 0">Ideas read each day</p></div>';
const tr=Object.entries(P.tried||{}).sort((a,b)=>b[1]>a[1]?1:-1).slice(0,6);
o+='<div class="card"><h3>'+(mine?"What you tried":"What "+(he?"he":"she")+" tried")+'</h3>'+(tr.length?tr.map(([id])=>{const c=CARDS.find(x=>x.id===id),sy=!c&&storyOf(id);if(sy)return'<button class="li" style="--c:'+SCOL[sy.c]+'" data-a="story" data-id="'+sy.id+'"><span class="ck on"'+(mine?' data-a="untry" data-id="'+sy.id+'"':'')+'>'+ic("check")+'</span><span><b>'+((who==="h"&&sy.ha)||sy.a)+'</b><small>'+sy.t+'</small></span></button>';return c?'<button class="li" style="--c:'+STASHES[c.s].c+'" data-a="open" data-id="'+c.id+'"><span class="ck on"'+(mine?' data-a="untry" data-id="'+c.id+'"':'')+'>'+ic("check")+'</span><span><b>'+cA(c,who)+'</b><small>'+c.t+'</small></span></button>':""}).join(""):'<p class="mut sm">Nothing yet. Tap “I did it” on an idea.</p>')+'</div>';
const sv=Object.keys(P.saved||{}).map(id=>CARDS.find(c=>c.id===id)).filter(Boolean).slice(0,8);
o+='<div class="card"><h3>'+(mine?"Your saved ideas":"Ideas "+(he?"he":"she")+" saved")+'</h3>'+(sv.length?sv.map(c=>'<button class="li" data-a="open" data-id="'+c.id+'"><span class="ck">'+ic("book")+'</span><span><b>'+c.t+'</b><small>'+STASHES[c.s].n+'</small></span></button>').join(""):'<p class="mut sm">No saved ideas yet.</p>')+'</div>';
if(!mine)o+='<div class="card hot"><h3>Send '+(he?"him":"her")+' an idea</h3><p class="sm" style="margin:6px 0 12px">Open any idea in Explore and tap “Send to '+name+'”. It appears first in '+(he?"his":"her")+' Today, with your name on it.'+(he?' You can send him Love, World, Her Heart, Sharp Mind, Enterprise and Smile ideas.':' You can send her Confidence, Sharp Mind, Enterprise and Smile ideas: the ones that help her grow.')+'</p><button class="btn" data-a="tab" data-id="explore">'+ic("grid")+'Open Explore</button></div>';
return o}
function vChat(){let o='<div class="chatwrap"><div class="msgs" id="msgs">';const l=S.msgs.slice().reverse();
if(!l.length)o+='<div class="day" style="margin:auto;text-align:center;max-width:280px">Your private space with '+esc(THEM())+'. Say something sweet.</div>';
let last="";l.forEach(m=>{const d=new Date(m.t),ds=d.toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short"});if(ds!==last){o+='<div class="day">'+ds+'</div>';last=ds}const w=m.from===S.r?"me":"them",tm='<small>'+z(d.getHours())+':'+z(d.getMinutes())+'</small>';
if(m.k==="pc"){const p=PC(m.pc);o+='<button class="m pc '+w+'" data-a="viewpc" data-id="'+m.id+'"><div class="mini">'+art(p)+'</div><p>'+esc(m.x)+'</p>'+tm+'</button>'}
else if(m.k==="card"){const c=CARDS.find(x=>x.id===m.card)||storyOf(m.card);o+='<button class="m sp '+w+'" data-a="open" data-id="'+(c?c.id:"")+'" style="text-align:start"><span class="tag g">'+(c&&c.p?"Story":"Idea")+'</span><br><b>'+(c?c.t:"")+'</b>'+tm+'</button>'}
else o+='<div class="m '+w+(m.k&&m.k!=="text"?" sp":"")+'">'+esc(m.x)+tm+'</div>'});
const qk=isW()?["Thinking of you","I miss you","The children say hi","Make dua for me","I love you"]:["Thinking of you","I miss you","Proud of you","How was your day?","I love you"];
o+='</div><div class="quick">'+qk.map(q=>'<button data-a="quick">'+q+'</button>').join("")+'</div><div class="compose"><textarea id="cin" rows="1" maxlength="2000" placeholder="Message '+esc(THEM())+'"></textarea><button class="send" data-a="send" aria-label="Send">'+ic("send")+'</button></div></div>';return o}

/* ---------- shell ---------- */
function header(){if(!S.r)return'<div class="brand">'+ic("heart")+'Sakinah</div>';const L=lvl(lpTotal()),d=daysTo();
return'<div class="brand">'+spray("bico")+'Sakinah</div>'+(d!=null&&d>=0?'<span class="chip g">'+ic("cal")+(d===0?"Today":d+"d")+'</span>':"")+'<span class="chip r">'+ic("flame")+streak(S.st.w||{})+'</span>'+sndBtn()+'<button class="ib" data-a="settings" aria-label="Settings">'+ic("gear")+'</button>'}
function tabs(){const u=unread();const t=[["today","Today","sun"],["explore","Explore","grid"],["us","Us","heart"],["album","Album","img"],["chat","Chat","chat"],["glow","Glow","spark"]];return t.map(x=>'<button class="'+(S.tab===x[0]?"on":"")+'" data-a="tab" data-id="'+x[0]+'">'+ic(x[2])+x[1]+(x[0]==="chat"&&u?'<span class="dot">'+u+'</span>':x[0]==="album"&&newPh()?'<span class="dot">'+newPh()+'</span>':"")+'</button>').join("")}
function render(){const v=$("#view");$("#top").innerHTML=header();
$("#banner").innerHTML=S.mode==="demo"&&S.r?'<div class="banner">Preview mode: data stays on this phone. Switch between '+esc(nm("w"))+' and '+esc(nm("h"))+' in Settings.</div>':"";
if(S.screen!=="app"){$("#tabs").style.display="none";v.className="";v.innerHTML=screenHTML();return}
$("#tabs").style.display="";$("#tabs").innerHTML=tabs();
const ae=document.activeElement,fid=ae&&ae.id,fval=fid&&("value" in ae)?ae.value:null,deck=$("#deck"),dx=deck?deck.scrollLeft:0,st=v.scrollTop,same=render.last===S.tab+S.r+S.sub;
const flush=S.tab==="chat"||S.tab==="today";v.className=flush?"flush":"";
v.innerHTML=S.tab==="today"?vToday():S.tab==="explore"?vExplore():S.tab==="us"?vUs():S.tab==="album"?vAlbum():S.tab==="chat"?vChat():vGlow();
if(fid){const el=document.getElementById(fid);if(el&&el.type!=="date"){if(fval!=null)el.value=fval;try{el.focus({preventScroll:true})}catch(e){}}}
if(same){v.scrollTop=st;const d2=$("#deck");if(d2)d2.scrollLeft=dx}else v.scrollTop=0;
render.last=S.tab+S.r+S.sub;after()}
function soft(chat){if(S.screen!=="app")return;if(S.tab==="chat"&&!chat){$("#top").innerHTML=header();$("#tabs").innerHTML=tabs();return}render()}
let io=null;
function after(){
if(S.tab==="today"){if(io)io.disconnect();const tm={};io=new IntersectionObserver(es=>es.forEach(e=>{const id=e.target.dataset.card;if(!id)return;if(e.isIntersecting){if(!readOf(me())[id])tm[id]=setTimeout(()=>markRead(id),2500)}else clearTimeout(tm[id])}),{threshold:.6,root:$("#deck")});document.querySelectorAll("#deck .kc").forEach(k=>io.observe(k))}
if(S.tab==="chat"){const m=$("#msgs");if(m)m.scrollTop=m.scrollHeight;if(unread())A.merge("state/"+S.r,{lastRead:Date.now()});const c=$("#cin");if(c)c.addEventListener("input",()=>{c.style.height="auto";c.style.height=Math.min(c.scrollHeight,120)+"px"})}
const mt=$("#meet");if(mt)mt.addEventListener("click",()=>{try{mt.showPicker()}catch(e){}});if(mt)mt.addEventListener("change",()=>{A.merge("",{meet:mt.value||DEL});if(mt.value)toast("Counting down to "+new Date(mt.value+"T12:00:00").toLocaleDateString("en-GB",{day:"numeric",month:"long"}))})}
function markRead(id){if(readOf(me())[id])return;A.merge("state/"+S.r,{read:{[id]:Date.now()}})}

/* ---------- screens: sign-in & pairing ---------- */
function screenHTML(){const logo='<div class="logo">'+heartFill+'</div>';
if(S.screen==="splash")return'<div class="splash"><div>'+logo+'<h1 style="margin-top:14px">Sakinah</h1><p class="mut">Opening…</p></div></div>';
if(S.screen==="signin")return'<div class="splash"><div style="max-width:340px">'+logo+'<h1 style="margin:16px 0 6px">Sakinah</h1><p class="mut" style="margin:0 0 22px">A little space of love and growth, for two.</p><button class="btn wide" data-a="google">Continue with Google</button><p class="xs mut" style="margin-top:14px">Any free Google (Gmail) account works.</p>'+(S.err?'<p class="sm" style="color:var(--rose)">'+esc(S.err)+'</p>':"")+'</div></div>';
if(S.screen==="setup")return'<div class="splash"><div style="max-width:360px;width:100%">'+logo+'<h2 style="margin:16px 0 6px">Welcome'+(S.user&&S.user.displayName?", "+esc(S.user.displayName.split(" ")[0]):"")+'</h2><p class="mut" style="margin:0 0 18px">Let’s connect you to your partner.</p><div class="card" style="text-align:start"><h3>Start our space</h3><p class="mut sm" style="margin:4px 0 10px">You’ll get a code to share with your partner.</p><div class="row"><button class="btn sm" style="flex:1" data-a="create" data-id="h">I’m the husband</button><button class="btn ghost sm" style="flex:1" data-a="create" data-id="w">I’m the wife</button></div></div><div class="card" style="text-align:start"><h3>I have a code</h3><input id="jcode" maxlength="12" placeholder="Enter the code" style="margin-top:10px;text-transform:uppercase"><button class="btn gold wide" style="margin-top:10px" data-a="join">Join</button></div>'+(S.err?'<p class="sm" style="color:var(--rose)">'+esc(S.err)+'</p>':"")+'<button class="xs mut" style="margin-top:12px;text-decoration:underline" data-a="signout">Sign out</button></div></div>';
if(S.screen==="wait")return'<div class="splash"><div style="max-width:340px">'+logo+'<h2 style="margin:16px 0 6px">Share this code</h2><p class="mut" style="margin:0">Ask your partner to open Sakinah, sign in with Google, tap “I have a code” and enter:</p><div class="code">'+esc(S.code)+'</div><div class="row" style="justify-content:center"><button class="btn sm" data-a="copycode">Copy code</button><a class="btn ghost sm" href="https://wa.me/?text='+encodeURIComponent("Join me on Sakinah: "+location.href.split("#")[0]+" — our code is "+S.code)+'" target="_blank" rel="noopener">Send on WhatsApp</a></div><p class="xs mut" style="margin-top:18px">This screen changes by itself when your partner joins.</p><button class="btn ghost sm" style="margin-top:6px" data-a="enter">Continue without waiting</button></div></div>';
return""}

/* ---------- sheets ---------- */
function sheet(html){const sh=$("#sheet");sh.innerHTML='<div class="in" role="dialog" aria-modal="true"><div class="hd"><span style="flex:1"></span>'+sndBtn()+'<button class="ib" data-a="close" aria-label="Close">'+ic("close")+'</button></div><div class="bd">'+html+'</div></div>';sh.classList.add("on")}
function closeSheet(){const sh=$("#sheet");sh.classList.remove("on");sh.innerHTML="";stopAudio()}
function pcCompose(id){const p=PC(id);sheet('<div class="pcbig">'+art(p)+'</div><h2 style="margin:16px 0 8px;text-align:center">'+p.t+'</h2><textarea id="pctext" maxlength="300">'+esc(p.m)+'</textarea><p class="xs mut" style="margin:6px 0 0">Change the words if you like. Keep it short and sweet.</p><button class="btn wide" style="margin-top:12px" data-a="sendpc" data-id="'+p.id+'">'+ic("send")+'Send to '+esc(THEM())+' · +10</button>')}
function pcView(m){const p=PC(m.pc),mine=m.from===S.r,reacts=S.msgs.filter(x=>x.k==="react"&&x.ref===m.id);
sheet('<div class="pcbig reveal">'+art(p)+'</div><div class="pcmsg">'+esc(m.x)+'</div><p class="xs mut" style="text-align:center;margin:0">'+(mine?"You sent this":"From "+esc(THEM()))+' · '+new Date(m.t).toLocaleDateString("en-GB",{day:"numeric",month:"short"})+'</p>'+(reacts.length?'<p class="sm" style="text-align:center;margin-top:10px">'+reacts.map(r=>'<span class="tag">'+esc(r.from===S.r?"You":THEM())+': '+esc(r.x)+'</span>').join(" ")+'</p>':"")+(!mine?'<div class="reacts">'+REACTIONS.map(x=>'<button data-a="react" data-id="'+m.id+'">'+x+'</button>').join("")+'</div>':"")+(p.coupon&&!mine?(m.used?'<p class="done" style="justify-content:center;width:100%;margin-top:14px">'+ic("check")+'Coupon used</p>':'<button class="btn gold wide" style="margin-top:16px" data-a="usecoupon" data-id="'+m.id+'">'+ic("gift")+'Mark coupon as used</button>'):""));setTimeout(()=>heartsBurst(16,innerWidth/2,innerHeight*.35),250)}
function checkEnvelope(){if(!S.stOk||S.screen!=="app"||$("#env").classList.contains("on")||$("#sheet").classList.contains("on"))return;const seen=me().seenPc||0;const m=S.msgs.filter(x=>x.k==="pc"&&x.from===S.o&&x.t>seen).sort((a,b)=>a.t-b.t)[0];if(!m)return;
SFX.play("envelope");const env=$("#env");env.innerHTML='<div class="envbox"><p class="tag g">A postcard from '+esc(THEM())+'</p><div class="envelope" id="envl" style="margin-top:18px" data-a="openenv" data-id="'+m.id+'"><div class="body"></div><div class="flap"></div><div class="seal">'+heartFill+'</div></div><p class="mut" style="margin-top:22px">Tap to open</p></div>';env.classList.add("on")}
function gameSheet(){const used=new Set(S.games.filter(g=>g.by===S.r).map(g=>g.q));let pool=GUESS.map((g,i)=>i).filter(i=>!used.has(i));if(!pool.length)pool=GUESS.map((g,i)=>i);S.gq=pool[Math.floor(Math.random()*pool.length)];S.ga=null;drawGame()}
function drawGame(){const G=GUESS[S.gq];sheet('<span class="tag g">Who knows me best?</span><h2 style="margin:10px 0 4px">'+G.q+'</h2><p class="mut sm" style="margin:0 0 6px">Pick your true answer. '+esc(THEM())+' will try to guess it.</p>'+G.o.map((x,i)=>'<button class="opt '+(S.ga===i?"on":"")+'" data-a="ga" data-i="'+i+'">'+x+'</button>').join("")+'<div class="row" style="margin-top:14px"><button class="btn ghost" data-a="gshuffle">'+ic("shuffle")+'Other</button><button class="btn" style="flex:1" data-a="gsend" '+(S.ga==null?"disabled":"")+'>Send challenge · +5</button></div>')}
function alertsHTML(){if(S.mode!=="fb"||!window.SAKINAH_VAPID)return"";const iphone=/iphone|ipad/i.test(navigator.userAgent),standalone=window.matchMedia&&matchMedia("(display-mode: standalone)").matches||navigator.standalone;let h='<div class="card"><h3>Phone alerts</h3>';if(!FB.pushOk()||(iphone&&!standalone))h+='<p class="sm mut" style="margin:6px 0 0">'+(iphone&&!standalone?'On iPhone, first add Sakinah to your Home Screen: tap Share, then “Add to Home Screen”. Open Sakinah from there, and come back to this switch.':'This phone or browser cannot show alerts. Try Chrome on Android, or install Sakinah on your Home Screen.')+'</p>';else{const on=localStorage.getItem("sakinah.push")&&Notification.permission==="granted";h+='<p class="sm mut" style="margin:6px 0 10px">'+(on?'Alerts are on for this phone. You will hear when '+esc(THEM())+' sends a message, postcard, story or photo.':'Get a small alert when '+esc(THEM())+' sends a message, postcard, story or photo, even when Sakinah is closed.')+'</p>'+(S.pushMsg?'<p class="sm" style="color:var(--gold);margin:0 0 8px">'+S.pushMsg+'</p>':"")+'<button class="btn '+(on?"ghost":"")+' sm" data-a="'+(on?"pushoff":"pushon")+'">'+ic("bell")+(on?"Turn alerts off":"Turn on alerts")+'</button>'}return h+'</div>'}
function settings(){let o='<h2>Settings</h2>'+themeHTML()+alertsHTML()+'<label class="sm mut" for="nm" style="display:block;margin-top:14px">Your name</label><div class="row" style="margin-top:6px"><input id="nm" value="'+esc(ME())+'" maxlength="30"><button class="btn sm" data-a="savename">Save</button></div>';
o+='<div class="card"><h3>Shared between you two</h3><p class="sm" style="margin:6px 0 0">Your chat, postcards, answers and games are shared. '+esc(nm("h"))+' and '+esc(nm("w"))+' can see each other’s glow: the ideas you read, save and try, so you can cheer each other on.</p></div>';
o+='<div class="card"><h3>Put Sakinah on your home screen</h3><p class="sm" style="margin:6px 0 0"><b>iPhone:</b> open in Safari, tap Share, then “Add to Home Screen”.<br><b>Android:</b> open in Chrome, tap ⋮, then “Add to Home screen” or “Install app”.</p></div>';
if(S.mode==="demo")o+='<div class="card"><h3>Preview as</h3><div class="row" style="margin-top:10px"><button class="btn '+(isW()?"":"ghost")+' sm" style="flex:1" data-a="demorole" data-id="w">'+esc(nm("w"))+'</button><button class="btn '+(isW()?"ghost":"")+' sm" style="flex:1" data-a="demorole" data-id="h">'+esc(nm("h"))+'</button></div><button class="xs mut" style="margin-top:12px;text-decoration:underline" data-a="demoreset">Clear preview data</button></div>';
else o+='<div class="card"><h3>Your space</h3><p class="sm" style="margin:6px 0 0">Code: <b style="color:var(--gold);letter-spacing:2px">'+esc(S.code||"")+'</b>'+(S.couple&&S.couple.members&&S.couple.members.length<2?' · waiting for your partner to join':' · connected')+'</p><button class="btn ghost sm" style="margin-top:12px" data-a="signout">'+ic("out")+'Sign out</button></div>';
sheet(o)}

/* ---------- album: photos saved to Sadiq's Google Drive ---------- */
const ALB={us:"Us two",kids:"Our kids"},PHURL=()=>window.SAKINAH_PHOTOS||"";
function seePhotos(){if(newPh())A.merge("state/"+S.r,{seenPh:Date.now()})}
function vAlbum(){setTimeout(seePhotos,800);const al=S.album||"us",L=(S.photos||[]).filter(p=>p.album===al),ready=S.mode==="demo"||PHURL();
let o='<div class="uhero" style="background-image:linear-gradient(180deg,rgba(var(--bgrgb),.1),rgba(var(--bgrgb),.85)),url('+photo(al==="us"?"hands2":"bokeh",900)+')"><h1>Our album</h1><p>'+(al==="us"?"Just the two of us.":"Our children, growing up.")+' Saved safely in Google Drive.</p></div>';
o+='<div class="row" style="gap:8px;margin:14px 0 12px">'+Object.entries(ALB).map(([k,n])=>'<button class="btn sm '+(al===k?"":"ghost")+'" style="flex:1" data-a="album" data-id="'+k+'">'+n+' · '+(S.photos||[]).filter(p=>p.album===k).length+'</button>').join("")+'</div>';
if(S.up)o+='<div class="card" style="text-align:center"><b>Saving '+S.up.i+' of '+S.up.n+'…</b><div class="bar" style="margin-top:8px"><i style="width:'+Math.round((S.up.i-1)/S.up.n*100)+'%"></i></div><p class="xs mut" style="margin:6px 0 0">Keep the app open until it finishes.</p></div>';
else if(ready)o+='<label class="btn wide" style="position:relative">'+ic("plus")+'Add photos to '+ALB[al]+'<input type="file" id="pick" accept="image/*" multiple style="position:absolute;inset:0;opacity:0;cursor:pointer"></label>';
else o+='<div class="card"><p class="sm" style="margin:0">The album is being connected to Google Drive. It will open here very soon.</p></div>';
if(!L.length)return o+'<p class="mut" style="text-align:center;margin-top:28px">No photos yet. Add your first memory.</p>';
let last="";o+='<div class="pgrid">';
L.forEach(p=>{const m=new Date(p.t).toLocaleDateString("en-GB",{month:"long",year:"numeric"});if(m!==last){last=m;o+='<h4>'+m+'</h4>'}o+='<button data-a="ph" data-id="'+p.id+'" aria-label="Open photo"><img src="'+p.th+'" alt="" loading="lazy"></button>'});
return o+'</div>'}
function shrink(file,max,q){return new Promise((res,rej)=>{const u=URL.createObjectURL(file),im=new Image();im.onload=()=>{const k=Math.min(1,max/Math.max(im.naturalWidth,im.naturalHeight)),w=Math.round(im.naturalWidth*k),h=Math.round(im.naturalHeight*k),c=document.createElement("canvas");c.width=w;c.height=h;c.getContext("2d").drawImage(im,0,0,w,h);URL.revokeObjectURL(u);res({url:c.toDataURL("image/jpeg",q),w:im.naturalWidth,h:im.naturalHeight})};im.onerror=()=>{URL.revokeObjectURL(u);rej(new Error("This photo type can’t be read. Try a JPG."))};im.src=u})}
const b64=f=>new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(String(r.result).split(",")[1]);r.onerror=rej;r.readAsDataURL(f)});
async function pickPhotos(files){files=Array.from(files||[]).filter(f=>/^image\//.test(f.type)||/\.(heic|heif)$/i.test(f.name)).slice(0,20);if(!files.length)return;
S.pending=[];for(const f of files){try{const t=await shrink(f,260,.68);S.pending.push({f,th:t.url})}catch(e){toast(e.message)}}if(!S.pending.length)return;
sheet('<h2 style="margin:0 0 4px">Add to '+ALB[S.album||"us"]+'</h2><p class="mut sm" style="margin:0 0 12px">'+S.pending.length+' photo'+(S.pending.length>1?"s":"")+'. They will be saved in '+esc(nm("h"))+'’s Google Drive.</p><div class="pgrid" style="margin-bottom:12px">'+S.pending.map(p=>'<span><img src="'+p.th+'" alt=""></span>').join("")+'</div><textarea id="pcap" maxlength="300" placeholder="Add a few words (optional)"></textarea><button class="btn wide" style="margin-top:12px" data-a="upphotos">'+ic("heart")+'Save to our album</button>')}
async function post(q){const r=await fetch(PHURL(),{method:"POST",body:JSON.stringify(Object.assign({tok:await FB.token(),cid:S.code},q))});const j=await r.json();if(!j.ok)throw new Error(j.err||"failed");return j}
async function uploadAll(){const al=S.album||"us",cap=($("#pcap")||{}).value||"",L=S.pending||[];S.pending=null;closeSheet();let ok=0;
for(let i=0;i<L.length;i++){S.up={i:i+1,n:L.length};render();const {f,th}=L[i];
try{if(S.mode==="demo"){const v=await shrink(f,1000,.8);await A.add("photos",{album:al,th,view:v.url,cap:cap.trim(),by:S.r,t:Date.now()})}
else{let data,mime=f.type||"image/jpeg",name=f.name||"photo.jpg";if(f.size>20e6||!/^image\/(jpeg|png|webp|heic|heif)$/.test(mime)){const v=await shrink(f,3200,.9);data=v.url.split(",")[1];mime="image/jpeg";name=name.replace(/\.\w+$/,"")+".jpg"}else data=await b64(f);
const stamp=new Date().toISOString().slice(0,16).replace("T","_").replace(":","");const j=await post({a:"up",album:al,name:stamp+"_"+ME()+"_"+name,mime,data,cap:cap.trim(),by:ME()});
await A.add("photos",{album:al,fid:j.id,th,cap:cap.trim(),by:S.r,t:Date.now()});notify("photo")}ok++}catch(e){toast("Could not save a photo: "+e.message)}}
S.up=null;if(ok){addLP(Math.min(20,ok*5));heartsBurst(16);toast(ok+" photo"+(ok>1?"s":"")+(S.mode==="demo"?" added":" saved to Google Drive"))}render()}
const BIG={};
async function openPhoto(id){const p=(S.photos||[]).find(x=>x.id===id);if(!p)return;const d=new Date(p.t).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});
sheet('<div class="phv"><img id="phbig" src="'+(BIG[id]||p.view||p.th)+'" alt="" class="'+(BIG[id]||p.view?"":"soft")+'"></div>'+(p.cap?'<p style="font-size:17px;margin:12px 0 4px">'+esc(p.cap)+'</p>':'')+'<p class="xs mut" style="margin:8px 0 12px">Added by '+esc(nm(p.by))+' · '+d+'</p><button class="btn ghost sm" data-a="phdel" data-id="'+id+'">'+ic("trash")+'Remove from album</button>');
if(BIG[id]||p.view||!p.fid)return;try{const j=await post({a:"get",id:p.fid});BIG[id]="data:"+j.mime+";base64,"+j.b64;const el=$("#phbig");if(el){el.src=BIG[id];el.classList.remove("soft")}}catch(e){toast("Could not load the full photo")}}
async function delPhoto(b){const id=b.dataset.id,p=(S.photos||[]).find(x=>x.id===id);if(!p)return;if(!b.dataset.sure){b.dataset.sure=1;b.innerHTML=ic("trash")+"Tap again to remove";return}
try{if(p.fid&&S.mode!=="demo")await post({a:"del",id:p.fid});await A.merge("photos/"+id,{gone:true});closeSheet();toast("Removed. It stays in Google Drive’s bin for 30 days.")}catch(e){toast("Could not remove: "+e.message)}}
document.addEventListener("change",e=>{if(e.target&&e.target.id==="pick"){pickPhotos(e.target.files);e.target.value=""}});


/* ---------- themes: a new romantic look each day ---------- */
const THEMES=[["wine", "Midnight Wine", "#1d0c16", "#f4a6b8", "#f2c46d"], ["moon", "Moonlit Garden", "#0e1427", "#f3b6c8", "#e8d39a"], ["lavender", "Lavender Dusk", "#17122a", "#cdb4ff", "#f6c9a0"], ["andalus", "Emerald Andalus", "#0b1d18", "#f2b8a8", "#e8c36a"], ["desert", "Desert Rose", "#22110c", "#f0a98c", "#f5cd7a"], ["sakura", "Sakura Night", "#1a1020", "#ffb7d0", "#ffe0a3"], ["tulip", "Ottoman Tulip", "#0a1c22", "#f7a8a0", "#e9c46a"], ["golden", "Golden Hour", "#1f140a", "#f6b38b", "#ffd27a"]];
const themePref=()=>{try{return localStorage.getItem("sakinah.theme")||"auto"}catch(e){return"auto"}};
let openTheme=null;
function themeNow(){const p=themePref();if(p==="auto")return THEMES[dayN()%THEMES.length][0];if(p==="open"){if(!openTheme){let last="";try{last=localStorage.getItem("sakinah.lastTheme")||""}catch(e){}const L=THEMES.filter(t=>t[0]!==last);openTheme=L[Math.floor(Math.random()*L.length)][0];try{localStorage.setItem("sakinah.lastTheme",openTheme)}catch(e){}}return openTheme}return THEMES.some(t=>t[0]===p)?p:THEMES[0][0]}
function applyTheme(announce){const id=themeNow(),T=THEMES.find(t=>t[0]===id),root=document.documentElement;if(root.dataset.theme===id)return;root.dataset.theme=id;const mt=document.querySelector('meta[name="theme-color"]');if(mt)mt.content=T[2];
if(announce&&themePref()==="auto"){let seen="";try{seen=localStorage.getItem("sakinah.themeDay")||""}catch(e){}const d=today();if(seen!==d){try{localStorage.setItem("sakinah.themeDay",d)}catch(e){}setTimeout(()=>toast("Today’s look: "+T[1]),1800)}}}
setInterval(()=>applyTheme(true),60000);
function themeHTML(){const p=themePref();return'<div class="card"><h3>Look and feel</h3><p class="sm mut" style="margin:4px 0 0">The colours change by themselves so the app always feels fresh.</p><div class="row" style="gap:8px;margin-top:10px"><button class="btn sm '+(p==="auto"?"":"ghost")+'" style="flex:1" data-a="theme" data-id="auto">New each day</button><button class="btn sm '+(p==="open"?"":"ghost")+'" style="flex:1" data-a="theme" data-id="open">New each time I open</button></div><p class="xs mut" style="margin:12px 0 0">Or keep one you love:</p><div class="themes">'+THEMES.map(t=>'<button class="'+(p===t[0]?"on":"")+'" data-a="theme" data-id="'+t[0]+'" style="background:'+t[2]+';color:'+t[3]+'"><i style="background:linear-gradient(135deg,'+t[3]+','+t[4]+')"></i>'+t[1]+'</button>').join("")+'</div></div>'}

/* ---------- gentle sounds (synthesised, no files; on by default, switch in the top bar) ---------- */
const SFX=(()=>{let c=null,on=true;try{on=localStorage.getItem("sakinah.sound")!=="off"}catch(e){}
const ac=()=>{if(!c){try{c=new(window.AudioContext||window.webkitAudioContext)()}catch(e){return null}}if(c.state==="suspended")c.resume().catch(()=>{});return c};
function tone(f,t0,d,g,type){const a=ac();if(!a)return;const t=a.currentTime+t0,o=a.createOscillator(),v=a.createGain();o.type=type||"sine";o.frequency.setValueAtTime(f,t);v.gain.setValueAtTime(.0001,t);v.gain.exponentialRampToValueAtTime(g,t+.02);v.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(v);v.connect(a.destination);o.start(t);o.stop(t+d+.05)}
const P={tap:()=>tone(700,0,.06,.02),open:()=>{tone(523,0,.4,.035);tone(784,.09,.5,.03)},chime:()=>{tone(784,0,.5,.045);tone(1047,.1,.6,.04);tone(1319,.2,.9,.028)},undo:()=>{tone(587,0,.22,.03);tone(440,.08,.3,.026)},send:()=>{tone(494,0,.12,.03,"triangle");tone(740,.07,.2,.03,"triangle")},recv:()=>{tone(988,0,.45,.04);tone(1319,.15,.7,.032)},beat:()=>{tone(130,0,.16,.12,"triangle");tone(100,.17,.2,.1,"triangle")},envelope:()=>{[784,988,1175,1568].forEach((f,i)=>tone(f,i*.09,.6,.03))}};
return{get on(){return on},set(v){on=!!v;try{localStorage.setItem("sakinah.sound",on?"on":"off")}catch(e){}},play(n){if(!on)return;try{P[n]&&P[n]()}catch(e){}}}})();
const SFX_ACT={tab:"tap",sub:"tap",open:"open",story:"open",save:"tap",scat:"tap",send:"send",sendcard:"send",sendwh:"send",sendstory:"send",sendpc:"send",sendjoke:"send",react:"send",quick:"send",beat:"beat",answer:"chime",whisper:"tap",joke:"tap",pc:"tap",album:"tap",theme:"tap"};
const triedBtn=(id,on)=>on?'<button class="done" data-a="tried" data-id="'+id+'" aria-label="Done. Tap to untick">'+ic("check")+'Done, well done! <small>Tap to undo</small></button>':'<button class="btn sm" data-a="tried" data-id="'+id+'">'+ic("check")+'I did it</button>';
const sndIco=()=>ic(SFX.on?"vol":"volx");
const sndBtn=()=>'<button class="ib" data-a="snd" aria-label="'+(SFX.on?"Sound is on. Tap to turn off":"Sound is off. Tap to turn on")+'">'+sndIco()+'</button>';

/* ---------- stories & whispers ---------- */
const SCOL={love:"#f4a6b8",mercy:"#9fd3e6",affection:"#ffb38a",romance:"#c9b6ff",patience:"#a7d99a"};
const SPH={love:["rose1","hands","rings","bouquet","redrose"],mercy:["tea","moon","hands2","paper"],affection:["hands","pinkroses","peony","arch"],romance:["redrose","sakura","taj","moon2","henna","tulips"],patience:["tea2","moon","crate","paper","bokeh"]};
const storyPhoto=s=>{const L=SPH[s.c];return L[parseInt(s.id.slice(2),10)%L.length]};
const storyOf=id=>typeof STORIES!=="undefined"?STORIES.find(s=>s.id===id):null;
const sA=s=>(S.r==="h"&&s.ha)||s.a;
const storyDay=()=>STORIES[dayN()%STORIES.length];
const mins=s=>Math.max(1,Math.round(s.p.join(" ").split(/\s+/).length/150));
const voiceOf=w=>w[1]==="Sakinah"?"From Sakinah":"In the spirit of "+esc(w[1]);
function storyRow(s){const m=me();return'<button class="li" style="--c:'+SCOL[s.c]+'" data-a="story" data-id="'+s.id+'"><span class="ck '+(readOf(m)[s.id]?"on":"")+'" data-a="toggleread" data-id="'+s.id+'" role="checkbox" aria-checked="'+(!!readOf(m)[s.id])+'" aria-label="Mark as read or unread">'+(readOf(m)[s.id]?ic("check"):"")+'</span><span><b>'+s.t+'</b><small>'+STORY_CATS[s.c]+' · '+esc(s.o)+' · '+mins(s)+' min</small></span></button>'}
const SSV=()=>STORIES.filter(s=>(me().saved||{})[s.id]);
function storySlide(s,from){const read=readOf(me())[s.id];return'<article class="kc story" style="--c:'+SCOL[s.c]+'"><div class="hero" style="background-image:url('+photo(storyPhoto(s),700)+')"><div class="top"><span class="sc">'+(from?"Story from "+esc(THEM()):"Story of the day")+'</span><span class="pg">'+STORY_CATS[s.c]+'</span></div><button class="play" data-a="listen" data-id="'+s.id+'" aria-label="Listen">'+ic("play")+'</button></div><h2>'+s.t+'</h2><p class="b">'+esc(s.p[0])+' <span class="mut">…</span></p><div class="try"><b>'+(read?"You have read this one":from?"Sent with love":"The same story is on both phones today")+'</b><p>'+(read?"Tell "+esc(THEM())+" what touched you.":"Read it, then tell "+esc(THEM())+" what touched you.")+'</p><button class="btn sm" data-a="story" data-id="'+s.id+'">'+ic("book")+(read?"Read again":"Read the story")+'</button></div></article>'}
function whisperSlide(){const n=(dayN()+(S.wi||0))%WHISPERS.length,w=WHISPERS[n];return'<article class="kc wsl" style="--c:var(--rose)"><span class="tag g" style="align-self:center">Whisper of the day</span><blockquote>“'+esc(w[0])+'”<small>'+voiceOf(w)+'</small></blockquote><div class="row" style="gap:8px;margin-top:auto"><button class="btn ghost sm" style="flex:1" data-a="whisper">'+ic("spark")+'Another</button><button class="btn sm" style="flex:1" data-a="sendwh" data-i="'+n+'">'+ic("send")+'Send to '+esc(THEM())+'</button></div></article>'}
function whisperCard(){const n=(dayN()+(S.wi||0))%WHISPERS.length,w=WHISPERS[n];return'<div class="card joke whisper">'+spray("spray sm")+'<span class="tag g">Whisper of the day</span><p class="wq">“'+esc(w[0])+'”</p><small class="mut">'+voiceOf(w)+'</small><div class="row" style="gap:8px;margin-top:12px"><button class="btn ghost sm" style="flex:1" data-a="whisper">'+ic("spark")+'Another one</button><button class="btn sm" style="flex:1" data-a="sendwh" data-i="'+n+'">'+ic("send")+'Send to '+esc(THEM())+'</button></div></div>'}
function storyUsCard(){const s=storyDay();return'<button class="card storyus" style="--c:'+SCOL[s.c]+';background-image:linear-gradient(90deg,rgba(var(--bgrgb),.95) 35%,rgba(var(--bgrgb),.35)),url('+photo(storyPhoto(s),600)+')" data-a="story" data-id="'+s.id+'"><span class="tag g">Read together tonight</span><h3>'+s.t+'</h3><p class="mut sm" style="margin:2px 0 0">'+STORY_CATS[s.c]+' · '+mins(s)+' min · the same story is on both phones</p></button>'}
function storiesTile(){const m=me(),r=STORIES.filter(s=>readOf(m)[s.id]).length,s=storyDay();return'<button class="st wide" style="--c:#f4a6b8;background-image:linear-gradient(170deg,transparent 10%,rgba(var(--bgrgb),.92) 85%),url('+photo(storyPhoto(s),700)+')" data-a="sub" data-id="stories"><div><h3>Stories</h3><p>Love, mercy, affection, romance and patience</p></div><span class="n">'+r+' of '+STORIES.length+' read</span></button>'}
function vStories(){const f=S.sc||"all",L=STORIES.filter(s=>f==="all"||s.c===f);return'<div class="row" style="margin-top:4px"><button class="ib" data-a="sub" data-id="" aria-label="Back">'+ic("back")+'</button><div><h2>Stories</h2><p class="mut sm" style="margin:0">Short, true and tender. A few minutes each.</p></div></div><div class="chips">'+[["all","All"]].concat(Object.entries(STORY_CATS)).map(([k,n])=>'<button class="chip'+(f===k?" on":"")+'" data-a="scat" data-id="'+k+'">'+n+'</button>').join("")+'</div>'+L.map(storyRow).join("")}
function storyHTML(s){const m=me(),saved=(m.saved||{})[s.id],tried=(m.tried||{})[s.id];return'<article class="kc story" style="--c:'+SCOL[s.c]+'"><div class="hero" style="background-image:url('+photo(storyPhoto(s),700)+')"><div class="top"><span class="sc">'+STORY_CATS[s.c]+' · '+STORY_KIND[s.k]+'</span><span class="pg">'+mins(s)+' min</span></div><button class="play" data-a="listen" data-id="'+s.id+'" aria-label="Listen">'+ic("play")+'</button></div><h2>'+s.t+'</h2><p class="xs mut" style="margin:-4px 0 10px">'+esc(s.o)+'</p>'+s.p.map(p=>'<p class="b">'+esc(p)+'</p>').join("")+'<blockquote>'+esc(s.m)+'<small>The heart of it</small></blockquote><div class="faith">'+s.f[0]+(s.f[1]?'<small>'+s.f[1]+'</small>':"")+'</div><div class="try"><b>Try it today</b><p>'+sA(s)+'</p>'+triedBtn(s.id,!!tried)+'</div><div class="acts"><button class="'+(saved?"on":"")+'" data-a="save" data-id="'+s.id+'">'+ic("book")+(saved?"Saved":"Save")+'</button><button data-a="listen" data-id="'+s.id+'">'+ic("sound")+'Listen</button><button data-a="sendstory" data-id="'+s.id+'">'+ic("send")+'Send to '+esc(THEM())+'</button></div></article>'}
function fromStories(){const seen=new Set();return S.msgs.filter(m=>m.k==="card"&&m.from===S.o&&/^st\d+$/.test(m.card||"")).filter(m=>{if(seen.has(m.card)||readOf(me())[m.card])return false;seen.add(m.card);return true}).map(m=>storyOf(m.card)).filter(Boolean)}

/* ---------- actions ---------- */
const NT={};function notify(kind){if(S.mode!=="fb"||!PHURL()||!window.SAKINAH_VAPID)return;const n=Date.now();if(NT[kind]&&n-NT[kind]<(kind==="beat"?300000:6000))return;NT[kind]=n;post({a:"notify",kind}).catch(()=>{})}
function send(x,k,extra){x=String(x||"").trim();if(!x)return;A.add("msgs",Object.assign({from:S.r,k:k||"text",x:x.slice(0,2000),t:Date.now()},extra||{}));A.merge("state/"+S.r,{lastRead:Date.now()});notify(k||"text")}
const ACT={
tab:b=>{S.tab=b.dataset.id;if(S.tab!=="explore")S.sub=null;stopAudio();closeSheet();render()},
sub:b=>{S.sub=b.dataset.id||null;render()},
open:b=>{const sy=storyOf(b.dataset.id);if(sy){sheet(storyHTML(sy));markRead(sy.id);return}const c=CARDS.find(x=>x.id===b.dataset.id);if(!c)return;sheet(cardHTML(c,0,0,false));markRead(c.id)},
close:()=>closeSheet(),settings:()=>settings(),
save:b=>{const id=b.dataset.id,s=(me().saved||{})[id];A.merge("state/"+S.r,{saved:{[id]:s?DEL:Date.now()}});b.classList.toggle("on",!s);b.innerHTML=ic("book")+(s?"Save":"Saved");if(!s)toast("Saved to your ideas")},
tried:b=>{const id=b.dataset.id;if(((me().tried||{})[id])){A.merge("state/"+S.r,{tried:{[id]:DEL}});SFX.play("undo");toast("Unticked. Tick it again any time.");b.outerHTML=triedBtn(id,false);return}A.merge("state/"+S.r,{tried:{[id]:Date.now()},read:{[id]:readOf(me())[id]||Date.now()}});SFX.play("chime");burstAt(b,14);toast("+15 glow points. Well done!");b.outerHTML=triedBtn(id,true)},
listen:b=>playCard(b.dataset.id,b),
snd:()=>{SFX.set(!SFX.on);document.querySelectorAll('[data-a="snd"]').forEach(x=>{x.innerHTML=sndIco();x.setAttribute("aria-label",SFX.on?"Sound is on. Tap to turn off":"Sound is off. Tap to turn on")});if(SFX.on)SFX.play("chime");toast(SFX.on?"Sound is on":"Sound is off")},
toggleread:b=>{const id=b.dataset.id,on=readOf(me())[id];A.merge("state/"+S.r,{read:{[id]:on?DEL:Date.now()}});SFX.play(on?"undo":"tap")},
untry:b=>{A.merge("state/"+S.r,{tried:{[b.dataset.id]:DEL}});SFX.play("undo");toast("Unticked. You can tick it again any time.")},
pushon:async()=>{S.pushMsg="";const r=await FB.pushOn();S.pushMsg={blocked:"Alerts are blocked for Sakinah. Allow notifications for this site in your phone settings, then try again.",later:"No problem. You can turn them on any time.",unsupported:"This phone cannot show alerts yet.",error:"Could not turn on alerts. Please try again in a moment.",on:""}[r]||"";if(r==="on")toast("Alerts are on");settings()},
pushoff:async()=>{await FB.pushOff();S.pushMsg="";toast("Alerts are off for this phone");settings()},
story:b=>{const sy=storyOf(b.dataset.id);if(!sy)return;sheet(storyHTML(sy));markRead(sy.id)},
scat:b=>{S.sc=b.dataset.id;render()},
whisper:()=>{S.wi=(S.wi||0)+1;render()},
sendwh:b=>{send("💌 "+WHISPERS[Number(b.dataset.i)][0],"whisper");addLP(3);burstAt(b,10);toast("Sent to "+THEM())},
sendstory:b=>{const sy=storyOf(b.dataset.id);if(!sy)return;send(sy.t,"card",{card:sy.id});addLP(3);toast("Story sent to "+THEM());burstAt(b,8)},
sendcard:b=>{const c=CARDS.find(x=>x.id===b.dataset.id);send(c.t,"card",{card:c.id});toast("Sent to "+THEM());burstAt(b,8)},
beat:b=>{notify("beat");const n=(S.day.beats||{})[S.r]||0;A.merge("days/"+today(),{beats:{[S.r]:inc(1)}});if(n<20)addLP(1);vib();b.classList.remove("pulse");void b.offsetWidth;b.classList.add("pulse");burstAt(b,10)},
pc:b=>pcCompose(b.dataset.id),
sendpc:b=>{const p=PC(b.dataset.id),x=$("#pctext").value.trim()||p.m;send(x,"pc",{pc:p.id});addLP(10);closeSheet();heartsBurst(24);toast("Postcard sent to "+THEM()+"!")},
viewpc:b=>{const m=S.msgs.find(x=>x.id===b.dataset.id);if(!m)return;pcView(m);if(m.from===S.o&&m.t>(me().seenPc||0))A.merge("state/"+S.r,{seenPc:m.t})},
openenv:b=>{const m=S.msgs.find(x=>x.id===b.dataset.id);const el=$("#envl");el.classList.add("open");vib();setTimeout(()=>{$("#env").classList.remove("on");$("#env").innerHTML="";if(m){A.merge("state/"+S.r,{seenPc:m.t});pcView(m)}},700)},
react:b=>{const m=S.msgs.find(x=>x.id===b.dataset.id);send(b.textContent,"react",{ref:b.dataset.id});addLP(5);burstAt(b,10);toast("Sent!");closeSheet()},
usecoupon:b=>{A.merge("msgs/"+b.dataset.id,{used:true});burstAt(b,20);toast("Enjoy it!");closeSheet()},
answer:()=>{const t=$("#qans").value.trim();if(!t){toast("Write your answer first");return}A.merge("days/"+today(),{qa:{[S.r]:t.slice(0,500)}});addLP(10);heartsBurst(12);toast("+10 love points")},
newgame:()=>gameSheet(),
ga:b=>{S.ga=Number(b.dataset.i);drawGame()},
gshuffle:()=>gameSheet(),
gsend:()=>{if(S.ga==null)return;A.add("games",{by:S.r,q:S.gq,ans:S.ga,guess:null,t:Date.now()});addLP(5);closeSheet();toast("Challenge sent to "+THEM())},
guess:b=>{const g=S.games.find(x=>x.id===b.dataset.id);if(!g)return;const i=Number(b.dataset.i),ok=i===g.ans;A.merge("games/"+g.id,{guess:i});addLP(ok?20:10);if(ok){heartsBurst(26);toast("You know "+THEM()+" so well!")}else toast("Not quite! It was: "+GUESS[g.q].o[g.ans])},
mission:b=>{const wk=weekKey(),i=b.dataset.i,on=((me().missions||{})[wk]||{})[i];A.merge("state/"+S.r,{missions:{[wk]:{[i]:on?DEL:true}}});if(!on){addLP(15);SFX.play("chime");burstAt(b,12);toast("+15 love points")}else{addLP(-15);SFX.play("undo")}},
send:()=>{const c=$("#cin");if(!c.value.trim())return;send(c.value);c.value="";c.style.height=""},
quick:b=>send(b.textContent),
savename:()=>{const v=$("#nm").value.trim().slice(0,30);if(!v)return;A.merge("",{names:{[S.r]:v}});closeSheet();toast("Saved")},
demorole:b=>{S.r=b.dataset.id;S.o=S.r==="h"?"w":"h";try{localStorage.setItem("sakinah2.role",S.r)}catch(e){}lastBeats=null;closeSheet();render();watchDay();setTimeout(checkEnvelope,300)},
demoreset:()=>{A.reset();location.reload()},
google:()=>FB.signIn(),signout:()=>FB.signOut(),
create:b=>FB.create(b.dataset.id),join:()=>FB.join($("#jcode").value),
copycode:()=>{try{navigator.clipboard.writeText(S.code);toast("Code copied")}catch(e){toast("Code: "+S.code)}},
enter:()=>{S.screen="app";render()},
theme:b=>{try{localStorage.setItem("sakinah.theme",b.dataset.id)}catch(e){}openTheme=null;document.documentElement.dataset.theme="";applyTheme(false);settings();toast(b.dataset.id==="auto"?"A new look every day":b.dataset.id==="open"?"A new look each time you open":"Look saved")},
album:b=>{S.album=b.dataset.id;render()},
ph:b=>openPhoto(b.dataset.id),
upphotos:()=>uploadAll(),
phdel:b=>delPhoto(b),
gw:b=>{S.gw=b.dataset.id;render()},
joke:()=>{S.jk=(S.jk||0)+1;render()},
sendjoke:b=>{send("😄 "+JOKES[Number(b.dataset.i)]);addLP(2);burstAt(b,8);toast("Joke sent to "+THEM())}};
document.addEventListener("click",e=>{const b=e.target.closest("[data-a]");if(b){if(b.disabled)return;const f=ACT[b.dataset.a];const sn=SFX_ACT[b.dataset.a];if(sn)SFX.play(sn);if(f)f(b,e);return}if(e.target.id==="sheet")closeSheet()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeSheet();if(e.key==="Enter"&&!e.shiftKey&&e.target.id==="cin"&&matchMedia("(pointer:fine)").matches){e.preventDefault();ACT.send()}});

/* ---------- boot ---------- */
const FB={};
function startDemo(){S.mode="demo";A=localAdapter();let r="w";try{r=localStorage.getItem("sakinah2.role")||"w"}catch(e){}S.r=r;S.o=r==="h"?"w":"h";S.couple={names:{h:"Sadiq",w:"Fatima"}};S.screen="app";attach();render()}
async function startFirebase(cfg){S.mode="fb";let F;try{F=await import("./fb.js")}catch(e){S.err="Could not load. Check your internet and refresh.";S.screen="signin";render();return}
const app=F.initializeApp(cfg),auth=F.getAuth(app);let db;try{db=F.initializeFirestore(app,{localCache:F.persistentLocalCache({tabManager:F.persistentMultipleTabManager()})})}catch(e){db=F.getFirestore(app)}
FB.signIn=async()=>{S.err="";const p=new F.GoogleAuthProvider();try{await F.signInWithPopup(auth,p)}catch(e){if(e&&/popup|operation-not-supported|cancelled-popup/.test(e.code||"")){try{await F.signInWithRedirect(auth,p)}catch(e2){S.err="Sign-in failed. Please try again.";render()}}else if(e&&e.code!=="auth/popup-closed-by-user"){S.err="Sign-in failed: "+(e.code||"unknown");render()}}};
FB.token=()=>auth.currentUser?auth.currentUser.getIdToken():Promise.reject(new Error("signed out"));
FB.pushOk=()=>!!window.SAKINAH_VAPID&&("serviceWorker" in navigator)&&("PushManager" in window)&&("Notification" in window);
FB.pushOn=async()=>{try{if(!FB.pushOk())return"unsupported";const p=await Notification.requestPermission();if(p!=="granted")return p==="denied"?"blocked":"later";const reg=await navigator.serviceWorker.ready;if(!(await F.isSupported()))return"unsupported";const t=await F.getToken(F.getMessaging(app),{vapidKey:window.SAKINAH_VAPID,serviceWorkerRegistration:reg});if(!t)return"error";await F.setDoc(F.doc(db,"users",S.user.uid),{fcm:F.arrayUnion(t)},{merge:true});localStorage.setItem("sakinah.push",t);return"on"}catch(e){return"error"}};
FB.pushOff=async()=>{try{const t=localStorage.getItem("sakinah.push");if(t&&S.user)await F.setDoc(F.doc(db,"users",S.user.uid),{fcm:F.arrayRemove(t)},{merge:true})}catch(e){}localStorage.removeItem("sakinah.push")};
FB.signOut=()=>{closeSheet();unsubs.forEach(u=>{try{u()}catch(e){}});unsubs=[];F.signOut(auth)};
const code=()=>{const a="ABCDEFGHJKMNPQRSTUVWXYZ23456789";let s="";const r=crypto.getRandomValues(new Uint8Array(8));r.forEach(x=>s+=a[x%a.length]);return s};
let coupleUn=null;
const enter=async(cid)=>{S.code=cid;A=fireAdapter(F,db,cid);if(coupleUn)coupleUn();let first=true;
coupleUn=F.onSnapshot(F.doc(db,"couples",cid),s=>{const d=s.exists()?s.data():null;if(!d){S.err="That space no longer exists.";S.screen="setup";render();return}S.couple=d;S.r=(d.roles||{})[S.user.uid];S.o=S.r==="h"?"w":"h";
if(first){first=false;S.screen=(d.members||[]).length<2?"wait":"app";attach()}else if(S.screen==="wait"&&(d.members||[]).length>=2){S.screen="app";heartsBurst(30);toast("You’re connected!")}render()},e=>{S.err="Could not open your space.";S.screen="setup";render()})};
FB.create=async role=>{try{const cid=code(),u=S.user;await F.setDoc(F.doc(db,"couples",cid),{members:[u.uid],roles:{[u.uid]:role},names:{h:role==="h"&&u.displayName?u.displayName.split(" ")[0]:"Sadiq",w:role==="w"&&u.displayName?u.displayName.split(" ")[0]:"Fatima"},created:Date.now()});await F.setDoc(F.doc(db,"users",u.uid),{cid});enter(cid)}catch(e){S.err="Could not create the space. "+(e.code||"");render()}};
FB.join=async raw=>{const cid=String(raw||"").trim().toUpperCase();if(cid.length<6){S.err="Please enter the full code.";render();return}try{const ref=F.doc(db,"couples",cid),s=await F.getDoc(ref);if(!s.exists()){S.err="That code was not found. Check it and try again.";render();return}const d=s.data(),u=S.user;if(!(d.members||[]).includes(u.uid)){if((d.members||[]).length>=2){S.err="This code is already in use by two people.";render();return}const taken=Object.values(d.roles||{})[0];await F.updateDoc(ref,{members:F.arrayUnion(u.uid),["roles."+u.uid]:taken==="h"?"w":"h"})}await F.setDoc(F.doc(db,"users",u.uid),{cid});enter(cid)}catch(e){S.err="Could not join. Check the code and try again.";render()}};
try{await F.getRedirectResult(auth)}catch(e){}
F.onAuthStateChanged(auth,async u=>{S.user=u;if(!u){S.screen="signin";S.r=null;render();return}S.screen="splash";render();try{const s=await F.getDoc(F.doc(db,"users",u.uid));const cid=s.exists()&&s.data().cid;if(cid)enter(cid);else{S.screen="setup";render()}}catch(e){S.screen="setup";render()}})}
render();
const cfg=window.SAKINAH_FIREBASE;
applyTheme(true);
if(cfg&&cfg.apiKey)startFirebase(cfg);else startDemo();
if("serviceWorker" in navigator&&location.protocol==="https:"&&cfg&&cfg.apiKey){navigator.serviceWorker.register("sw.js").catch(()=>{});navigator.serviceWorker.addEventListener("message",e=>{const u=e.data&&e.data.go;if(!u)return;const t=new URL(u,location.href).searchParams.get("tab");if(t&&S.screen==="app"){S.tab=t;S.sub=null;closeSheet();render()}})}
}
