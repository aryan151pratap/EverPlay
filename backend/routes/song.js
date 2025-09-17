const Song = require('../models/songs.js')
const express = require('express');
const router = express.Router();
const crypto = require("crypto");
const User = require('../models/user.js');

router.post('/add-songs', async(req, res) => {
	try{ 
		const {name, type, size, image, lastModified, data, duration, id} = req.body;
		if(!id) return res.status(404).json({ message: "user id not found" });
		const hash = crypto.createHash("md5").update(data).digest("hex");
		const song = await Song.findOne({hash});
		if(song) return res.status(200).json({message: "song already exists"});
		const new_song = await Song.create({name, type, size, image, lastModified, data, hash, duration, user: id});
		await User.findByIdAndUpdate(
			id,
			{ $push: { songs: new_song._id } },
			{ new: true }
		);
		res.status(201).json({message: "Song added sucessfully"});
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: err.message});
	}
})

router.get('/get-songs', async (req, res) => {
	try{
		const song = await Song.find().select("-data").populate("user", "username").sort({ createdAt: -1});
		res.status(200).json(song);
	} catch (err) {
		res.status(500).json({ error: err.message});
	}
})

router.get('/get-audio/:id', async (req, res) => {
	try{
		const { id } = req.params;
		console.log(id);
		const song = await Song.findOne({_id: id}).select("data");
		for(let i = 0; i<song.length; i++){
			console.log(`${i+1} -> `, song[i].name);
		}
		res.status(200).json(song);
	} catch (err) {
		res.status(500).json({ error: err.message});
	}
})


module.exports = router;