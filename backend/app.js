const express = require("express");
const cors = require('cors');
const app = express();

const connectDB = require('./db');
const song = require('./routes/song');
const user = require('./routes/userData');
const port = process.env.PORT;

connectDB();

app.use(cors());

app.use(express.json({ limit: "50mb" }));  
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use('/song', song);
app.use('/user', user);


app.listen(port, () => {
	console.log("Server is Running on 3000 😏");
})