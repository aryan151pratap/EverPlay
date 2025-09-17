import { useEffect, useRef, useState } from "react";
import { FaVolumeMute, FaVolumeDown, FaVolumeUp, FaPlay, FaRandom, FaRedo, FaDownload, FaPause } from "react-icons/fa";
import { getAudio } from "../middleware/addSong";

const formatTime = (time) => {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const Playing = function({musicBase64, setMusicBase64}){
	const audioRef = useRef(null);
	const [range, setRange] = useState(0);
	const [duration, setDuration] = useState(0);
	const [volume, setVolume] = useState(0.5);
	const [mute, setMute] = useState(false);
	const [isLooping, setIsLooping] = useState(false);
	const [currentAudio, setCurrentAudio] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {

		const get_song = async function(){
			try{
				setLoading(true);
				const res = await getAudio(musicBase64._id);
				if(res.ok){
					setCurrentAudio(res.data.data);
				}
			} catch (err) {
				console.log(err.message);
			} finally {
				setLoading(false);
			}
		}

		const audio = audioRef.current;
		if(!audio) return;

		if(musicBase64._id){
			if(!musicBase64.data){
				get_song();
			}
		} else if(musicBase64?.data){
			setCurrentAudio(musicBase64.data);
		}

		const updateTime = () => {
			const time = audio.currentTime;
			setRange(time);
			if(time >= audio.duration){
				setRange(0);
				setMusicBase64((e) => ({...e, play: false}));
			}
		};

		const setMetaData = () => {
			setDuration(audio.duration);
		};

		audio.addEventListener("timeupdate", updateTime);
		audio.addEventListener("loadedmetadata", setMetaData);
	}, [musicBase64.name])

	useEffect(() => {
		const audio = audioRef.current;
		if(!audio) return;
		if(currentAudio){
			setMusicBase64((e) => ({...e, play: true}));
		}
		
	}, [currentAudio])


	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		if (musicBase64.play) {
			audio.play().catch(err => {
				if (err.name !== "AbortError") console.error(err);
			});
		} else {
			audio.pause();
		}
	}, [musicBase64.play]);


	const handleSeek = (e) => {
		const time = Number(e.target.value);
		setRange(time);
		audioRef.current.currentTime = time;
	};

	const handleVolume = (e) => {
		const vol = Number(e.target.value);
		setVolume(vol);
		audioRef.current.volume = vol;
	};

	const handlePlay = function(){
		setMusicBase64((prev) => ({ ...prev, play: !prev.play }));
	}

	const handleMute = function(){
		const audio = audioRef.current;
		if(audio){
			if(!mute){
				audio.volume = 0;
			} else {
				audio.volume = volume;
			}
			setMute(!mute);
		}
	}

	const handleLoop = function(){
		const audio = audioRef.current;
		if(audio){
			audio.loop = !audio.loop;
		}
		setIsLooping(audio.loop);
	}

	return(
		<div className="w-full bg-black text-white flex flex-row sm:justify-center p-1 sm:px-4 overflow-auto">

			<audio ref={audioRef} src={currentAudio}>
			</audio>

			{musicBase64 &&
			<div className="shrink-0 flex flex-col text-sm justify-center w-20 sm:w-30 md:w-40">
				<span className="font-semibold truncate">{musicBase64.name}</span>
				<span className="font-semibold text-xs">{musicBase64.size}</span>
			</div>
			}

			<div className="w-full flex flex-col items-center gap-1">

				<div className="w-full flex flex-row items-center justify-center gap-5">
					<div onClick={handleLoop} className={`${isLooping ? "text-white" : "text-slate-400"} h-8 w-8 p-2 rounded-full hover:bg-slate-700 cursor-pointer`}>
						<FaRedo/>
					</div>
					{loading ?
					<div className="p-3.5 border-2 border-t-transparent rounded-full animate-spin"></div>
					:
					<div className="h-8 w-8 p-2 text-black bg-white rounded-full cursor-pointer"
						onClick={handlePlay}
					>
						{musicBase64?.play ?
						<FaPause className=""/>
						:
						<FaPlay className=""/>
						}
					</div>
					}
					
					<div className={`h-8 w-8 p-2 rounded-full hover:bg-slate-700 cursor-pointer`}>
						<FaRandom/>
					</div>
				</div>
				
			
				<div className="flex flex-row gap-1 sm:gap-2 items-center text-sm">
					<span className="shrink-0 text-sm">{range ? formatTime(range) : "-:--"}</span>
					<input type="range" min="0" 
						className="h-[2px] bg-white sm:w-[300px] lg:w-[600px] h-1.5"
						max={duration} 
						value={range}
						onChange={handleSeek}
					/>
					<span className="shrink-0">{duration ? formatTime(duration) : "-:--"}</span>
				</div>
			</div>
			<div className="flex items-center">
				<div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
					<div className="flex flex-row sm:gap-4 gap-2">
						<a href={musicBase64.details?.data} download="music.mp3">
							<FaDownload className="p-1 text-xl cursor-pointer hover:bg-slate-700 rounded-md" />
						</a>

						<span className="p-1 hover:bg-zinc-700 rounded-full"
							onClick={handleMute}
						>
							{mute ?
							<FaVolumeMute/>
							:
							<FaVolumeUp/>
							}
						</span>
					</div>

					<input type="range" min="0" 
						className="bg-white h-1.5 w-20 sm:w-full"
						max="1.0" 
						step="0.01"
						value={audioRef.current?.volume}
						onChange={handleVolume}
					/>
				</div>
			</div>
		</div>
	)
}

export default Playing;