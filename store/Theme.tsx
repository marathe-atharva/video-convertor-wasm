import React, { createContext, useState, useEffect, Dispatch, SetStateAction } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextProps {
	theme: Theme
	setTheme: Dispatch<SetStateAction<Theme>>
}

const getInitialTheme = (): Theme => {
	if (typeof window !== 'undefined' && window.localStorage) {
		const storedPrefs = window.localStorage.getItem('color-theme')
		if (storedPrefs) {
			// @ts-ignore
			return storedPrefs
		}

		const userMedia = window.matchMedia('(prefers-color-scheme: dark)')
		if (userMedia.matches) {
			return 'dark'
		}
	}

	return 'light'
}

export const ThemeContext = createContext<ThemeContextProps>({
	theme: 'light',
	setTheme: () => {},
})

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState<Theme>(getInitialTheme)

	const rawSetTheme = (rawTheme) => {
		const root = window.document.documentElement
		const isDark = rawTheme === 'dark'

		root.classList.remove(isDark ? 'light' : 'dark')
		root.classList.add(rawTheme)

		localStorage.setItem('color-theme', rawTheme)
	}

	useEffect(() => {
		rawSetTheme(theme)
	}, [theme])

	return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}
