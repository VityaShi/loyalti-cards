import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	await prisma.card.createMany({
		data: [
			{ storeName: 'KFC', cardNumber: '1234 5678 9012' },
			{ storeName: 'Starbucks', cardNumber: '9876 5432 1098' },
			{ storeName: 'IKEA', cardNumber: '1111 2222 3333' },
		],
	})
}

main()
	.then(() => prisma.$disconnect())
	.catch(e => {
		console.error(e)
		prisma.$disconnect()
	})
