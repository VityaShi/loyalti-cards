const CACHE_NAME = 'loyalty-cache-v1'

// Статические страницы и API, которые хотим кешировать
const urlsToCache = [
	'/', // главная
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

	// Игнорируем RSC и все файлы Next.js
	if (request.url.includes('_rsc') || request.url.includes('/_next/')) return

	if (request.method === 'GET') {
		event.respondWith(
			caches.match(request).then(cachedResponse => {
				const networkFetch = fetch(request)
					.then(response => {
						// Кэшируем успешные GET-запросы
						if (response && response.status === 200) {
							caches
								.open(CACHE_NAME)
								.then(cache => cache.put(request, response.clone()))
						}
						return response
					})
					.catch(() => {
						// Если сеть недоступна, отдаем кеш
						return cachedResponse
					})
				// Отдаем кеш если есть, иначе fetch
				return cachedResponse || networkFetch
			})
		)
	}
})
