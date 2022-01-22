import { FC, ReactNode } from 'react'
import Head from 'next/head'
import Footer from '@components/Common/Footer'
import Header from '@components/Common/Header'

interface IContainer {
	children: ReactNode
	title: string
}

const Container: FC<IContainer> = ({ children, title }) => {
	return (
		<div className="min-h-screen flex flex-col bg-white-100 text-black-100 dark:bg-black-100 dark:text-white-100">
			<Head>
				<title>Video Convertor | {title}</title>
				<link rel="icon" href="/favicon.ico"></link>
			</Head>
			<Header />
			<main className="flex flex-col justify-center px-8">{children}</main>
			<Footer />
		</div>
	)
}

export default Container
