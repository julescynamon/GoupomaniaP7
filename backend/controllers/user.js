const userModel = require("../models/user");
const objectId = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
	// on va chercher la table userModel et on prends tout
	const users = await userModel.find().select("-password");
	res.status(200).json(users);
};

module.exports.getOneUser = async (req, res) => {
	console.log(req.params);
	// on verifie si l'id passer dans la requete est contenue dans la db
	if (!objectId.isValid(req.params.id))
		return res.status(400).send("ID non reconnue : " + req.params.id);

	// Si oui on continue la requete
	userModel
		.findById(req.params.id, (err, docs) => {
			if (!err) {
				res.send(docs);
			} else {
				console.log("ID non reconnue : " + req.params.id);
			}
		})
		.select("-password");
	// -password signifie que l'on ne veut pas voir le password dans la reponse json question de securite
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
	// on verifie si l'id passer dans la requete est contenue dans la db
	if (!objectId.isValid(req.params.id))
		return res.status(400).send("ID non reconnue : " + req.params.id);

	try {
		await userModel.remove({ _id: req.params.id }).exec();
		res.status(200).json({ message: "utilisateur supprimer !" });
	} catch (err) {
		return res.status(500).json({ message: err });
	}
};
