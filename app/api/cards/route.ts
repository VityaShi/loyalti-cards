import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// GET /api/cards
export async function GET() {
	const cards = await prisma.card.findMany()
	return NextResponse.json(cards)
}

// POST /api/cards
export async function POST(req: Request) {
	const data = await req.json()
	const card = await prisma.card.create({ data })
	return NextResponse.json(card)
}

// // DELETE /api/cards/:id
// export async function DELETE(req: Request) {
// 	const id = req.nextUrl.searchParams.get('id')
// 	const card = await prisma.card.delete({ where: { id } })
// 	return NextResponse.json(card)
// }
