import styles from './card-skeleton.module.css'

export function CardSkeleton() {
	return (
		<div className={styles['card-skeleton']}>
			<div className={styles['card-skeleton__image']}></div>
			{/* <div className="card-skeleton__image"></div>
			<div className="card-skeleton__content">
				<div className="card-skeleton__title"></div>
				<div className="card-skeleton__description"></div>
			</div> */}
			<div className={styles['card-skeleton__barcode']}></div>
		</div>
	)
}
