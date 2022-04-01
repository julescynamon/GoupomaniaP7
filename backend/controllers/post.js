// importation de la connexion mysql
const dbConnexion = require("../config/db");
// importation du models des posts
const postModel = require("../models/post");

// controllers pour recuperer tous les posts de l'app
module.exports.readPost = (req, res) => {
	dbConnexion.query(
		"SELECT * FROM post ORDER BY timestamp DESC;",
		(err, result) => {
			if (err) {
				res.status(404).json({
					message: "erreur pour accéder au data",
				});
				throw err;
			}
			res.status(200).json(result);
		},
	);
};

// controllers pour creer un post
module.exports.createPost = async (req, res) => {
	console.log(req.body);
	console.log(req.body.post);
	// récupérer les champs dans le corps de la requête
	const postBody = JSON.parse(req.body.post);
	// nouvelle Sauce
	const post = new postModel({
		...postBody,
		// résolution de l'URL de l'image
		picture: `${req.protocol}://${req.get(
			"host",
		)}/../../frontend/public/uploads/${req.file.filename}`,
	});
	console.log(req.file);
};

// controllers pour modifier un post
module.exports.updatePost = (req, res) => {
	if (!objectId.isValid(req.params.id))
		return res.status(400).send("ID unknown : " + req.params.id);

	const updatedRecord = {
		message: req.body.message,
	};

	postModel.findByIdAndUpdate(
		req.params.id,
		{ $set: updatedRecord },
		{ new: true },
		(err, docs) => {
			if (!err) res.send(docs);
			else console.log("Update error : " + err);
		},
	);
};

// controllers pour supprimer un post
module.exports.deletePost = (req, res) => {
	if (!objectId.isValid(req.params.id))
		return res.status(400).send("ID unknown : " + req.params.id);

	postModel.findByIdAndRemove(req.params.id, (err, docs) => {
		if (!err) res.send(docs);
		else console.log("Delete error : " + err);
	});
};

// controllers pour liker un post
module.exports.likePost = async (req, res) => {
	if (!objectId.isValid(req.params.id))
		return res.status(400).send("ID unknown : " + req.params.id);

	try {
		await postModel
			.findByIdAndUpdate(
				req.params.id,
				{
					$addToSet: { likers: req.body.id },
				},
				{ new: true },
			)
			.then((docs) => res.send(docs))
			.catch((err) => res.status(500).send({ message: err }));

		await userModel
			.findByIdAndUpdate(
				req.body.id,
				{
					$addToSet: { likes: req.params.id },
				},
				{ new: true },
			)
			.then((docs) => res.send(docs))
			.catch((err) => res.status(500).send({ message: err }));
	} catch (err) {
		return res.status(400).send(err);
	}
};

// controllers pour enlever le like au meme post
module.exports.unLikePost = async (req, res) => {
	if (!objectId.isValid(req.params.id))
		return res.status(400).send("ID unknown : " + req.params.id);

	try {
		await postModel
			.findByIdAndUpdate(
				req.params.id,
				{
					$pull: { likers: req.body.id },
				},
				{ new: true },
			)
			.then((docs) => res.send(docs))
			.catch((err) => res.status(500).send({ message: err }));

		await userModel
			.findByIdAndUpdate(
				req.body.id,
				{
					$pull: { likes: req.params.id },
				},
				{ new: true },
			)
			.then((docs) => res.send(docs))
			.catch((err) => res.status(500).send({ message: err }));
	} catch (err) {
		return res.status(400).send(err);
	}
};

// controllers pour commenter un post
module.exports.commentPost = (req, res) => {
	if (!objectId.isValid(req.params.id))
		return res.status(400).send("ID unknown : " + req.params.id);

	try {
		return postModel
			.findByIdAndUpdate(
				req.params.id,
				{
					$push: {
						comments: {
							commenterId: req.body.commenterId,
							commenterPseudo: req.body.commenterPseudo,
							text: req.body.text,
							timestamp: new Date().getTime(),
						},
					},
				},
				{ new: true },
			)
			.then((docs) => res.send(docs))
			.catch((err) => res.status(500).send({ message: err }));
	} catch (err) {
		return res.status(400).send(err);
	}
};

// controllers pour modier un commentaire
module.exports.editCommentPost = (req, res) => {
	if (!objectId.isValid(req.params.id))
		return res.status(400).send("ID unknown : " + req.params.id);

	try {
		return postModel.findById(req.params.id, (err, docs) => {
			const theComment = docs.comments.find((comment) => {
				comment._id.equals(req.body.commentId);
			});
			if (!theComment) {
				res.status(404).send("commentaire non trouvé !");
			} else {
				theComment.text = req.body.text;
			}
			return docs.save((err) => {
				if (!err) {
					return res.status(200).send(docs);
				} else {
					return res.status(500).send(err);
				}
			});
		});
	} catch (err) {
		return res.status(400).send(err);
	}
};

// controllers pour supprimer un commentaire
module.exports.deleteCommentPost = (req, res) => {
	if (!objectId.isValid(req.params.id))
		return res.status(400).send("ID unknown : " + req.params.id);

	try {
		return postModel
			.findByIdAndUpdate(
				req.params.id,
				{
					$pull: {
						comments: {
							_id: req.body.commentId,
						},
					},
				},
				{ new: true },
			)
			.then((docs) => res.send(docs))
			.catch((err) => res.status(500).send({ message: err }));
	} catch (err) {
		return res.status(400).send(err);
	}
};
