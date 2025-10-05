import { PrismaClient } from '@prisma/client'

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
							{/* <CardItem {...c} /> */}
							<article>
								<h3 className='text-lg font-semibold'>{c.storeName}</h3>
								<p className='text-gray-600'>{c.cardNumber}</p>
							</article>
						</li>
					))}
				</ul>
			) : (
				<p className='text-gray-500'>Пока нет карт</p>
			)}
		</div>
	)
}
