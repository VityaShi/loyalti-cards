import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Loyalty Cards', // Полное название приложения
		short_name: 'Loyalty', // Короткое название для иконки
		description: 'Приложение для хранения и управления скидочными картами', // Описание для SEO и PWA
		start_url: '/', // Точка входа
		scope: '/', // Область действия PWA (включает все пути)
		id: 'loyalti-cards.vercel.app',
		display: 'standalone', // Полноэкранный режим, как нативное приложение
		background_color: '#1d1f24', // Темный фон, соответствует вашему дизайну
		theme_color: '#242c3b', // Основной цвет темы, из вашего стиля
		icons: [
			{
				src: '/icon-192-192.png', // Путь к иконке 192x192
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: '/icon-512-512.png', // Путь к иконке 512x512
				sizes: '512x512',
				type: 'image/png',
			},
		],
		screenshots: [
			{
				src: '/screenshots/loyalty-cards-home.png',
				sizes: '1280x720',
				type: 'image/png',
				label: 'Главная страница приложения Loyalty Cards',
			},
		],
	}
}
