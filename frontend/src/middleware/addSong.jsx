const api = import.meta.env.VITE_BACKEND_ADD;

const id = localStorage.getItem("id");

export const addSong = async function(data){
	try{
		console.log("middleware add songs ", data);
		const new_data = {
			...data, image: data.image?.base64,
			id
		}
		const res = await fetch(`${api}/song/add-songs`, {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify( new_data ),
		})
		const result = {
			ok: res.ok,
			data: await res.json(),
		}
		return result;
	} catch(err){
		console.log(err.message);
	}
}

export const getSong = async function(){
	try{
		console.log("middleware add songs ");
		const res = await fetch(`${api}/song/get-songs`, {
			method: 'GET',
			headers: { "Content-Type": "application/json" },
		})

		if(res.ok){
			const result = {
				ok: res.ok,
				data: await res.json(),
			}
			return result;
		}

		return {error: "error"};
	} catch(err){
		console.log(err.message);
	}
}


export const getAudio = async function(id){
	try{
		console.log("middleware get songs ");
		const res = await fetch(`${api}/song/get-audio/${id}`, {
			method: 'GET',
			headers: { "Content-Type": "application/json" },
		})
		if(res.ok){
			const result = {
				ok: res.ok,
				data: await res.json(),
			}
			return result;
		}

		return {error: "error"};
	} catch(err){
		console.log(err.message);
	}
}


