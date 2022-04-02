// importation de la connexion mysql
const dbConnexion = require("../config/db");
const UserModel = require("../models/user");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/errors");

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
			`${__dirname}/../client/public/uploads/profil/${fileName}`,
		),
	);

	try {
		dbConnexion.query(
			`UPDATE user SET picture = ${fileName} WHERE 6`,
			(err, results) => {
				if (err) {
					res.status(404).json({ err });
					throw err;
				} else {
					res.status(200).json(results);
				}
			},
		);
	} catch (err) {
		return res.status(500).send({ message: err });
	}
};