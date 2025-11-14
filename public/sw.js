const CACHE_NAME = 'my-app-v1';
const urlsToCache = [
  '/',
  '/cart',
  '/api/categories',
  '/api/products'
];

// 安装事件 - 缓存资源
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching files');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker: Cached successfully');
        return self.skipWaiting();
      })
      .catch(err => {
        console.error('Service Worker: Caching failed', err);
      })
  );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// 拦截请求 - 缓存策略
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // 跳过非 GET 请求
  if (request.method !== 'GET') {
    return;
  }

  // 跳过 Chrome 扩展请求
  if (url.protocol === 'chrome-extension:') {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then(response => {
        // 如果缓存中有，返回缓存
        if (response) {
          console.log('Service Worker: Serving from cache', request.url);
          return response;
        }

        // 否则从网络获取
        return fetch(request)
          .then(response => {
            // 检查是否有效响应
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // 克隆响应（响应流只能使用一次）
            const responseToCache = response.clone();

            // 添加到缓存
            caches.open(CACHE_NAME)
              .then(cache => {
                console.log('Service Worker: Caching new resource', request.url);
                cache.put(request, responseToCache);
              });

            return response;
          })
          .catch(error => {
            console.error('Service Worker: Fetch failed', error);

            // 如果请求的是页面，返回离线页面
            if (request.destination === 'document') {
              return caches.match('/');
            }

            throw error;
          });
      })
  );
});

// 推送通知（可选功能）
self.addEventListener('push', event => {
  console.log('Service Worker: Push received');

  const options = {
    body: event.data ? event.data.text() : 'New notification',
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Go to site',
        icon: '/check.png'
      },
      {
        action: 'close',
        title: 'Close notification',
        icon: '/x.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('My App', options)
  );
});

// 通知点击事件
self.addEventListener('notificationclick', event => {
  console.log('Service Worker: Notification clicked');

  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// 后台同步（可选功能）
self.addEventListener('sync', event => {
  console.log('Service Worker: Background sync', event.tag);

  if (event.tag === 'background-sync') {
    event.waitUntil(
      // 执行同步任务
      console.log('Service Worker: Performing background sync')
    );
  }
});
