import Image from 'next/image'
import { Card } from '../model/card'

import styles from './card-item.module.css'

export const CardItem = (data: Card) => {
	return (
		<article className={styles.container}>
			<Image
				src='/store-logos/x5-group.png' // путь относительно /public
				alt='Логотип'
				width={120}
				height={40}
				priority
			/>
			<h3 className='text-lg font-semibold'>{data.storeName}</h3>
			<p className='text-gray-600'>{data.cardNumber}</p>
		</article>
	)
}
