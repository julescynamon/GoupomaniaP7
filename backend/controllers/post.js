// importation de la connexion mysql
const dbConnexion = require("../config/db");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/errors");

// controllers pour recuperer tous les posts de l'app
module.exports.readPost = (req, res) => {
	dbConnexion.query(
		"SELECT DISTINCT p.*, COUNT(c.idCOM) as totalComments FROM post as p LEFT JOIN comment as c ON c.idPublication = p.idPOST GROUP BY p.idPOST ORDER BY p.timestamp DESC;",
		(err, result) => {
			if (err) {
				res.status(404).json({
					message: "erreur pour accéder au data",
				});
				throw err;
			}
			res.status(200).json(result);
			console.log(result);
		},
	);
};

//controller pour afficher le post séléctionner
exports.readOnePost = (req, res) => {
	dbConnexion.query(
		"SELECT * FROM post WHERE idPOST= ?",
		req.params.id,
		(error, result) => {
			if (error) {
				return res.status(400).json({ error });
			}

			return res.status(200).json(result);
		},
	);
};

// controllers pour creer un post
module.exports.createPost = async (req, res) => {
	if (req.file === null) {
		let { body, file } = req;

		body = {
			userId: req.body.userId,
			message: req.body.message,
		};
		console.log(body);

		if (!file) delete req.body.picture;

		try {
			dbConnexion.query(
				"INSERT INTO post SET ?",
				body,
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
			return res.status(400).send(err);
		}
	} else {
		let fileName;
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

		fileName = req.body.userId + Date.now() + ".jpg";

		await pipeline(
			req.file.stream,
			fs.createWriteStream(
				`/Users/julescynamon/Desktop/GoupomaniaP7/frontend/public/uploads/posts/${fileName}`,
			),
		);

		let { body, file } = req;

		body = {
			userId: req.body.userId,
			message: req.body.message,
			picture: req.file !== null ? "./uploads/posts/" + fileName : "",
		};
		console.log(body);

		try {
			dbConnexion.query(
				"INSERT INTO post SET ?",
				body,
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
			return res.status(400).send(err);
		}
	}
};

// controllers pour supprimer un post
exports.deletePost = (req, res, next) => {
	dbConnexion.query(
		`DELETE FROM post WHERE idPOST=${req.params.id}`,
		req.params.id,
		function (error) {
			if (error) {
				return res.status(400).json(error);
			}
			return res
				.status(200)
				.json({ message: "Votre poste a bien été supprimé !" });
		},
	);
};

// ---------------------- COMMENTS ----------------------

// controllers pour commenter un post
module.exports.commentPost = (req, res) => {
	const body = {
		idCreateur: req.body.idCreateur,
		idPublication: req.body.idPublication,
		commentPseudo: req.body.commentPseudo,
		message: req.body.message,
	};
	console.log(body);
	dbConnexion.query("INSERT INTO comment SET ?", body, (err, result) => {
		if (err) {
			res.status(404).json({ err });
			console.log(err);
			throw err;
		}
		res.status(200).json(result);
	});
};

// controller pour voir tous les commentaires
exports.getAllComment = (req, res, next) => {
	dbConnexion.query(
		`SELECT * FROM comment WHERE idPublication = ${req.params.id}`,
		(error, result) => {
			if (error) {
				return res.status(400).json(error);
			}

			return res.status(200).json(result);
		},
	);
};

// // controller pour voir un commentaire
// exports.getOneComment = (req, res, next) => {
// 	dbConnexion.query(
// 		"SELECT * FROM comment WHERE idCOM= ?",
// 		req.params.id,
// 		(error, result) => {
// 			if (error) {
// 				return res.status(400).json({ error });
// 			}

// 			return res.status(200).json(result);
// 		},
// 	);
// };

// controllers pour supprimer un commentaire
module.exports.deleteOneComment = (req, res) => {
	console.log(req.params.id);
	dbConnexion.query(
		"DELETE FROM comment WHERE idCOM= ?",
		req.params.id,
		(error, results) => {
			if (error) {
				return res.status(400).json(error);
			}
			return res
				.status(200)
				.json({ message: "Votre message a bien été supprimé !" });
		},
	);
};
