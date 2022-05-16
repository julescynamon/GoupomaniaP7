// importation de la connexion mysql
const dbConnexion = require("../config/db");

// controller pour obtenir toutes les infos de tous nos utilisateurs
module.exports.getAllUsers = async (req, res) => {
	dbConnexion.query(
		"SELECT idUSER, username, bio, email, picture FROM user",
		(err, results) => {
			if (err) {
				res.status(404).json({ err });
				throw err;
			}
			delete results[0].password;
			res.status(200).json(results);
		},
	);
};

// controller pour obtenir toutes les infos d'un utilisateur
module.exports.getOneUser = async (req, res) => {
	dbConnexion.query(
		`SELECT * FROM user WHERE idUSER=${req.params.id}`,
		(err, results) => {
			if (err) {
				res.status(404).json({ err });
				throw err;
			} else {
				delete results[0].password;
				res.status(200).json(results[0]);
			}
		},
	);
};

// controller pour modifier la bio ou l'image de notre utilisateur
exports.updateOneUser = (req, res, next) => {
	const { bio } = req.body;
	console.log(bio);
	const { id: userId } = req.params;
	console.log(userId);
	dbConnexion.query(
		`UPDATE user SET bio = "${bio}" WHERE user.idUSER = ${userId};`,
		(err, result) => {
			if (err) {
				res.status(404).json({ err });
				throw err;
			}
			if (result) {
				res.status(200).json(result);
			}
		},
	);
};

// controller pour supprimer le compte d'un utilisateur
module.exports.deleteUser = async (req, res) => {
	dbConnexion.query(
		`DELETE FROM user WHERE idUSER=${req.params.id}`,
		req.params.id,
		(error, results) =>  {
			if (error) {
				return res.status(400).json(error);
			}
			res.clearCookie("jwt");
			res.status(200).json("Votre compte a bien ete supprimer");
		},
	);
};
