import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	await prisma.card.createMany({
		data: [
			{ storeName: 'Пятерочка', cardNumber: '1234 5678 9012' },
			{ storeName: 'Магнит', cardNumber: '9876 5432 1098' },
		],
	})
}

main()
	.then(() => prisma.$disconnect())
	.catch(e => {
		console.error(e)
		prisma.$disconnect()
	})
