import { useState } from "react";
import { FaHeart, FaMusic, FaUpload } from "react-icons/fa";

const Leftbar = function({currentTab, setCurrentTab}){
	
	const features = [{icon : <FaUpload/>, name: "upload"}, {icon: <FaMusic/>, name:"music"}, {icon: <FaHeart/>, name:"like"}];
	return(
		<div className="h-full md:p-1 md:py-2">
			<div className="p-1 bg-zinc-900/80 rounded-md border border-black h-full flex flex-row md:flex-col gap-2">
				{features.map((i, index) => (
					<div key={index} className={`rounded-md ${currentTab?.name === i?.name ? "text-green-300 bg-black" : "bg-zinc-800 hover:bg-zinc-800"} p-3 md:p-4 cursor-pointer`}
						onClick={() => setCurrentTab(i)}
					>
						{i.icon}
					</div>
				))}
			</div>
		</div>
	)
}

export default Leftbar;