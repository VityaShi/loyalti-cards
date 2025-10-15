'use client'

import { useState } from 'react'
import { QrReader } from 'react-qr-reader'
import styles from './scan-page.module.css'
// const QrReader = dynamic(
//   () => import('react-qr-reader').then(mod => mod.QrReader), // Берем конкретно QrReader
//   { ssr: false }
// )

export default function ScanPage() {
	const [result, setResult] = useState('Направьте камеру на карту')
	const [error, setError] = useState<string | null>(null)

	const handleScan = (result: any) => {
		if (result && typeof result.getText === 'function') {
			const scannedText = result.getText() // Используем getText() для получения текста
			setResult(scannedText)
			console.log('Отсканировано:', scannedText)
		}
	}

	const handleError = (err: any) => {
		setError('Ошибка доступа к камере: ' + err.message)
		console.error('Ошибка сканирования:', err)
	}

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Сканирование карты</h1>
			<div className={styles.scannerContainer}>
				<QrReader
					onResult={(result, error) => {
						if (result) {
							handleScan(result)
						}
						if (error) {
							handleError(error)
						}
					}}
					constraints={{ facingMode: 'environment' }}
				/>
			</div>
			<p className={styles.result}>{result}</p>
			{error && <p className={styles.error}>{error}</p>}
			<button
				onClick={() => window.history.back()}
				className={styles.backButton}
			>
				Назад
			</button>
		</div>
	)
}
