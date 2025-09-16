import { useEffect, useState } from "react";
import Song from "../parts/song";
import { FaPlus } from "react-icons/fa";
import { updateUser } from "../middleware/addUser";

const Profile = function({addSongs, setMusicBase64, musicBase64, user}){
	const [current, setCurrent] = useState("0:00");
	const buttons = ["all", "songs", "lyrics", "phonk"];
	const [currentTab, setCurrentTab] = useState('all');
	const [color, setColor] = useState("zinc");
	const [data, setData] = useState(null);

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

	useEffect(() => {
		if(user?.color){
			setColor(user.color);
		}
	}, [user])

	const handleUpdate = async function(){
		try{
			const res = await updateUser({color});
			if(res.ok){
				setUser({...user, color});
			}
		} catch (err) {
			console.log(err.message);
		}
	}
	
	return(
		<div className={`relative h-55 w-full bg-gradient-to-b from-${color}-700/60 to to-${color}-800/5`}>

			<div className={`absolute w-full flex flex-row sm:gap-4 gap-2 p-2`}>
			
				{user.image ?
					<div className="shrink-0 overflow-hidden">
						<img src={user.image} alt="" className="sm:w-40 sm:h-40 w-30 h-30 object-cover rounded-md"/>
					</div>
					:
					<div className="bg-zinc-900/40 flex items-start rounded-md">
						<div className="sm:w-40 sm:h-40 w-30 h-30 rounded-md flex items-center justify-center text-sm font-thin">
							<FaPlus className="text-xl font-thin"/>
						</div>
					</div>
				}

				<div className="w-full flex flex-col md:flex-row gap-2">
					<div className="shrink-0 flex flex-col gap-2 md:items-center">
						<div className="h-full flex gap-2 items-center">
							<span className="p-3 bg-white/6 rounded-md">{user.username}</span>
							<div className="ml-auto flex flex-wrap gap-2 items-center">
								<span>color</span>
								<input type="text" value={color} className="sm:w-20 w-20 outline-none bg-white/10 rounded-md px-2 p-1 border border-white/30 focus:border-white/60"
									onChange={(e) => setColor(e.target.value)}
								/>
								{color !== user?.color &&
								<button className="text-sm p-1 px-2 bg-white/20 rounded-md"
									onClick={handleUpdate}
								>Add</button>
								}
							</div>
						</div>
						<div className="px-3">
							<span className="flex gap-1 items-end capitalize sm:text-sm text-sm">join<span className="font-bold">-</span>{new Date(user.createdAt).toLocaleString()}</span>
						</div>
					</div>
					<div className={`w-full flex flex-col md:flex-row gap-2 bg-white/6 rounded-md mt-auto p-2`}>
						<div className="flex flex-wrap sm:gap-2 gap-1">
							{buttons.map((i, index) => (
								<div key={index} className={`${currentTab == i ? `bg-${color}-400/50` : `bg-${color}-400/10`} p-2 py-1 rounded-lg sm:text-sm text-xs cursor-pointer hover:bg-${color}-400/30`}>
									<button className="cursor-pointer hover:underline"
										onClick={() => setCurrentTab(i)}
									>
										{i}
									</button>
								</div>
							))}
						</div>
						<div className="ml-auto flex flex-wrap gap-1 items-center sm:text-sm text-xs">
							<span className={`bg-${color}-300/10 px-2 py-1 rounded-md capitalize`}>{currentTab === "all" ? "Total Audio" : currentTab} - <span>120</span></span>
							<span className={`bg-${color}-300/10 px-2 py-1 rounded-md`}><span>{current.split(":")[0]} min {current.split(":")[1]} sec</span></span>
						</div>
					</div>
				</div>
			</div>

			
		</div>
	)
}

export default Profile;