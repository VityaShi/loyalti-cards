'use client'

import { useState } from 'react'
import { QrReader } from 'react-qr-reader'

import { supabase } from '@/shared/server'
import styles from './scan-page.module.css'

export default function ScanPage() {
	const [result, setResult] = useState('Направьте камеру на карту')
	const [error, setError] = useState<string | null>(null)
	const [isSaving, setIsSaving] = useState(false)

	const detectStoreName = (barcode: string): string => {
		if (barcode.startsWith('2200')) return 'x5-group'
		if (barcode.startsWith('2000')) return 'magnit'
		if (barcode.startsWith('2300')) return 'Лента'
		if (barcode.startsWith('4600')) return 'Перекрёсток'
		return 'Неизвестный магазин'
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
			alert(scannedText)
			setResult(scannedText)
			console.log('Отсканировано:', scannedText)
			saveCardToDB(scannedText)
		}
	}

	const handleError = (err: unknown) => {
		console.error('Ошибка сканирования:', err)
		setError('Ошибка доступа к камере: ' + JSON.stringify(err))
	}

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Сканирование карты</h1>
			<div className={styles.scannerContainer}>
				<QrReader
					onResult={(result, error) => {
						if (result) handleScan(result)
						if (error) {
							console.error('Raw camera error:', error)
							try {
								setError(
									'Ошибка доступа к камере: ' +
										JSON.stringify(error, Object.getOwnPropertyNames(error))
								)
							} catch {
								setError('Ошибка доступа к камере (объект не сериализуется)')
							}
						}
					}}
					constraints={{
						facingMode: 'environment',
					}}
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
