const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
	{
		idPoster: {
			type: String,
			required: true,
		},
		titre: {
			type: String,
			trim: true,
			maxlength: 50,
		},
		message: {
			type: String,
			trim: true,
			maxlength: 500,
		},
		picture: {
			type: String,
		},
		likers: {
			type: [String],
			required: true,
		},
		comments: {
			type: [
				{
					commenterId: String,
					commenterPseudo: String,
					text: String,
					timestamp: Number,
				},
			],
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model("post", PostSchema);
