'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Card } from '../model/card'
import styles from './card-item.module.css'

export const CardItem = (data: Card) => {
	const [imageError, setImageError] = useState(false)

	const getPath = () => `/store-logos/${data.store_name}.png`

	// Не рендерим компонент, если изображение не найдено
	if (imageError) return null

	return (
		<article className={styles.container}>
			<Image
				src={getPath()} // путь относительно /public
				alt='Логотип'
				width={120}
				height={70}
				priority
				onError={() => setImageError(true)} // Устанавливаем состояние ошибки при неудачной загрузке
			/>
			{/* <h3 className='text-lg font-semibold'>{data.store_name}</h3>
      <p className='text-gray-600'>{data.barcode}</p> */}
		</article>
	)
}
