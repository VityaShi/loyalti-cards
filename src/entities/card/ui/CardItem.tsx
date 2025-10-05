import { Card } from '../model/card'

export const CardItem = (data: Card) => {
	return (
		<article>
			<h3 className='text-lg font-semibold'>{data.storeName}</h3>
			<p className='text-gray-600'>{data.cardNumber}</p>
		</article>
	)
}
