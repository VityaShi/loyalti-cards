import { getAllCardIds, getCardData } from '@entities/card'
import { notFound } from 'next/navigation'

import Image from 'next/image'

import Barcode from './Barcode'
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
	params: Promise<RouteParams> // params как объект с id: string
}

export async function CardPage({ params }: CardPageProps) {
	const { id } = await params
	const numericId = parseInt(id, 10) // Преобразуем строку в число
	if (isNaN(numericId)) {
		notFound() // Некорректный id
	}

	const card = await getCardData(numericId.toString()) // Передаем как строку, если getCardData ожидает строку

	if (!card) {
		notFound()
	}

	const getPath = () => `/store-logos/${card.store_name}.png`

	return (
		// <CardSkeleton />
		<section className={styles['card-page']}>
			<div className={styles['card-page__image-container']}>
				<Image
					className={styles['card-page__image']}
					src={getPath()}
					alt='Логотип'
					fill
					priority
				/>
			</div>

			<div className={styles['card-page__barcode-container']}>
				<Barcode
					value={card.barcode}
					format='CODE128'
					width={1.7}
					height={65}
					background='transparent'
				/>
			</div>
		</section>
	)
}
