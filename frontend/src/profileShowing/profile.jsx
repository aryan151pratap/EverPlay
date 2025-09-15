import { useEffect, useState } from "react";
import Song from "../parts/song";
import user from "../user.js";

const Profile = function({addSongs, setMusicBase64, musicBase64}){
	const [current, setCurrent] = useState("0:00");
	const buttons = ["all", "songs", "lyrics", "phonk", "+"];
	const [currentTab, setCurrentTab] = useState('all');

	const handleDuration = function(duration){
		if (!duration || isNaN(duration)) return "0:00";

		const minutes = Math.floor(duration / 60);
		const seconds = Math.floor(duration % 60);
		const result = `${minutes}:${seconds.toString().padStart(2, "0")}`;

		return result;
	}

	useEffect(() => {
		console.log(addSongs);
	}, [addSongs])

	useEffect(() => {
		if(addSongs){
			const total = addSongs.reduce((acc, song) => {
				if (!song.duration) return acc;
				const [m, s] = song.duration.split(":").map(Number);
				return acc + (m*60 + s);
			}, 0);
			setCurrent(handleDuration(total));
		}
	}, [currentTab, addSongs])
	
	return(
		<div className={`relative h-55 w-full bg-gradient-to-b from-${user.color}-700/60 to to-${user.color}-800/5`}>

			<div className={`absolute w-full flex flex-row gap-4 p-2`}>
			
				{user.image ?
					<div className="shrink-0 overflow-hidden">
						<img src={user.image} alt="" className="w-40 h-40 object-cover rounded-md"/>
					</div>
					:
					<div className="bg-zinc-900 flex items-start rounded-t-md">
						<div className="w-40 h-40 rounded-md flex items-center justify-center text-sm font-thin">No profile image</div>
					</div>
				}

				<div className="w-full flex flex-col md:flex-row">
					<div className="shrink-0 flex flex-col gap-2 md:items-center">
						<div className="h-full flex items-center">
							<span className="p-3 bg-white/6 rounded-md">{user.name}</span>
						</div>
						<div className="px-3">
							<span className="flex gap-1 items-end capitalize">join<span className="text-xl font-bold">-</span>{user.join}</span>
						</div>
					</div>
					<div className={`w-full flex flex-col md:flex-row gap-2 bg-white/6 rounded-md mt-auto p-2`}>
						<div className="flex flex-row gap-2">
							{buttons.map((i, index) => (
								<div key={index} className={`${currentTab == i ? `bg-${user.color}-400/50` : `bg-${user.color}-400/10`} p-2 py-1 rounded-lg text-sm cursor-pointer hover:bg-${user.color}-400/30`}>
									<button className="cursor-pointer hover:underline"
										onClick={() => setCurrentTab(i)}
									>
										{i}
									</button>
								</div>
							))}
						</div>
						<div className="ml-auto flex flex-row gap-1 items-center text-sm">
							<span  className={`bg-${user.color}-300/10 px-2 py-1 rounded-md capitalize`}>{currentTab === "all" ? "Total Audio" : currentTab} - <span>120</span></span>
							<span  className={`bg-${user.color}-300/10 px-2 py-1 rounded-md`}><span>{current.split(":")[0]} min {current.split(":")[1]} sec</span></span>
						</div>
					</div>
				</div>
			</div>

			
		</div>
	)
}

export default Profile;