const User = require('../models/user');
const express = require('express');
const router = express.Router();
const crypto = require("crypto");

router.get('/get-user/:id', async (req, res) => {
	try{
		const {id} = req.params;
		if(!id) return res.status(400).json({message: "Please login"});
		const user = await User.findOne({_id: id});
		if(!user) return res.status(401).json({ message: "user Not exists"});
		res.status(200).json(user);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: err.message});
	}
});

router.get('/get-user-details/:id/:limit', async (req, res) => {
	try{
		const {id, limit} = req.params;
		if(!id) return res.status(400).json({message: "Please login"});
		const user = await User.findOne({_id: id})
		.populate({
			path: "songs",
			select: "-data",     
			options: { limit: limit, sort: { createdAt: -1 } }
  		});
		const mappedSongs = user.songs.map(song => ({
			...song.toObject(),
			user: {
				_id: user._id,
				username: user.username,
				color: user.color
			}
		}));
		if(!user) return res.status(401).json({ message: "user Not exists"});
		res.status(200).json({
			username: user.username,
			image: user.image,
			_id: user._id,
			color: user.color,
			createdAt: user.createdAt,
			songs: mappedSongs
		});

	} catch (err) {
		console.log(err);
		res.status(500).json({ error: err.message});
	}
});

router.get('/logout/:id', async (req, res) => {
	try{
		const {id} = req.params;
		if(!id) return res.status(400).json({message: "Please login"});
		const user = await User.findOneAndDelete({_id: id});
		if(!user) return res.status(401).json({ message: "user Not exists"});
		res.status(200).json(user);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: err.message});
	}
});

router.post('/add-user', async (req, res) => {
	try{
		const {username, email, artist} = req.body;
		if(!username && !email) return res.status(400).json({message: "fill the login form"});
		const user = await User.findOne({email});
		if(user) return res.status(200).json({ data: user, message: "user already exists"});
		const new_user = await User.create({email, username, artist});
		console.log(new_user);
		res.status(201).json(new_user);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: err.message});
	}
});

router.post('/update-user', async (req, res) => {
	try{
		const { image, color, _id} = req.body;
		let user = {message: "no data saved"};
		if(image == null){
			user = await User.findOneAndUpdate(
				_id,
				{ color },
				{ new: true }
			);
		} else {
			user = await User.findOneAndUpdate(
				_id,
				{ image },
				{ new: true }
			);
		}
		res.status(200).json(user);
	} catch (err) {	
		console.log(err);
		res.status(500).json({ error: err.message});
	}
});

module.exports = router;