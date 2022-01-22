import { FC, useState, useRef } from 'react'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import Container from '@components/Common/Container'
import TimeDurationInput from '@components/Common/TimeDuration'
import { debounce } from '@lib/debounce'
import { fileTypes } from '@lib/filetypes'

const Home: FC = () => {
	const videoRef = useRef<HTMLVideoElement>(null)
	const durationRef = useRef<HTMLInputElement>(null)
	const startTimeRef = useRef<HTMLInputElement>(null)

	const [ready, setReady] = useState<boolean>(false)
	const [converted, setConverted] = useState<boolean>(false)
	const [video, setVideo] = useState<File>()
	const [file, setFile] = useState<Blob>()
	const [duration, setDuartion] = useState<number>(0)
	const [startTime, setStartTime] = useState<number>(0)
	const [name, setName] = useState<string>()
	const [fileType, setFileType] = useState<string>('gif')

	const ffmpeg = createFFmpeg({
		corePath: 'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js',
	})

	const convertFileType = async () => {
		await ffmpeg.load()
		setReady(true)

		// write the file to memory
		ffmpeg.FS('writeFile', video.name, await fetchFile(video))

		// run the FFMpeg command
		await ffmpeg.run(
			'-i',
			video.name,
			'-t',
			`${duration}`,
			'-ss',
			`${startTime}`,
			'-f',
			fileType,
			`${name}.${fileType}`
		)

		// read the result
		const result = ffmpeg.FS('readFile', `${name}.${fileType}`)
		const convertedfile = new Blob([result.buffer])
		setFile(convertedfile)
		setConverted(true)
	}

	const debouncedName = debounce((event) => setName(event.target.value), 250)

	return (
		<Container title="Home">
			<div className="w-full flex items-center justify-center mx-auto bg-white-100 text-black-100 dark:bg-black-100 dark:text-white-100">
				<div className="max-w-2xl my-2 container flex flex-col align-middle items-center justify-center bg-white-100 text-black-100 dark:bg-black-100 dark:text-white-100">
					{!video && (
						<div className="mx-auto w-full sm:w-3/4">
							<img
								src="/tools.webp"
								alt="tools"
								width="100%"
								className="mb-2 rounded-md"
							/>
							<span className="my-2 font-sans text-center justify-center">
								A web app to convert video media files without an external server.
								Upload your video and adjust the start time and duration alongwith
								the media type and hit convert. The preview of the converted video
								is provided alongwith the download facility.
							</span>
							<input
								type="file"
								name="video"
								id="video"
								accept="video/*"
								onChange={(event) => setVideo(event.target.files.item(0))}
								className="block mx-auto w-full sm:w-3/4 border-2 p-0.5 border-black-100 dark:border-white-100 rounded-md text-slate-500  file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-cyan-100 dark:file:bg-cyan-900 file:text-white-200 my-8 dark:file:text-white-100 cursor-pointer"
							/>
						</div>
					)}
					{video && (
						<>
							<div className="mx-auto w-full sm:w-3/4">
								<video
									ref={videoRef}
									width="100%"
									className="aspect-video rounded-md"
									autoPlay
									loop
									controls
									controlsList="nodownload nofullscreen noremoteplayback"
									disablePictureInPicture
									src={URL.createObjectURL(video)}
									onLoadedData={(event) =>
										(durationRef.current.max = startTimeRef.current.max =
											`${Math.floor(event.currentTarget.duration)}`)
									}
								/>
							</div>
							<span className="my-2 font-sans font-medium text-center">
								{video.name.split('.').at(0)}
							</span>
							<div className="w-full flex flex-wrap flex-col sm:flex-row justify-center align-middle mt-4 p-4 gap-4">
								<div className="flex-1 w-full min-w-[250px]">
									<div className="w-full flex align-middle gap-2">
										<label className="my-auto" htmlFor="duration">
											Duration ―
										</label>
										<TimeDurationInput
											value={duration}
											max={durationRef.current ? +durationRef.current.max : 0}
											onChange={setDuartion}
											className="w-[100px] bg-white-200 text-black-100 dark:bg-black-200 dark:text-white-100 border border-black-100 dark:border-white-100 rounded-md p-2 shadow-sm focus:outline-none focus:border-cyan-100 focus:ring-1 sm:text-sm"
										/>
									</div>
									<input
										ref={durationRef}
										type="range"
										name="duration"
										id="duration"
										step={1}
										min={0}
										value={duration}
										onChange={(event) => setDuartion(+event.target.value)}
									/>
								</div>
								<div className="flex-1 w-full min-w-[250px]">
									<div className="w-full flex align-middle gap-2">
										<label className="my-auto" htmlFor="starttime">
											Start Time ―
										</label>
										<TimeDurationInput
											value={startTime}
											max={
												startTimeRef.current ? +startTimeRef.current.max : 0
											}
											onChange={setStartTime}
											className="w-[100px] bg-white-200 text-black-100 dark:bg-black-200 dark:text-white-100 border border-black-100 dark:border-white-100 rounded-md p-2 shadow-sm focus:outline-none focus:border-cyan-100 focus:ring-1 sm:text-sm"
										/>
									</div>
									<input
										ref={startTimeRef}
										type="range"
										name="starttime"
										id="starttime"
										step={1}
										min={0}
										value={startTime}
										onChange={(event) => setStartTime(+event.target.value)}
									/>
								</div>
							</div>
							<div className="w-full flex justify-center align-middle py-2 px-4 gap-4">
								<input
									className="flex-1 placeholder:italic placeholder:text-slate-400 block w-full bg-white-200 text-black-100 dark:bg-black-200 dark:text-white-100 border border-black-100 dark:border-white-100 rounded-md p-2 pl-4 shadow-sm focus:outline-none focus:border-cyan-100 focus:ring-1 sm:text-sm"
									placeholder={`Output Filename: ${video.name.split('.').at(0)}`}
									type="text"
									name="output-name"
									onChange={debouncedName}
								/>
								<select
									id="fileType"
									name="fileType"
									className="block p-2 bg-white-200 text-black-100 dark:bg-black-200 dark:text-white-100 border border-black-100 dark:border-white-100 focus:border-cyan-100 focus:ring-1 h-full bg-transparent sm:text-sm rounded-md"
									onChange={(event) => setFileType(event.target.value)}
									value={fileType}
								>
									{fileTypes.map((format, index) => (
										<option key={index} value={format} className="p-2">
											.{format}
										</option>
									))}
								</select>
							</div>
							<button
								disabled={ready && !converted && !file}
								className="bg-cyan-100 text-white-200 dark:text-white-100 disabled:cursor-not-allowed disabled:bg-white-600 disabled:text-white-100 font-medium font-sans px-4 rounded-md py-2 my-4"
								onClick={convertFileType}
							>
								Convert
							</button>
						</>
					)}
					{ready && !converted && !file && (
						<span className="my-2 font-sans text-center">
							Converting &#8226; &#8226; &#8226;
						</span>
					)}
					{ready && converted && file && (
						<>
							<div className="mx-auto my-4 mb-0 w-full sm:w-3/4">
								<video
									width="100%"
									className="aspect-video rounded-md"
									autoPlay
									loop
									controls
									controlsList="nodownload nofullscreen noremoteplayback"
									disablePictureInPicture
									src={URL.createObjectURL(file)}
								/>
							</div>
							<span className="my-2 font-sans font-medium text-center">
								{name ? name : video.name.split('.').at(0)}
							</span>
							<a
								download={`${
									name ? name : video.name.split('.').at(0)
								}.${fileType}`}
								href={URL.createObjectURL(file)}
								className="bg-cyan-100 text-white-200 dark:text-white-100 flex gap-1 justify-center align-middle items-center font-medium font-sans px-4 rounded-md py-2 my-4"
							>
								<span>Download</span>
								<span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
										<polyline points="7 10 12 15 17 10"></polyline>
										<line x1="12" y1="15" x2="12" y2="3"></line>
									</svg>
								</span>
							</a>
						</>
					)}
				</div>
			</div>
		</Container>
	)
}

export default Home
