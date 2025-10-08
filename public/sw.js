const CACHE_NAME = 'loyalty-cache-v1'

// Статические страницы и API, которые хотим кешировать
const urlsToCache = [
	'/cards', // список карточек
	'/api/cards', // API карточек
]

// Установка: кешируем страницы и API
self.addEventListener('install', event => {
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then(cache => cache.addAll(urlsToCache))
			.then(() => self.skipWaiting())
	)
})

// Активация: сразу берём контроль над вкладками
self.addEventListener('activate', event => {
	event.waitUntil(self.clients.claim())
})

// Фетч: stale-while-revalidate стратегия
self.addEventListener('fetch', event => {
	const { request } = event

	// Пропускаем служебные запросы Next.js
	if (
		request.method !== 'GET' ||
		request.url.includes('_rsc') ||
		request.url.includes('/_next/') ||
		request.url.endsWith('/') // пропускаем главную
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
						})
					}
					return networkResponse.clone()
				})
				.catch(() => cachedResponse)

			return cachedResponse || fetchPromise
		})
	)
})
