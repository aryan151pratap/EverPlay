const User = require('../models/user');
const express = require('express');
const router = express.Router();
const crypto = require("crypto");

router.get('/get-user/:id', async (req, res) => {
	try{
		const {id} = req.params;
		console.log(id);
		if(!id) return res.status(400).json({message: "Please login"});
		const user = await User.findOne({_id: id});
		console.log(user);
		if(!user) return res.status(401).json({ message: "user Not exists"});
		res.status(200).json(user);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: err.message});
	}
});

router.get('/logout/:id', async (req, res) => {
	try{
		const {id} = req.params;
		console.log(id);
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
		console.log(username, artist);
		if(!username && !email) return res.status(400).json({message: "fill the login form"});
		const user = await User.findOne({email});
		console.log(user);
		if(user) return res.status(401).json({ message: "user already exists"});
		const new_user = await User.create({email, username, artist});
		console.log(new_user);
		res.status(200).json(new_user);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: err.message});
	}
});

router.post('/update-user', async (req, res) => {
	try{
		const {username, image, color, _id} = req.body;
		console.log(username, artist);
		const user = await User.findOne({_id});
		console.log(user);
		if(user) return res.status(401).json({ message: "user already exists"});
		const new_user = await User.create({});
		console.log(new_user);
		res.status(200).json(new_user);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: err.message});
	}
});

module.exports = router;1