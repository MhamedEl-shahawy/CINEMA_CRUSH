const staticCacheName = 'site-static-v2';
const dynamicCacheName = 'site-dynamic-v1';
const assets = [
  '/',
  '/index.html',
  '/cast.html',
  '/movie.html',
  '/popular.html',
  '/search.html',
  '/top_rated.html',
  '/trend.html',
  '/tv.html',
  '/tvshow.html',
  '/upcoming.html',
  '/js/app.js',
  '/css/style.css',
  '/css/footer.css',
  'https://code.jquery.com/jquery-2.2.0.min.js',
  'https://unpkg.com/axios/dist/axios.min.js',
  '/js/loader.js',
  '/js/welcome.js',
  '/js/anime.js',
  '/js/main.js',
  '/js/query.js',
  '/img/cinemacrush-logo.png',
  '/img/logo.png',
  '/img/star1.png',
  '/img/star0.png',
  '/img/star2.png',
  '/img/favcon.png'


];

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if(keys.length > size){
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// install event
self.addEventListener('install', evt => {
  //console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener('activate', evt => {
  //console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      //console.log(keys);
      return Promise.all(keys
        .filter(key => key !== staticCacheName && key !== dynamicCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener('fetch', evt => {
  //console.log('fetch event', evt);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open(dynamicCacheName).then(cache => {
          cache.put(evt.request.url, fetchRes.clone());
          // check cached items size
          limitCacheSize(dynamicCacheName, 15);
          return fetchRes;
        })
      });
    })
  );
});