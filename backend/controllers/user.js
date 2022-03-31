// importation de la connexion mysql
const dbConnexion = require("../config/db");

module.exports.getAllUsers = async (req, res) => {
	dbConnexion.query(
		"SELECT idUSER, username, isAdmin, bio, email, picture FROM user",
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
			}
			delete results[0].password;
			res.status(200).json(results);
		},
	);
};

exports.updateOneUser = (req, res, next) => {
	if (req.file) {
		const userId = req.params.id;
		let { destination, filename } = req.file;
		destination = destination + filename;

		const sqlInsertImage = `INSERT INTO images (post_id, user_id, image_url) VALUES (NULL, ${userId}, "${destination}");`;
		db.query(sqlInsertImage, (err, result) => {
			if (err) {
				res.status(404).json({ err });
				throw err;
			}
		});
	}

	const { user_firstname, user_lastname } = req.body;
	const { id: userId } = req.params;
	const sqlUpdateUser = `UPDATE users SET user_firstname = "${user_firstname}", user_lastname = "${user_lastname}" WHERE users.user_id = ${userId};`;
	db.query(sqlUpdateUser, (err, result) => {
		if (err) {
			res.status(404).json({ err });
			throw err;
		}
		if (result) {
			res.status(200).json(result);
		}
	});
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
