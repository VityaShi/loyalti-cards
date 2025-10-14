import { supabase } from '@shared/server'

// Получение одной карты по ID
export async function getCardData(id: string) {
	const numericId = parseInt(id, 10) // Преобразуем строку в число
	if (isNaN(numericId)) {
		throw new Error('Invalid card ID: must be a valid number')
	}

	const { data, error } = await supabase
		.from('cards')
		.select('*')
		.eq('id', numericId)
		.single()

	if (error) {
		throw new Error(`Failed to fetch card: ${error.message}`)
	}

	return data
}

// Получение всех ID карт
export async function getAllCardIds() {
	const { data, error } = await supabase.from('cards').select('id')
	console.log(data)
	if (error) {
		throw new Error(`Failed to fetch card IDs: ${error.message}`)
	}

	// Убедимся, что возвращаем ID как строки для generateStaticParams
	return data.map(item => ({ id: item.id.toString() }))
}

// Получение всех карт
export async function getCards() {
	const { data, error } = await supabase.from('cards').select('*')
	console.log(data)
	if (error) {
		throw new Error(`Failed to fetch cards: ${error.message}`)
	}

	return data
}
