import { FC } from 'react'
import Link from 'next/link'

const Footer: FC = () => {
	return (
		<footer className="text-md text-center mb-8 w-full max-w-4xl mx-auto pt-8 px-4 mt-auto bg-white-100 text-black-100 dark:bg-black-100 dark:text-white-100 font-sans tracking-tight">
			Built with &bull;{' '}
			<Link href="https://nextjs.org/">
				<a
					className="hover:underline font-sans font-bold tracking-normal"
					target="_blank"
					rel="noopener noreferrer"
					data-splitbee-event="Stack check Next.js"
					data-splitbee-event-type="Button click"
				>
					Next.js
				</a>
			</Link>{' '}
			&bull;{' '}
			<Link href="https://ffmpegwasm.netlify.app/">
				<a
					className="hover:underline font-sans font-bold tracking-normal"
					target="_blank"
					rel="noopener noreferrer"
					data-splitbee-event="Stack check FFmpeg.wasm"
					data-splitbee-event-type="Button click"
				>
					FFmpeg.wasm
				</a>
			</Link>{' '}
			&bull;{' '}
			<Link href="https://www.typescriptlang.org/">
				<a
					className="hover:underline font-sans font-bold tracking-normal"
					target="_blank"
					rel="noopener noreferrer"
					data-splitbee-event="Stack check Typescript"
					data-splitbee-event-type="Button click"
				>
					Typescript
				</a>
			</Link>{' '}
			&bull;{' '}
			<Link href="https://tailwindcss.com/">
				<a
					className="hover:underline font-sans font-bold tracking-normal"
					target="_blank"
					rel="noopener noreferrer"
					data-splitbee-event="Stack check TailwindCSS"
					data-splitbee-event-type="Button click"
				>
					TailwindCSS
				</a>
			</Link>{' '}
			&bull; and more!{' '}
		</footer>
	)
}

export default Footer
