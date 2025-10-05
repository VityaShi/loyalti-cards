import { initialApi } from '@/shared/server'
import { Card } from '../model/card'

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
