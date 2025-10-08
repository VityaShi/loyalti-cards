import { prisma } from '@/shared/server'

export async function getCardData(id: string) {
	return prisma.card.findUnique({
		where: { id },
	})
}
