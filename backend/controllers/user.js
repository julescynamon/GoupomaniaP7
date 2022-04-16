// importation de la connexion mysql
const dbConnexion = require("../config/db");

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

exports.updateOneUser = (req, res, next) => {
	const { username, bio } = req.body;
	console.log(username);
	console.log(bio);
	const { id: userId } = req.params;
	console.log(userId);
	dbConnexion.query(
		`UPDATE user SET username = "${username}", bio = "${bio}" WHERE user.idUSER = ${userId};`,
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

module.exports.deleteUser = async (req, res) => {
	dbConnexion.query(
		`DELETE FROM user WHERE idUSER=${req.params.id}`,
		req.params.id,
		function (error) {
			if (error) {
				return res.status(400).json(error);
			}
			return res
				.status(200)
				.json({ message: "Votre compte a bien été supprimé !" });
		},
	);
};
