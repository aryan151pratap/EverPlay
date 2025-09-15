import Song from "../parts/song";
import Profile from "../profileShowing/profile";

const Music = function({songs, musicBase64, setMusicBase64}){

	return(
		<div className="h-full">

			<div className="h-full flex flex-col rounded-md overflow-hidden">
				<div className="">
					<Profile addSongs={songs}/>
				</div>

				<div className="h-full flex flex-col gap-2 p-2 overflow-auto scrollbar-custom">
					{songs.map((i, index) => (
						<div>
							<Song 
								details={i}
								musicBase64={musicBase64}
								setMusicBase64={setMusicBase64}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Music;