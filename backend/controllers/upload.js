const userModel = require("../models/user");
// Mise en place du package fs pour interagir avec le système de fichiers du serveur.
const fs = require("fs");
// je charge promisify natif sur node pour utiliser une promesse dans une fonction callback
const { promisify } = require("util");
// grace a pipeline je vais rechercher par une source externe une donnee ici la photo et j'utilise promisify pour pouvoir renvoyer cette donnee;
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/errors");

// controller pour controller une photo qu'un utilisateur voudrait charger sur le site, on y controlle la taille du fichier si il a bien un format autorisé et ensuite si tout vas bien on lui dit ou charger l'image ici en static sur notre serveur local
module.exports.uploadProfil = async (req, res) => {
	try {
		if (
			req.file.detectedMimeType != "image/jpg" &&
			req.file.detectedMimeType != "image/png" &&
			req.file.detectedMimeType != "image/jpeg"
		)
			throw Error("invalid file");

		if (req.file.size > 500000) throw Error("max size");
	} catch (err) {
		const errors = uploadErrors(err);
		return res.status(201).json({ errors });
	}
	const fileName = req.body.name + ".jpg";

	await pipeline(
		req.file.stream,
		fs.createWriteStream(
			`${__dirname}/../frontend/public/uploads/profil/${fileName}`,
		),
	);

	try {
		await userModel
			.findByIdAndUpdate(
				req.body.userId,
				{ $set: { picture: "./uploads/profil/" + fileName } },
				{ new: true, upsert: true, setDefaultsOnInsert: true },
			)
			.then((data) => res.send(data))
			.catch((err) => res.status(500).send({ message: err }));
	} catch (err) {
		return res.status(500).send({ message: err });
	}
};
