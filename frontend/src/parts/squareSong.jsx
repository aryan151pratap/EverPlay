import { FaMusic, FaPause, FaPlay } from "react-icons/fa";

const Square = function({details, musicBase64, setMusicBase64}){
	const handlePlay = function(){
		setMusicBase64({ ...details, play: !musicBase64.play });
	}
	return(
		<div className="h-full w-30 sm:w-40 p-1 hover:bg-white/10 bg-white/10 sm:bg-white/0">
			<div className="group relative w-full flex items-center justify-center h-30 sm:h-40 p-1 bg-white/10">
				{details.image ?
					<img src={details.image} alt="" className="w-full h-full object-cover"/>
					:
					<FaMusic className="text-zinc-400 text-2xl" />
				}
				<div className="absolute sm:opacity-0 opacity-100 group-hover:opacity-100 transition-opacity duration-300 ml-auto flex items-center p-2 rounded-full bg-green-600/80 cursor-pointer">
					<div className="w-5 h-5 flex items-center justify-center"
						onClick={handlePlay}
					>
						{musicBase64?.play && (details.name == musicBase64.name) ?
						<FaPause/>
						:
						<FaPlay/>
						}
					</div>
				</div>
			</div>
			<div className="w-full flex flex-row items-center gap-2 overflow-hidden">
				<div className="p-2 bg-white/4 w-full sm:text-sm text-xs flex flex-col">
					<span className="line-clamp-1 hover:underline cursor-pointer">{details.name}</span>
					<div className="flex flex-row justify-between">
						<span className="hover:underline cursor-pointer">{details.user.username}</span>
						<span>{details.duration} min</span>
					</div>
				</div>
				
			</div>
		</div>
	)
}

export default Square;