import { initialApi } from '@/shared/server'
import { Card } from '../model/card'

import { prisma } from '@/shared/server'

export async function getCardData(id: string) {
	return prisma.card.findUnique({
		where: { id },
	})
}

export async function getAllCardIds() {
	return prisma.card.findMany({
		select: { id: true },
	})
}

export async function getCards() {
	return prisma.card.findMany()
}

const cardApi = initialApi
	.enhanceEndpoints({
		addTagTypes: ['Card'],
	})
	.injectEndpoints({
		endpoints: builder => ({
			getCards: builder.query<Card[], void>({
				query: () => '/cards',
				providesTags: ['Card'],
			}),
			addCard: builder.mutation<Card, Partial<Card>>({
				query: body => ({
					url: '/cards',
					method: 'POST',
					body,
				}),
				invalidatesTags: ['Card'],
			}),
		}),

		overrideExisting: true,
	})

export const { useGetCardsQuery, useAddCardMutation } = cardApi
