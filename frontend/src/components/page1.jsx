import { use ,useEffect, useRef, useState } from "react";
import Profile from "../profileShowing/profile";
import Song from "../parts/song";

import { addSong, getSong } from "../middleware/addSong";

const Page1 = function({musicBase64, setMusicBase64, setSongs, user}){
	const [addSongs, setAddSongs] = useState([]);
	const audioRef = useRef(null);
	const [details, setDetails] = useState(null);
	const [message, setMessage] = useState(null);

	const format = function(size){
		return (size / 1024 / 1024).toFixed(2) + " MB"
	}

	const handleDuration = function(duration){
		if (!duration || isNaN(duration)) return "0:00";

		const minutes = Math.floor(duration / 60);
		const seconds = Math.floor(duration % 60);
		const result = `${minutes}:${seconds.toString().padStart(2, "0")}`;

		return result;
	}
	
	const handleAddMusic = function(e){
		const file  = e.target.files[0];
		if (file) {

			const fileInfo = {
				name: file.name.split('.')[0].replaceAll("_", " "),
				size: format(file.size),
				type: file.type,
				lastModified: new Date(file.lastModified).toLocaleString(),
			};

			const reader = new FileReader();
			reader.onload = () => {
				const base64Data = reader.result;
				const audio = new Audio(base64Data);
				audio.onloadedmetadata = () => {
					const music = {
						...fileInfo,
						duration: handleDuration(audio.duration),
						data: base64Data,
					}
					setDetails(music);
				};
			}
			reader.readAsDataURL(file);
		}
	}

	useEffect(() => {
		if (addSongs?.length) {
			setSongs(prev =>
				[
					...prev,
					...addSongs.filter(song =>
						!prev.some(existing => existing.name === song.name)
					)
				]
			);
		}
	}, [addSongs]);

	
	useEffect(() => {
		if(details){
			setMusicBase64({...details, play: true});
		}
	}, [details])

	const handleInput = function(e){
		let data = e.target.value;
		const name = e.target.name;
		if(name !== "image"){
			setDetails((prev) => ({...prev, [name]: data}));
		} else {
			const file = e.target.files[0];
			if(!file) return;
			console.log(file);
			
			const imageDetails = {
				name: file.name,
				size: format(file.size),
				type: file.type,
				lastModified: new Date(file.lastModified).toLocaleString()
			}
			const render = new FileReader();
			render.readAsDataURL(file);
			render.onloadend = () => {
				const image_data = {...imageDetails, base64: render.result}
				setDetails((prev) => ({...prev, [name]: image_data}));
			}
		}
	}

	const handleAdd = async function(){
		try{
			if(details){
				const res = await addSong(details);
				if(res.ok){
					setAddSongs([...addSongs, details]);
					setDetails(null);
				} else {
					console.log(res.ok, res.data);
				}
				setMessage(res.data);
			}

		} catch (err) {
			console.log(err.message);
		}
	}

	
	return(
		<div className="h-full w-full bg-black rounded-md overflow-auto scrollbar-hide flex flex-col">

			<div className="sticky inset-0 z-10">
				<Profile addSongs={addSongs} setMusicBase64={setMusicBase64} musicBase64={musicBase64} user={user}/>
			</div>

			<div className="h-full md:grid lg:grid-cols-2 bg-zinc-800/40 overflow-auto scrollbar-custom">

				<div className="flex flex-col gap-2 p-2 overflow-auto scrollbar-custom">
					{addSongs?.map((i, index) => (
						<div key={index}>
							<Song details={i} setMusicBase64={setMusicBase64} musicBase64={musicBase64}/>
						</div>
					))}
				</div>

				<div className="w-full overflow-auto scrollbar-custom">
					{message &&
					<div className="flex p-2 ml-auto">
						<span className={`${message.message ? "text-green-500" : "text-red-500"} text-sm px-2 p-1 bg-white/10 rounded-md ml`}>{message.message ? message.message : message.error}</span>
					</div>
					}
					<div className="flex flex-row gap-2 items-center justify-between p-4">
						<span className="flex gap-1 items-center">
							Add Audio on Cloud</span>
						<input type="file" accept="audio/*" placeholder="audio"
							className="rounded-md p-2 w-[50%] text-green-500 bg-white/10"
							onChange={handleAddMusic}
						/>
					</div>

					{details &&
					<div className="p-2 mt-4 grid grid-cols-1 gap-2 p-4">
						
						<div className="w-full flex mt-2 p-2">
							<span className="ml-auto bg-blue-600 p-2 rounded-sm border-r-2 border-b-4 border-blue-800">{details.lastModified}</span>
						</div>
						<div className="flex sm:flex-row flex-col gap-2 sm:items-center justify-between">
							<label htmlFor="">Audio File Name:</label>
							<input type="text" value={details.name} name="name"
							onChange={(e) => handleInput(e)}
							required
							placeholder="Audio Name" className="outline-none border border-blue-400 focus:border-blue-600 rounded-md p-2"/>
						</div>
						<div className="flex sm:flex-row flex-col gap-2 sm:items-center justify-between">
							<label htmlFor="">Audio size:</label>
							<input type="text" value={details.size} name="size"
							onChange={(e) => handleInput(e)}
							placeholder="Audio Name" className="bg-green-600 outline-none border border-blue-400 focus:border-blue-600 rounded-md p-2" disabled/>
						</div>
						<div className="flex sm:flex-row flex-col gap-2 sm:items-center justify-between">
							<label htmlFor="">Audio Duration:</label>
							<input type="text" value={details.duration} name="duration"
							onChange={(e) => handleInput(e)}
							placeholder="Audio Name" className="bg-green-600 outline-none border border-blue-400 focus:border-blue-600 rounded-md p-2" disabled/>
						</div>
						<div className="flex sm:flex-row flex-col gap-2 sm:items-start justify-between">
							<label htmlFor="">Audio Profile:</label>
							<div className="flex flex-col gap-2">
								<div className="flex flex-row items-center gap-2">
									<input type="file" accept="image/*" name="image"
										onChange={(e) => handleInput(e)}
										placeholder="Audio Name" className="outline-none border border-blue-400 focus:border-blue-600 rounded-md p-2"/>
									{details.image &&
									<div className="shrink-0 w-fit border rounded-md">
										<img src={details?.image.base64} alt="" className="h-10 w-10 object-cover"/>
									</div>
									}
								</div>
								{details.image &&
								<div className="w-full text-white">
									<div className="w-full">
										<div className="w-full flex flex-col gap-1 bg-white/10 rounded-md w-fit p-2">
											<span> <span>Name</span> {details.image.name}</span>
											<span> <span>size</span> {details.image.size}</span>
											<span> <span>type</span> {details.image.type}</span>
											<span> <span>upload data</span> {details.image.lastModified}</span>
										</div>
									</div>
								</div>
								}
							</div>
						</div>
						<div className="flex sm:flex-row flex-col gap-2 sm:items-center justify-between">
							<label htmlFor="">Audio type:</label>
							<input type="text" value={details.type} name="type"
							onChange={(e) => handleInput(e)}
							placeholder="Audio Name" className="bg-green-600 outline-none border border-blue-400 focus:border-blue-600 rounded-md p-2" disabled/>
						</div>

						<div className="flex ml-auto">
							<button className="p-1 px-2 bg-green-500 cursor-pointer hover:bg-green-600 focus:bg-green-700 rounded-md"
								onClick={handleAdd}
							>Add Audio</button>
						</div>
					</div>
					}
					
					{/* {musicBase64 &&
						<audio ref={audioRef} src={musicBase64}>
						</audio>
					} */}


					{details &&
					<div className="p-2">
						<Song details={details} 
						setMusicBase64={setMusicBase64} 
						musicBase64={musicBase64}/>
					</div>
					}
				</div>
			</div>
			
		</div>
	)
}

export default Page1;