const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();
let cors = require("cors");
const { default: Moment } = require("react-moment");

const app = express();
app.use(express.json()); // parses incoming requests with JSON payloads
app.use(function(req, res, next) {
    if (req.headers.origin) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization')
        res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE')
        // if (req.method === 'OPTIONS') return res.send(200)
    }
    next()
  })
//create connection to database
const db = mysql.createPool({
	host: process.env.DB_HOST, //localhost
	user: process.env.DB_USER, //root
	password: process.env.DB_PASSWORD, //password
	database: process.env.DB, //ravenbooks
});

const listener = app.listen(process.env.PORT || 4000, () => {
	console.log("App is listening on port " + listener.address().port);
});

const allowedOrigins = ['http://localhost:3000'];
const options = {
  origin: allowedOrigins
};

app.use(cors(options));

app.get("/notes", (req, res) => {
	db.query("SELECT * FROM notes", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.get("/notes/category/:id", (req, res) => {
	db.query("SELECT * FROM notes where category_id = ?", req.params.id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.get("/notes/:id", (req, res) => {
	db.query("SELECT * FROM notes where id = ?", req.params.id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.put("/notes/update/:id", (req, res) => {
	console.log(req.body);
	db.query("UPDATE notes set title = ?, text = ? where id = ?", [req.body.title, req.body.text, req.params.id], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});




app.get("/categories", (req, res) => {
	db.query("SELECT * FROM categories", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.post("/categories/create", (req, res) => {
	console.log(req.body);
	db.query("INSERT into categories (title) VALUES (?)", [req.body.name ], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});