import { FC } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

const NotFound: FC = () => {
	return (
		<div className="min-w-screen min-h-screen bg-white-100 text-black-100 dark:bg-black-100 dark:text-white-100">
			<div className="flex items-center max-w-2xl lg:max-w-3xl mx-auto min-h-screen bg-white-100 text-black-100 dark:bg-black-100 dark:text-white-100">
				<Head>
					<title>Video Convertor | Not found</title>
					<link rel="icon" href="/favicons/favicon.ico"></link>
				</Head>
				<div className="hidden sm:block">
					<Image
						src="/no-results.png"
						alt="empty box"
						placeholder="blur"
						blurDataURL="/no-results.png"
						width="300px"
						height="300px"
						objectFit="contain"
					/>
				</div>
				<div className="flex-1 p-6 sm:p-0  bg-white-100 text-black-100 dark:bg-black-100 dark:text-white-100">
					<h1 className="font-bold text-2xl md:text-3xl tracking-tight mb-4">
						451 – Unavailable For Legal Reasons
					</h1>
					<p className="mb-8 text-justify">
						Why show a generic 404 when I can make it sound mysterious? It seems
						you&apos;ve found something that used to exist, or you spelled something
						wrong. I&apos;m guessing you spelled something wrong. Can you double check
						that URL?
					</p>
					<Link href="/">
						<a
							className="py-2 px-4 font-medium text-base tracking-tight mx-auto text-center rounded-md bg-cyan-100 text-white-200 dark:text-white-100"
							data-splitbee-event="Error Page"
							data-splitbee-event-type="Link event"
						>
							Return Home
						</a>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default NotFound
