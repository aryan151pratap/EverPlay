import { useState } from "react";
import { FaPlay, FaPause, FaMusic, FaRegHeart, FaHeart } from "react-icons/fa";

export default function Song({ details, setMusicBase64, musicBase64 }) {
	const isCurrentSong = musicBase64.name === details.name;
	const isPlaying = musicBase64.play && isCurrentSong;
	const [like, setLike] = useState(false);

	const togglePlay = () => {
		setMusicBase64({ ...details, play: !musicBase64.play });
	};

	

	return (
		<div className="flex items-center gap-3 bg-zinc-800 text-white rounded-lg p-2 shadow-md hover:bg-zinc-700 transition">
		
		<div className="relative w-14 h-14 rounded-md overflow-hidden flex items-center justify-center bg-zinc-700">
			{details?.image ? (
			<img
				src={details.image.base64 || details.image}
				alt="cover"
				className="w-full h-full object-cover"
			/>
			) : (
			<FaMusic className="text-zinc-400 text-2xl" />
			)}

			<button
			onClick={togglePlay}
			className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50"
			>
			{isPlaying ? (
				<FaPause className="text-white text-sm" />
			) : (
				<FaPlay className="text-white text-sm ml-0.5" />
			)}
			</button>
		</div>

		<div className="flex-1 min-w-0">
			<p className="font-semibold text-sm truncate sm:line-clamp-2 sm:text-wrap">
			{details?.name}
			</p>
			<p className="text-xs text-gray-400 truncate">
			{details?.type} • {details?.size}
			</p>
		</div>

		<div className="flex flex-row items-center gap-2 sm:gap-4">
			<div className=""
				onClick={() => setLike(!like)}
			>
				{like ?
				<FaHeart/>
				: 
				<FaRegHeart/>
				}
			</div>
			<p className="text-sm truncate text-wrap bg-zinc-400/20 p-2 rounded-md">
			{details?.duration} min
			</p>
		</div>

		</div>
	);
}
