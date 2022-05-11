const db = require("mysql");

// parametre de connexion a la base de donnees
const dbConnect = db.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: "",
	database: process.env.DB_NAME,
});
// parametre de reponse de ma base de donnee
dbConnect.connect((err) => {
	if (err) {
		console.log("erreur de connection: " + err);
	} else {
		console.log("connection a la base de donnée réussit !");
		console.log(`connected as id: ${dbConnect.threadId} `);
	}
});

module.exports = dbConnect;
