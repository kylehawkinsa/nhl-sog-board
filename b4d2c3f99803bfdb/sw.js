const C="sog-2026-10-12-002632",SHELL=["./","index.html","manifest.json","icons/icon.svg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL.concat("data.json"))));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!=="GET"||u.origin!==location.origin)return;
 // network-first for the board data (fall back to last cached board offline); cache-first for the shell
 if(u.pathname.endsWith("data.json")){e.respondWith(fetch(e.request,{cache:"no-store"}).then(r=>{const k=r.clone();caches.open(C).then(c=>c.put("data.json",k));return r}).catch(()=>caches.match("data.json")));return}
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request)))});
