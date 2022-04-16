const db = require("mysql");
require("dotenv").config({ path: "./.env" });

// parametre de connexion a la base de donnees
const dbConnect = db.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "reseau_social",
});

dbConnect.connect((err) => {
	if (err) {
		console.log("erreur de connection: " + err);
	} else {
		console.log("connection a la base de donnée réussit !");
		console.log(`connected as id: ${dbConnect.threadId} `);
	}
});

module.exports = dbConnect;
