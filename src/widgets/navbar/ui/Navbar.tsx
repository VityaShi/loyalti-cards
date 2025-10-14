'use client'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './navbar.module.css'

export default function Navbar() {
	const [activeItem, setActiveItem] = useState<string | null>('home') // Начальное активное состояние
	const pathname = usePathname()
	useEffect(() => {
		if (pathname === '/' || pathname === '/cards') {
			setActiveItem('home')
		} else if (pathname?.startsWith('/scan')) {
			setActiveItem('scan')
		} else if (pathname?.startsWith('/user')) {
			setActiveItem('user')
		} else {
			setActiveItem(null) // Сбрасываем для других маршрутов
		}
	}, [pathname])
	return (
		<nav className={styles.menu}>
			<ul className={styles['menu-list']}>
				<li
					className={clsx(
						styles['menu-item'],
						activeItem === 'home' && styles['menu-item--active']
					)}
					onClick={() => {
						setActiveItem('home')
					}}
				>
					<Link className={styles['menu-link']} href='/'>
						<Image
							src='/navbar/li_home.svg'
							width={25}
							height={24}
							alt='home'
						/>
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
