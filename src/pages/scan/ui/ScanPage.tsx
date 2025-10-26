'use client'

import { supabase } from '@/shared/server'
import { useState } from 'react'
import { QrReader } from 'react-qr-reader'
import styles from './scan-page.module.css'

export default function ScanPage() {
	const [result, setResult] = useState('Направьте камеру на карту')
	const [error, setError] = useState<string | null>(null)
	const [isSaving, setIsSaving] = useState(false)
	const [lastScanned, setLastScanned] = useState<string | null>(null)

	const detectStoreName = (store_name: string): string => {
		if (store_name.startsWith('2200')) return 'x5-group'
		if (store_name.startsWith('2000')) return 'magnit'
		if (store_name.startsWith('2300')) return 'lenta'
		if (store_name.startsWith('4600')) return 'perekrestok'
		return 'unknown'
	}

	const saveCardToDB = async (barcode: string) => {
		try {
			setIsSaving(true)
			const storeName = detectStoreName(barcode)

			const { error } = await supabase.from('cards').insert([
				{
					store_name: storeName,
					barcode,
				},
			])

			if (error) throw error
			setResult(`Карта добавлена: ${storeName}`)
		} catch (e: unknown) {
			console.error('Ошибка сохранения:', e)
			setError('Ошибка при сохранении карты: ' + (e as Error).message)
		} finally {
			setIsSaving(false)
		}
	}

	const handleScan = (result: { getText: () => string }) => {
		if (result && typeof result.getText === 'function') {
			const scannedText = result.getText()
			if (scannedText === lastScanned) return // предотвращаем повтор

			setLastScanned(scannedText)
			setResult(scannedText)
			console.log('Отсканировано:', scannedText)
			saveCardToDB(scannedText)
		}
	}

	const handleError = (err: unknown) => {
		if (err instanceof DOMException) {
			setError(`Ошибка доступа к камере: ${err.name} — ${err.message}`)
		} else {
			setError('Ошибка доступа к камере: ' + String(err))
		}
		console.error('Ошибка сканирования:', err)
	}

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Сканирование карты</h1>
			<div className={styles.scannerContainer}>
				<QrReader
					onResult={(result, error) => {
						if (result) handleScan(result)
						if (error) handleError(error)
					}}
					constraints={{ facingMode: 'environment' }}
				/>
			</div>

			<p className={styles.result}>{result}</p>
			{isSaving && <p>Сохраняем карту...</p>}
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
