const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
	email: { type: String, required: true },
	artist: { type: Boolean, default: false },
    image: { type: String },
    color: { type: String },
    followers: { type: String },
    like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
		default: []
    }],
    saved: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
		default: []
    }],
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
		default: []
    }]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
