import React, { useState, useCallback, useEffect, FC, SetStateAction, Dispatch } from 'react'

type Scale = 'd' | 'h' | 'm' | 's'

interface TimeDurationInputProps {
	value: number
	max: number
	scale?: Scale
	onChange: Dispatch<SetStateAction<number>>
	className?: string
}

export const TimeDurationInput: FC<TimeDurationInputProps> = ({
	value,
	max,
	scale = 's',
	onChange = () => {},
	className,
}) => {
	const [duration, setDuration] = useState(convertFromValue(value > max ? max : value, scale))

	useEffect(() => {
		const newDuration = convertFromValue(value > max ? max : value, scale)
		if (newDuration !== duration) setDuration(newDuration)
	}, [value, scale, max, duration])

	const onInputChange = useCallback(
		(event) => {
			let inputDuration = event.target.value > max ? max : event.target.value
			setDuration(inputDuration)
			const newValue = convertToValue(inputDuration, scale)
			if (!isNaN(newValue)) onChange(newValue)
		},
		[onChange, scale, max]
	)

	return (
		<input
			type="text"
			className={className}
			value={duration}
			onChange={onInputChange}
			data-testid="duration-input"
		/>
	)
}

export const SCALE_CONVERSIONS = {
	s: 1,
	m: 60,
	h: 3600,
	d: 86400,
}

export function convertValueFromScale(value: number, scale: Scale) {
	return value * (SCALE_CONVERSIONS[scale] || 1)
}

export function convertValueToScale(value: number, scale: Scale) {
	return value / (SCALE_CONVERSIONS[scale] || 1)
}

export function convertValueToDuration(value: number) {
	const seconds = Math.floor(value % 60)
	const minutes = Math.floor((value / 60) % 60)
	const hours = Math.floor((value / 3600) % 24)
	const days = Math.floor(value / 86400)

	return [days && `${days}d`, hours && `${hours}h`, minutes && `${minutes}m`, `${seconds}s`]
		.filter((x) => !!x)
		.join(' ')
}

export function convertDurationToValue(duration: string) {
	const matches = duration.trim().match(/^(\d+d)?\s*(\d+h)?\s*(\d+m)?\s*(\d+s)?\s*(\d+ms)?$/i)
	if (!matches) return parseFloat(duration)
	const [days, hours, minutes, seconds] = matches.slice(1).map((x) => parseInt(x) || 0)
	return ((days * 24 + hours) * 60 + minutes) * 60 + seconds
}

export const convertFromValue = (value: number, scale: Scale) =>
	convertValueToDuration(convertValueFromScale(value, scale))

export const convertToValue = (duration: string, scale: Scale) =>
	convertValueToScale(convertDurationToValue(duration), scale)

export default TimeDurationInput
