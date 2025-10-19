import { getCards } from '@/entities/card'

import { CardItem } from '@/entities/card/'
import Link from 'next/link'
import styles from './cards-page.module.css'

export async function CardsPage() {
	const cards = await getCards()
	return (
		<section className={styles.main}>
			{cards.length > 0 ? (
				<ul className={styles['card-list']}>
					{cards.map(c => (
						<li key={c.id}>
							<Link href={`/cards/${c.id}`}>
								<CardItem {...c} />
							</Link>
						</li>
					))}
				</ul>
			) : (
				<p>Пока нет карт</p>
			)}
		</section>
	)
}
