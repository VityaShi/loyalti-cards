import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const initialApi = createApi({
	reducerPath: 'initialApi',

	baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
	tagTypes: [],
	endpoints: builder => ({}),
})
