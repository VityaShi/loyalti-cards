import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	const cards = [
		{ storeName: 'Пятерочка', cardNumber: '1234 5678 9012' },
		{ storeName: 'Магнит', cardNumber: '9876 5432 1098' },
		{ storeName: 'Лента', cardNumber: '1111 2222 3333' },
		{ storeName: 'Fix Price', cardNumber: '4444 5555 6666' },
	]

	for (const c of cards) {
		await prisma.card.upsert({
			where: { cardNumber: c.cardNumber }, // уникальный идентификатор
			update: {}, // если уже есть — оставляем без изменений
			create: c, // если нет — создаём
		})
	}
}

main()
	.then(() => {
		console.log('Seed выполнен успешно ✅')
		return prisma.$disconnect()
	})
	.catch(e => {
		console.error(e)
		prisma.$disconnect()
	})
