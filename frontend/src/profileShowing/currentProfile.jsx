import { useState } from "react";
import { FaArrowDown, FaArrowUp, FaHeart, FaPause, FaPlay, FaRegHeart } from "react-icons/fa";
import music_line from "./MusicLines.gif";
import user from '../user.js';

const CurrentProfile = function({addSongs, setMusicBase64, musicBase64, close, setClose}){

	return(
		<div className={`shrink-0 h-full w-full p-1 flex flex-col gap-1 bg-gradient-to-b from-${user.color}-400/40 via-${user.color}-400/20 to-${user.color}-800/0 rounded-md overflow-auto scrollbar-custom`}>
			
			<div className="">
				{musicBase64.name &&
				<div className="shrink-0 rounded-md bg-black overflow-hidden cursor-pointer flex flex-row p-1 gap-2 md:gap-4">
					<div className="relative shrink-0 w-15 h-15 rounded-md overflow-hidden">
						{musicBase64.image ?
						<img src={musicBase64.image?.base64 || musicBase64.image} alt="" className="w-full h-full object-cover"/>
						:
						<div className="w-full h-full bg-black ">
						</div>
						}
						<div className="absolute inset-0 w-full h-full bg-zinc-800/40 hover:bg-zinc-700/50 flex items-center justify-center"
							onClick={() => setMusicBase64((e) => ({...e, play: !musicBase64.play}))}
						>
							{!musicBase64.play ?
							<FaPlay/>
							:
							<FaPause/>
							}
						</div>
						
					</div>

					<div className="flex flex-col text-xs justify-center">
						<span className="sm:p-1 p-0.5 bg-zinc-400/30 rounded-sm line-clamp-2">{musicBase64.name.replaceAll("_", " ")}</span>
						<span className="">{musicBase64.size}</span>
					</div>
					<div className="shrink-0 w-15 h-15 relative ml-auto">
						{musicBase64.play &&
						<div className="w-full h-full rounded-md overflow-hidden auto flex items-center">
							<img src={music_line} alt="w-15 h-15 object-cover" />
						</div>
						}
						<div className="flex sm:hidden absolute inset-0 left-auto top-auto">
							<div className="w-8 h-8 p-2 bg-zinc-300/20 rounded-md hover:bg-white/30"
								onClick={() => setClose(!close)}
							>
								{close ?
								<FaArrowUp/>
								:
								<FaArrowDown/>
								}
							</div>
						</div>
					</div>
				</div>
				}
			</div>
			
			<div className={`${close ? "hidden sm:flex h-fit" : "flex"} flex-col gap-1`}>
				<div className="">
					{user.image ?
						<div className="bg-white/10 rounded-md overflow-hidden">
							<img src={user.image} alt="" className="object-cover"/>
						</div>
						:
						<div className="bg-white/10 w-full flex items-start rounded-t-md">
							<div className="w-40 h-40 rounded-md flex items-center justify-center text-sm font-thin">No profile image</div>
						</div>
					}
				</div>

				<div className="bg-white/7 p-2 py-4 rounded-md mt-5">
					<span className="p-3 bg-white/10 text-sm rounded-md hover:underline cursor-pointer">{user.name}</span>
				</div>
				{addSongs?.length > 0 &&
				<div className="p-1 bg-white/10 rounded-md">
					<div className="text-sm px-3 p-1 rounded-md bg-white/10">Related Songs</div>
					<div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 gap-2 py-2">
						{addSongs?.slice(0,4).map((i, index) => (
							<div key={index} className="w-full h-40 sm:h-full flex flex-col sm:flex-row gap-2 items-center justify-center bg-white/10 rounded-md p-1">
								<div className="xl:shrink-0 md:shrink-1 shrink-0 w-full sm:w-20 h-20 rounded-md overflow-hidden">
									{i.image?.base64 ?
										<img src={i?.image?.base64} alt="" className="w-full h-20 object-cover rounded-md bg-black/20"/>
										:
										<div className="w-full h-20 bg-black object-cover rounded-md text-xs font-thin flex items-center justify-center">No profile</div>
									}
								</div>

								<div className="md:shrink-2 w-full h-16 sm:h-20 flex flex-col">
									<span className="text-xs text-wrap truncate overflow-hidden hover:underline cursor-pointer">{i.name}</span>
									<div className="flex flex-row items-center gap-2 ml-auto mt-auto">
										<FaRegHeart/>
										<span className="text-xs mt-auto px-2 p-1.5 w-fit ml-auto bg-white/10 rounded-md">{i.duration} min</span>
									</div>
								</div>
							</div>
						))}
					</div>
					
					{addSongs?.length > 4 && (
					<div className="w-full flex bg-gradient-to-t from-white/10 to-white/0 rounded-b-md p-1">
						<button className="text-white ml-auto text-xs sm:text-sm px-1 p-1 rounded-md hover:underline cursor-pointer">Show More</button>
					</div>
					)}
				</div>
				}
			</div>
			
		</div>
	)
}

export default CurrentProfile;