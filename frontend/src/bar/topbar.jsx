import { useState } from "react";
import { useEffect } from "react";
import { addUser, getUser } from "../middleware/addUser";
import { FaPlay, FaTimes } from "react-icons/fa";

const TopBar = function({ user, setUser }){
	const [loading, setLoading] = useState("no data");
	const [data, setData] = useState({username: "", email: ""});
	const [message, setMessage] = useState(null);
	const [login, setLogin] = useState(false);
	const [show, setShow] = useState(false);

	useEffect(() => {
		const UserDetails = async function(){
			try{
				setLoading("no data");
				const username = localStorage.getItem("username");
				const user_id = localStorage.getItem("id");
				if(username && user_id){
					const res = await getUser(user_id);
					console.log(res);
					if(res.ok){
						setUser(res.data);
					}
					console.log(username, " ", user_id);
					setLoading({username, user_id});
				}
			} catch (err){
				console.log(err);
				setLoading(null);
			} finally {
				setLoading(null);
			}
		}

		UserDetails();
	}, [])

	const handleLogin = async function(){
		try{
			const res = await addUser(data);
			if(res.ok){
				setLogin(false);
				localStorage.setItem("username", data.username);
				localStorage.setItem("id", res.data.data._id);
				setUser(res.data.data);
			}
			setMessage(res.data.message);
		} catch(err) {
			console.log(err.message);
		}
	}

	const handleLogout = async function(){
		try{
			setUser(null);
			localStorage.removeItem("username");
			localStorage.removeItem("id");
		} catch (err) {
			console.log(err.message);
		}
	}
	return(
		<div className="ml-auto md:mt-2 px-4 flex items-center">
			{loading === "no data" ?
				<div className="shrink-0 text-sm flex flex-row items-center gap-2">
					<div className="p-2.5 border-2 border-t-transparent border-b-transparent rounded-full animate-spin"></div>
					loading . . .
				</div>
				:
				user ?
				<div className="flex flex-col">
					<div className="ml-auto rounded-full p-1 cursor-pointer"
					 onClick={() => setShow(!show)}
					>
						<div className="p-2 h-8 w-8 flex items-center justify-center rounded-full bg-orange-500">{user.username?.split("")[0]}</div>
					</div>
					{show &&
					<div className="fixed inset-0 left-auto top-10 right-4 w-fit h-fit bg-white/20 hover:bg-white/30 p-2 rounded-md flex flex-col">
						<div className="flex flex-row text-sm justify-between">
							<span className="py-1">{user.username}</span>
							<span className="bg-red-500/40 p-1 rounded-md hover:underline cursor-pointer"
								onClick={handleLogout}
							>Logout</span>
						</div>
						<span className="text-sm">{user._id}</span>
					</div>
					}
				</div>
				:
				<div className="text-sm">
					<button className="px-2 p-1 rounded-md bg-white/90 text-black hover:underline hover:bg-white cursor-pointer"
						onClick={() => setLogin(true)}
					>Login</button>
				</div>
			}

			{login &&
			<div className="fixed inset-0 backdrop-blur-md flex items-center justify-center">
				<div className="bg-white/10 flex flex-col gap-2 p-6 rounded-md">
					<div className="flex flex-row gap-2 items-center">
						<div className="bg-white/20 p-1 rounded-sm">
							<FaPlay className=""/>
						</div>
						<span className="font-mono text-sm">EverPlay</span>
					</div>
					<div className="ml-auto p-1 bg-white/10 rounded-md cursor-pointer hover:bg-white/40"
						onClick={() => setLogin(false)}
					>
						<FaTimes/>
					</div>
					<div className="flex flex-col gap-1">
						<span>Username</span>
						<input type="text" value={data.username} className="text-center p-1 rounded-md bg-white/10 border border-white/20 outline-none focus:border-white/50" placeholder="Username"
							onChange={(e) => setData({...data, username: e.target.value})}
						/>
					</div>
					<div className="flex flex-col gap-1">
						<span>Email</span>
						<input type="text" value={data.email} className="text-center p-1 rounded-md bg-white/10 border border-white/20 outline-none focus:border-white/50" placeholder="Email"
						 	onChange={(e) => setData({...data, email: e.target.value})}
						/>
					</div>
					<div className="flex flex-row gap-4 items-center mr-auto gap-1">
						<span>Artist</span>
						<input type="checkbox" value="on" className="w-4 h-4 cursor-pointer" placeholder=""
						 	onChange={(e) => setData({...data, artist: e.target.checked})}
						/>
					</div>
					<div className="text-sm font-thin ml-auto p-2 bg-white/10 hover:bg-white/20 rounded-md mt-2 cursor-pointer"
						onClick={handleLogin}
						>
						<button className="cursor-pointer">Add</button>
					</div>
					{message?.message &&
					<div className="w-full">
						<p className={`${message?.message ? "text-green-500" : "text-red-500"} w-full text-sm px-2 p-1 bg-white/3 rounded-md`}>{message.message ? message.message : message.error }</p>
					</div>
					}
				</div>
			</div>
			}
		</div>
	)
}

export default TopBar;