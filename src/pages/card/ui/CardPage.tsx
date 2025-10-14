import { getAllCardIds, getCardData } from '@entities/card'
import Image from 'next/image'
import { notFound } from 'next/navigation'

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

	if (!card) {
		notFound()
	}
	return (
		<section>
			<Image
				src='/store-logos/x5-group.png' // путь относительно /public
				alt='Логотип'
				width={120}
				height={40}
				priority
			/>

			<p className='text-gray-600'>{card.storeName}</p>
		</section>
	)
}
