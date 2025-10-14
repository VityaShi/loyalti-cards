import { CardsList } from '@/entities/card'

import styles from './cards-page.module.css'

export default function CardsPage() {
	return (
		<section className={styles.main}>
			<CardsList />
		</section>
	)
}
