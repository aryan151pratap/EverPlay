const api = import.meta.env.VITE_BACKEND_ADD;

export const addUser = async function(data){
	try{
		const res = await fetch(`${api}/user/add-user`, {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify( data ),
		})
		const result = {
			ok: res.ok,
			data: await res.json(),
		}
		return result;
	} catch (err) {
		console.log(err.message);
	}
} 

export const getUser = async function(id){
	try{
		const res = await fetch(`${api}/user/get-user/${id}`, {
			method: 'GET',
			headers: { "Content-Type": "application/json" },
		})
		const result = {
			ok: res.ok,
			data: await res.json(),
		}
		return result;
	} catch (err) {
		console.log(err.message);
	}
} 

export const getUserAllDetails = async function(id){
	try{
		const res = await fetch(`${api}/user/get-user-details/${id}`, {
			method: 'GET',
			headers: { "Content-Type": "application/json" },
		})
		const result = {
			ok: res.ok,
			data: await res.json(),
		}
		return result;
	} catch (err) {
		console.log(err.message);
	}
} 

export const updateUser = async function(data){
	try{
		const res = await fetch(`${api}/user/update-user`, {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify( data ),
		})
		const result = {
			ok: res.ok,
			data: await res.json(),
		}
		return result;
	} catch (err) {
		console.log(err.message);
	}
} 

export const deleteAccount = async function(id){
	try{
		const res = await fetch(`${api}/user/logout/${id}`, {
			method: 'GET',
			headers: { "Content-Type": "application/json" },
		})
		const result = {
			ok: res.ok,
			data: await res.json(),
		}
		return result;
	} catch (err) {
		console.log(err.message);
	}
} 