import Link from 'next/link'
import { getCards } from '../api/card-api'
import { CardItem } from './CardItem'
import styles from './card-list.module.css'

export const CardsList = async () => {
	const cards = await getCards()

	return (
		<>
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
		</>
	)
}
