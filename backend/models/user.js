// import mongoose
const mongoose = require("mongoose");
const { isEmail } = require("validator");
// import du validateur unique
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

// Models du schema d'un user qu'on doit retrouver dans la base de donnees
const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 55,
		unique: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		validate: [isEmail],
		lowercase: true,
		unique: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		max: 100,
		minlength: 6,
	},
	picture: {
		type: String,
		default: "./uploads/profil/random-user.png",
	},
	bio: {
		type: String,
		max: 1024,
	},
	likes: {
		type: [String],
	},
});

// Mise en place du pluggin unique validator pour empecher plusieurs users d'avoir la meme adresse mail
userSchema.plugin(uniqueValidator);

// fonction qui va dire a ma db avant de sauvegarder le profil on crypte le mot de passe
userSchema.pre("save", async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// on va controller avec bcrypt lors du login si le mot de passe est correcte
userSchema.statics.login = async function (email, password) {
	const user = await this.findOne({ email });
	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) {
			return user;
		}
		throw Error("mot de passe incorrecte");
	}
	throw Error("email incorrecte");
};

// export de ce schéma sous forme de modèle
module.exports = mongoose.model("User", userSchema);
