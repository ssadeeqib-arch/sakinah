const C="sakinah-v11";
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(["./","index.html","style.css","content.js","stories.js","app.js","config.js","fb.js","manifest.webmanifest","icon-192.png"]).catch(()=>{})))});
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!=="GET"||u.origin!==location.origin)return;
e.respondWith(fetch(e.request,{cache:"no-cache"}).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match("index.html"))))});
/* Phone alerts: a small push from the sender arrives here and is shown as a notification. */
self.addEventListener("push",e=>{let p={};try{p=e.data?e.data.json():{}}catch(x){try{p={data:{body:e.data.text()}}}catch(y){}}
const d=Object.assign({},p.notification||{},p.data||{});
e.waitUntil(self.registration.showNotification(d.title||"Sakinah",{body:d.body||"Something new is waiting for you.",icon:"icon-192.png",badge:"icon-192.png",tag:d.tag||"sakinah",renotify:true,data:{url:d.url||"./"}}))});
self.addEventListener("notificationclick",e=>{e.notification.close();const u=(e.notification.data&&e.notification.data.url)||"./";
e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(cs=>{for(const c of cs){if("focus" in c){c.postMessage({go:u});return c.focus()}}return self.clients.openWindow(u)}))});
