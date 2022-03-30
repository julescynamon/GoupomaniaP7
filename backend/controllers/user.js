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
			delete results[0].user_password;
			res.status(200).json(results);
		},
	);
};

module.exports.updtateUser = async (req, res) => {
	// on verifie si l'id passer dans la requete est contenue dans la db
	if (!objectId.isValid(req.params.id))
		return res.status(400).send("ID non reconnue : " + req.params.id);

	try {
		// si l'id est valide on attend le userModel et on lui modifie la bio
		await userModel.findOneAndUpdate(
			{ _id: req.params.id },
			{
				$set: {
					bio: req.body.bio,
				},
			},
			{ new: true, upsert: true, setDefaultsOnInsert: true },
			(err, docs) => {
				if (!err) return res.send(docs);
				if (err) return res.status(500).json({ message: err });
			},
		);
	} catch (err) {
		return res.status(500).json({ message: err });
	}
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
