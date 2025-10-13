'use client'

import clsx from 'clsx'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import styles from './navbar.module.css'

export default function Navbar() {
	const [activeItem, setActiveItem] = useState('home') // Начальное активное состояние

	return (
		<nav className={styles.menu}>
			<ul className={styles['menu-list']}>
				<li
					className={clsx(
						styles['menu-item'],
						activeItem === 'home' && styles['menu-item--active']
					)}
					onClick={() => setActiveItem('home')}
				>
					<Link className={styles['menu-link']} href='/'>
						<motion.div
							whileHover={{ scale: 1.1 }} // Увеличение при наведении
							whileTap={{ y: -3, boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' }} // Подъём и тень при нажатии
							// className={clsx(
							// 	styles['menu-item'],
							// 	activeItem === 'home' && styles['menu-item--active']
							// )}
						>
							<Image
								src='/navbar/li_home.svg'
								width={25}
								height={24}
								alt='home'
							/>
						</motion.div>
					</Link>
				</li>
				<li
					className={clsx(
						styles['menu-item'],
						styles['menu-item--scan']
						// activeItem === 'scan' && styles['menu-item--active']
					)}
					onClick={() => setActiveItem('scan')}
				>
					<Link className={styles['menu-link']} href='/'>
						<Image src='/navbar/scan.svg' width={25} height={24} alt='scan' />
					</Link>
				</li>
				<li
					className={clsx(
						styles['menu-item'],
						activeItem === 'user' && styles['menu-item--active']
					)}
					onClick={() => setActiveItem('user')}
				>
					<Link className={styles['menu-link']} href='/'>
						<Image
							src='/navbar/li_user.svg'
							width={25}
							height={24}
							alt='user'
						/>
					</Link>
				</li>
			</ul>
		</nav>
	)
}
