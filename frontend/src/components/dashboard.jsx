import { useEffect } from "react";
import Song from "../parts/song";
import { useState } from "react";

import { getSong } from "../middleware/addSong";
import Square from "../parts/squareSong";
import { FaArrowRight, FaPlay } from "react-icons/fa";

const Dashboard = function({musicBase64, setMusicBase64}){
	const [songs, setSongs] = useState(null);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		const song = async function(){
			try{
				setLoading(true);
				const res = await getSong();
				if(res.ok){
					setSongs(res.data);
				}
			} catch (err) {
				console.log(err);
			} finally {
				setLoading(false);
			}
		}
		song();
	}, [])
	return(
		<div className="w-full h-full overflow-auto scrollbar-custom">
			{loading &&
			<div className="w-full h-full flex items-center justify-center">
				<div className="p-4 border-2 border-t-transparent border-b-transparent rounded-full animate-spin"></div>
			</div>
			}
			<div className="flex flex-col gap-2 oveflow-auto">
				
				{songs?.length > 0 &&
				<div className="flex flex-col gap-2 p-2">
					<div className="flex flex-row gap-2 items-center">
						<span>New release Song</span>
						<div className="p-0.5 bg-orange-400 rounded-full">
							<FaPlay className="p-0.5 flex items-center"/>
						</div>
					</div>
					<div className="flex flex-row gap-4 overflow-auto scrollbar-custom">
						{songs.map((i, index) => 
							<div key={index}>
								<Square 
									details={i}
									musicBase64={musicBase64}
									setMusicBase64={setMusicBase64}
								/>
							</div>
						)}

						{songs.length > 6 &&
						<div className="sm:p-1">
							<div className="sm:w-40 sm:h-40 h-full w-30 flex items-center justify-center">
								<div className="p-4 rounded-full bg-white/10 hover:bg-white/20 cursor-pointer"><FaArrowRight/></div>
							</div>
						</div>
						}
					</div>
				</div>
				}

				{songs?.length > 0 &&
				<div className="flex flex-col gap-2 p-2">
					<div className="flex flex-row gap-2 items-center">
						<span>Recently played</span>
						<div className="p-0.5 bg-orange-400 rounded-full">
							<FaPlay className="p-0.5 flex items-center"/>
						</div>					</div>
					<div className="flex flex-col gap-2">
						{songs.map((i, index) => 
							<div key={index}>
								<Song
									details={i}
									musicBase64={musicBase64}
									setMusicBase64={setMusicBase64}
								/>
							</div>
						)}
					</div>
				</div>
				}
			</div>
		</div>
	)
}

export default Dashboard;