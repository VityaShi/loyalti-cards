import { supabase } from '@/shared/server'

/// Получение одной карты по ID
export async function getCardData(id: string) {
	// Оставляем string для совместимости с params
	const numericId = parseInt(id, 10) // Преобразуем в число для запроса к базе
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

	if (error) {
		throw new Error(`Failed to fetch card IDs: ${error.message}`)
	}

	return data.map(item => ({ id: item.id })) // id как число из базы
}

// Получение всех карт
export async function getCards() {
	const { data, error, status } = await supabase.from('cards').select('*')
	console.log('Cards Data:', data, 'Error:', error, 'Status:', status)

	if (error) {
		throw new Error(`Failed to fetch cards: ${error.message}`)
	}

	return data || []
}
