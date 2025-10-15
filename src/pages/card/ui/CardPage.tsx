import { getAllCardIds, getCardData } from '@entities/card'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import styles from './card-page.module.css'

// Генерация статических параметров для динамических маршрутов
export async function generateStaticParams() {
	const ids = await getAllCardIds()
	return ids.map(item => ({ id: item.id.toString() })) // id как строки для params
}

// Определяем тип params как объект с id: string
interface RouteParams {
	id: string
}

// Определяем пропсы с учётом асинхронного контекста
interface CardPageProps {
	params: RouteParams // params как объект с id: string
}

export default async function CardPage({ params }: CardPageProps) {
	const { id } = params
	const numericId = parseInt(id, 10) // Преобразуем строку в число
	if (isNaN(numericId)) {
		notFound() // Некорректный id
	}

	const card = await getCardData(numericId.toString()) // Передаем как строку, если getCardData ожидает строку

	if (!card) {
		notFound()
	}

	const getPath = () => `/store-logos/${card.storeName}.png`

	return (
		<section className={styles['card-page']}>
			<Image src={getPath()} alt='Логотип' width={200} height={120} priority />
			<p className='text-gray-600'>{card.storeName}</p>
		</section>
	)
}
