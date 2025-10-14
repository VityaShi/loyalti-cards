import { getAllCardIds, getCardData } from '@entities/card'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import styles from './card-page.module.css'

export async function generateStaticParams() {
	const ids = await getAllCardIds()
	return ids.map(id => ({ id }))
}

interface CardPageProps {
	params: { id: string }
}

export default async function CardPage({ params }: CardPageProps) {
	const { id } = await params
	const card = await getCardData(id)
	const getPath = () => `/store-logos/${card?.storeName}.png`

	if (!card) {
		notFound()
	}
	return (
		<section className={styles['card-page']}>
			<Image
				src={getPath()} // путь относительно /public
				alt='Логотип'
				width={200}
				height={120}
				priority
			/>

			<p className='text-gray-600'>{card.storeName}</p>
		</section>
	)
}
