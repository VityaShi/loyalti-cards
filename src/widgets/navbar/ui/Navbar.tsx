import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
	return (
		<nav>
			<ol>
				<li>
					<Link href='/'>
						<Image
							src='/navbar/li_home.svg'
							width={25}
							height={24}
							alt='home'
						/>
					</Link>
				</li>
				<li>
					<Link href='/'>
						<Image src='/navbar/scan.svg' width={25} height={24} alt='scan' />
					</Link>
				</li>
				<li>
					<Link href='/'>
						<Image
							src='/navbar/li_user.svg'
							width={25}
							height={24}
							alt='user'
						/>
					</Link>
				</li>
			</ol>
		</nav>
	)
}
