import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import { CardItem } from './CardItem'

const prisma = new PrismaClient()

export const CardsList = async () => {
	const cards = await prisma.card.findMany({
		orderBy: { createdAt: 'desc' },
	})

	return (
		<div>
			{cards.length > 0 ? (
				<ul className='space-y-3'>
					{cards.map(c => (
						<li key={c.id} className='rounded-2xl shadow-md p-4 bg-white'>
							<Link href={`/cards/${c.id}`}>
								<CardItem {...c} />
							</Link>
						</li>
					))}
				</ul>
			) : (
				<p className='text-gray-500'>Пока нет карт</p>
			)}
		</div>
	)
}
