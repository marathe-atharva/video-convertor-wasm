import { FC, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ThemeContext } from '@store/Theme'

const Header: FC = () => {
	const { theme, setTheme } = useContext(ThemeContext)

	return (
		<nav
			className="flex items-center justify-between w-full max-w-4xl p-8 mx-auto mt-2 my-0 sticky top-0 bg-opacity-50"
			style={{
				zIndex: 10,
				backdropFilter: 'saturate(100%) blur(20px)',
				transition: 'background-color 0.1 ease-in-out',
			}}
		>
			<Link href="/">
				<a
					className="flex items-center justify-center align-middle"
					data-splitbee-event="Home"
					data-splitbee-event-type="Link event"
				>
					<Image
						src="/logo.png"
						blurDataURL="/logo.png"
						alt="converter logo"
						width="35px"
						height="35px"
						objectFit="contain"
						objectPosition="center"
						layout="intrinsic"
					/>
					<span className="text-2xl font-bold font-sans tracking-wide ml-2">
						Converter
					</span>
				</a>
			</Link>
			<button
				className="w-[30px] h-[30px] transition duration-500 ease-in-out rounded-md border-2 p-1 border-black-100 dark:border-white-100 text-black-100 dark:text-white-100 bg-transparent flex align-middle justify-center items-center"
				onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
			>
				{theme === 'dark' ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="3"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="w-[15px] h-[15px]"
					>
						<circle cx="12" cy="12" r="5"></circle>
						<line x1="12" y1="1" x2="12" y2="3"></line>
						<line x1="12" y1="21" x2="12" y2="23"></line>
						<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
						<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
						<line x1="1" y1="12" x2="3" y2="12"></line>
						<line x1="21" y1="12" x2="23" y2="12"></line>
						<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
						<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="3"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="w-[15px] h-[15px]"
					>
						<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
					</svg>
				)}
			</button>
		</nav>
	)
}

export default Header
