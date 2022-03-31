const objectId = require("mongoose").Types.ObjectId;
// Mise en place du package fs pour interagir avec le système de fichiers du serveur.
const fs = require("fs");

// je charge promisify natif sur node pour utiliser une promesse dans une fonction callback
const { promisify } = require("util");
// grace a pipeline je vais rechercher par une source externe une donnee ici la photo et j'utilise promisify pour pouvoir renvoyer cette donnee;
const pipeline = promisify(require("stream").pipeline);

// controllers pour recuperer tous les posts de l'app
module.exports.readPost = (req, res) => {
	postModel
		.find((err, docs) => {
			if (!err) {
				res.send(docs);
			} else {
				console.log("erreur pour avoir les datas: " + err);
			}
		})
		.sort({ created: -1 });
};

// controllers pour creer un post
module.exports.createPost = async (req, res) => {
	let fileName;

	if (req.file !== null) {
		try {
			if (
				req.file.detectedMimeType != "image/jpg" &&
				req.file.detectedMimeType != "image/png" &&
				req.file.detectedMimeType != "image/jpeg"
			)
				throw Error("invalid file");

			if (req.file.size > 500000) throw Error("max size");
		} catch (err) {
			return res.status(201).json({ err });
		}
		fileName = req.body.posterId + Date.now() + ".jpg";

		await pipeline(
			req.file.stream,
			fs.createWriteStream(
				`${__dirname}/../client/public/uploads/posts/${fileName}`,
			),
		);
	}

	const newPost = new postModel({
		posterId: req.body.posterId,
		message: req.body.message,
		picture: req.file !== null ? "./uploads/posts/" + fileName : "",
		video: req.body.video,
		likers: [],
		comments: [],
	});

	try {
		const post = await newPost.save();
		return res.status(201).json(post);
	} catch (err) {
		return res.status(400).send(err);
	}
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
