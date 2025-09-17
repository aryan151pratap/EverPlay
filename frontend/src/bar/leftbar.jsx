import { useState } from "react";
import { FaHeart, FaMusic, FaUpload } from "react-icons/fa";
import TopBar from "./topbar";
import { useNavigate } from "react-router-dom";

const Leftbar = function({currentTab, setCurrentTab, setUser, user}){
	const navigate = useNavigate();
	const features = [
        ...(user?.artist ? [{ icon: <FaUpload />, name: "upload" }] : []),
        { icon: <FaMusic />, name: "music" },
        { icon: <FaHeart />, name: "like" }
    ];	

	return(
		<div className="shrink-0 sm:bg-zinc-900/80 md:bg-zinc-900/0 h-full md:p-1 flex flex-row md:py-2">
			<div className="p-1 md:bg-zinc-900/80 md:rounded-md h-full flex flex-row md:flex-col gap-2">
				{features.map((i, index) => (
					<div key={index} className={`rounded-md ${currentTab?.name === i?.name ? "text-green-300 bg-black" : "bg-zinc-800 hover:bg-zinc-800"} p-3 md:p-4 cursor-pointer`}
						onClick={() => {
							setCurrentTab(i);
							navigate("/");
						}}
					>
						{i.icon}
					</div>
				))}
			</div>
			<div className="md:hidden flex items-center ml-auto">
				<TopBar setUser={setUser} user={user}/>
			</div>
		</div>
	)
}

export default Leftbar;