'use client'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import styles from './backButton.module.css'

export function BackButton() {
	const pathname = usePathname()
	const router = useRouter()

	// Скрываем кнопку на главной странице
	if (pathname === '/' || pathname === '/cards') {
		return null
	}

	return (
		<button
			className={styles.backButton}
			onClick={() => router.back()}
			aria-label='Go back'
		>
			<Image src='/navbar/back-arrow2.svg' width={28} height={28} alt='Back' />
		</button>
	)
}
