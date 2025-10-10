import { CardsList } from '@/entities/card'
import Link from 'next/link'

import styles from './cards-page.module.css'

export default function CardsPage() {
	return (
		<section className={styles.main}>
			<header className='flex justify-between items-center mb-4'>
				<h1 className='text-2xl font-bold'>Мои карты</h1>
				<Link href='/add' className='bg-green-600 text-white px-4 py-2 rounded'>
					+ Добавить
				</Link>
			</header>
			<section>
				<CardsList />
			</section>
		</section>
	)
}
