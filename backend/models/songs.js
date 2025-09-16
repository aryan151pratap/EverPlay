const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    name: { type: String, required: true },
    size: { type: String, required: true },
    type: { type: String, required: true },
    lastModified: { type: String, required: true },
    image: { type: String },
	data: {type: String, required: true},
	hash: { type: String, unique: true },
	duration: { type: String, required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

module.exports = mongoose.model("Song", songSchema);
