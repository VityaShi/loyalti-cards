import { supabase } from '@/shared/server'
import { NextResponse } from 'next/server'

// GET /api/cards
export async function GET() {
	const { data, error } = await supabase.from('cards').select('*')

	if (error) {
		return NextResponse.json(
			{ error: `Failed to fetch cards: ${error.message}` },
			{ status: 500 }
		)
	}

	return NextResponse.json(data)
}

// POST /api/cards
export async function POST(req: Request) {
	const { name, code, storeName, userId } = await req.json() // Адаптируй поля под твою схему

	const { data, error } = await supabase
		.from('cards')
		.insert([{ name, code, storeName, userId }])

	if (error) {
		return NextResponse.json(
			{ error: `Failed to create card: ${error.message}` },
			{ status: 500 }
		)
	}

	return NextResponse.json(data?.[0]) // Возвращаем первую вставленную запись
}
