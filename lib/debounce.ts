export const debounce = (func: Function, time: number) => {
	// @ts-ignore
	let timer: NodeJS.Timeout

	return function (...args) {
		const context = this

		if (timer) clearTimeout(timer)

		timer = setTimeout(() => {
			timer = null
			func.apply(context, args)
		}, time)
	}
}
