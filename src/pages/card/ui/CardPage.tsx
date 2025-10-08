import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getCardData } from '../api/getCardData'

interface CardPageProps {
	params: { id: string }
}

export default async function CardPage({ params }: CardPageProps) {
	const card = await getCardData(params.id)

	if (!card) {
		notFound()
	}
	return (
		<main>
			<Image
				src='/store-logos/x5-group.png' // путь относительно /public
				alt='Логотип'
				width={120}
				height={40}
				priority
			/>

			<p className='text-gray-600'>{card.storeName}</p>
		</main>
	)
}
