import { StoreProvider } from '@/shared/store'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { RegisterSW } from '../config/RegisterSW'
import '../styles/globals.css'

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
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<StoreProvider>{children}</StoreProvider>
				<RegisterSW />
			</body>
		</html>
	)
}
