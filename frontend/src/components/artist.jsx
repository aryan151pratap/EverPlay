import { useEffect, useState } from "react";
import { getUserAllDetails } from "../middleware/addUser";
import Profile from "../profileShowing/profile";
import { useParams } from "react-router-dom";
import Song from "../parts/song";

const Artist = function({user, musicBase64, setMusicBase64, setCurrentTab}){
	const { id } = useParams();
	const [songs, setSongs] = useState(null);
	const [artist, setArtist] = useState(null);
	const [edit, setEdit] = useState(false);

	useEffect(() => {
		setCurrentTab(null);
		const get_artist = async function(){
			try{
				const res = await getUserAllDetails(id);
				if(res.ok){
					const result = res.data;
					setSongs(result.songs);
					setArtist({
						username: result.username,
						image: result.image,
						_id: result._id,
						color: result.color,
						createdAt: result.createdAt,
					})
				}
			} catch (err) {
				console.log(err.message);
			}
		}

		if(id){
			get_artist();
		}

		setEdit(() => {
			id === user._id ? true : false
		})

	}, [id])



	return(
		<div className="h-full w-full bg-black rounded-md overflow-auto scrollbar-hide flex flex-col">

			<div>
				<Profile addSongs={songs} user={artist} edit={edit}/>
			</div>


			<div className="h-full flex flex-col gap-2 p-2 overflow-auto scrollbar-custom">
				{songs?.map((i, index) => (
					<div key={index}>
						<Song
							details={i}
							musicBase64={musicBase64}
							setMusicBase64={setMusicBase64}
						/>
					</div>
				))}
			</div>

		</div>
	)
}

export default Artist;