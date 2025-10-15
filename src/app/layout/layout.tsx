import { StoreProvider } from '@/shared/store'
import { BackButton } from '@/shared/ui'
import Navbar from '@/widgets/navbar'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { RegisterSW } from '../config/RegisterSW'
import styles from './layout.module.css'

import '../styles/index.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Loyalty Cards',
	description: 'Приложение для хранения скидочных карт',
	manifest: '/manifest.json', // 📌 важный момент
	themeColor: '#317EFB',
}

export function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<head>
				<link rel='manifest' href='/manifest.json' /> {/* Явно добавляем тег */}
				<meta name='theme-color' content='#317EFB' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0, viewport-fit=cover'
				/>
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<StoreProvider>
					<header className={styles.header}>
						<BackButton />
					</header>
					<main>{children}</main>
					<footer>
						<Navbar />
					</footer>
				</StoreProvider>
				<RegisterSW />
			</body>
		</html>
	)
}
