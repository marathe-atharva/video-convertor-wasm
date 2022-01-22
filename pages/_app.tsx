import { FC } from 'react'
import 'tailwindcss/tailwind.css'
import '@lib/global.css'
import { AppProps } from 'next/app'
import Loader from '@components/Common/Loader'
import { ThemeProvider } from '@store/Theme'

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
	return (
		<ThemeProvider>
			<Loader color="#32A8B3" startPosition={0.3} stopDelayMs={200} height={2} />
			<Component {...pageProps} />
		</ThemeProvider>
	)
}

export default MyApp
