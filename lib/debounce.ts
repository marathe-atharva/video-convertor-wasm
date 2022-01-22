export const debounce = (func: Function, time: number) => {
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
