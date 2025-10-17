const CACHE_NAME = 'loyalty-cache-v1'

// Ресурсы для кэширования, специфичные для вашего приложения "Loyalty Cards"
const urlsToCache = [
	'/', // Корневая страница
	'/cards', // Страница с картами
	'/api/cards', // API для данных карт (если используется)
	'/icon-192-192.png', // Иконки из manifest.ts
	'/icon-512-512.png',
	// '/_next/static/*', // Статические ресурсы Next.js (пример, уточните при необходимости)
]

// Установка Service Worker и кэширование ресурсов
self.addEventListener('install', event => {
	console.log('Service Worker: Installing...')
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then(cache => {
				console.log('Caching resources:', urlsToCache)
				return cache.addAll(urlsToCache)
			})
			.then(() => self.skipWaiting()) // Активируем сразу после установки
	)
})

// Активация Service Worker и очистка старых кэшей
self.addEventListener('activate', event => {
	console.log('Service Worker: Activating...')
	event.waitUntil(
		caches
			.keys()
			.then(cacheNames => {
				return Promise.all(
					cacheNames
						.filter(name => name !== CACHE_NAME)
						.map(name => caches.delete(name))
				)
			})
			.then(() => self.clients.claim()) // Берем контроль над страницами
	)
})

// Обработка запросов с кэшированием и обновлением
self.addEventListener('fetch', event => {
	const { request } = event
	// Игнорируем не-GET запросы и внутренние ресурсы Next.js
	if (
		request.method !== 'GET' ||
		request.url.includes('_rsc') ||
		request.url.includes('/_next/')
	)
		return

	event.respondWith(
		caches.match(request).then(cachedResponse => {
			const fetchPromise = fetch(request)
				.then(networkResponse => {
					if (
						networkResponse &&
						networkResponse.status === 200 &&
						networkResponse.type === 'basic'
					) {
						const responseToCache = networkResponse.clone()
						caches.open(CACHE_NAME).then(cache => {
							cache.put(request, responseToCache)
							console.log('Cached new response:', request.url)
						})
					}
					return networkResponse
				})
				.catch(error => {
					console.log('Fetch failed, using cache:', request.url, error)
					return cachedResponse
				})
			return cachedResponse || fetchPromise // "stale-while-revalidate"
		})
	)
})
