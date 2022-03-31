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

module.exports.loginErrors = (err) => {
	let errors = { email: "", password: "" };

	if (err.message.includes("email")) errors.email = "Email inconnu";

	if (err.message.includes("password"))
		errors.password = "Le mot de passe ne correspond pas";

	return errors;
};
