module.exports.signUpErrors = (err) => {
	let errors = { username: "", email: "", password: "" };

	if (err.message.includes("pseudo"))
		errors.username = "username incorrect ou déjà pris";

	if (err.message.includes("email")) errors.email = "Email incorrect";

	if (err.message.includes("password"))
		errors.password =
			"Le mot de passe doit contenir entre 8 et 15 caractères, avec au moins une majuscule et un chiffre !";

	if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
		errors.pseudo = "Ce pseudo est déjà pris";

	if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
		errors.email = "Cet email est déjà enregistré";

	return errors;
};

module.exports.uploadErrors = (err) => {
	let errors = { format: "", maxSize: "" };

	if (err.message.includes("invalid file"))
		errors.format = "Format incompatabile";

	if (err.message.includes("max size"))
		errors.maxSize = "Le fichier dépasse 500ko";

	return errors;
};
