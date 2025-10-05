'use client'

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { initialApi } from '../server'

export const store = configureStore({
	reducer: {
		[initialApi.reducerPath]: initialApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(initialApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export function StoreProvider({ children }: { children: React.ReactNode }) {
	return <Provider store={store}>{children}</Provider>
}
