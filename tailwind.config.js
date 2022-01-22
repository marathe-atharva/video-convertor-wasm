module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {},
		fontFamily: {
			sans: [
				'Almarena',
				'-apple-system',
				'BlinkMacSystemFont',
				'Segoe UI',
				' Roboto',
				'Helvetica',
				'sans-serif',
			],
		},
		colors: {
			red: {
				100: '#FF3B30',
				900: '#FF453A',
			},
			orange: {
				100: '#FF9500',
				900: '#FF950A',
			},
			yellow: {
				100: '#FFCC00',
				900: '#FFD60A',
			},
			green: {
				100: '#34C759',
				900: '#30D158',
			},
			mint: {
				100: '#00C7BE',
				900: '#66D4CF',
			},
			teal: {
				100: '#30B0C7',
				900: '#40C8E0',
			},
			cyan: {
				100: '#32ADE6',
				900: '#64D2FF',
			},
			blue: {
				100: '#007AFF',
				900: '#0A84FF',
			},
			indigo: {
				100: '#5856D6',
				900: '#5E5CE6',
			},
			purple: {
				100: '#AF52DE',
				900: '#BF5AF2',
			},
			pink: {
				100: '#FF2D55',
				900: '#FF375F',
			},
			brown: {
				100: '#A2845E',
				900: '#AC8E68',
			},
			white: {
				100: '#F2F2F7',
				200: '#E5E5EA',
				300: '#D1D1D6',
				400: '#C7C7CC',
				500: '#AEAEB2',
				600: '#8E8E93',
			},
			black: {
				100: '#1C1C1E',
				200: '#2C2C2E',
				300: '#3A3A3C',
				400: '#48484A',
				500: '#636366',
				600: '#8E8E93',
			},
		},
	},
	plugins: [],
}
