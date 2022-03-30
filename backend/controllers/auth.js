// importation de la connexion mysql
const dbConnexion = require("../config/db");
// import de bcrypt pour le hash du mot de passe
const bcrypt = require("bcrypt");
// import du package de token
const jwt = require("jsonwebtoken");
// import de la fonction error pour avoir une lecture propre des erreurs
const { signUpErrors, loginErrors } = require("../utils/errors");

module.exports.signUp = async (req, res) => {
	try {
		const { password: password } = req.body;
		// on hash ert on sale le password
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);
		const user = {
			...req.body,
			password: hashPassword,
		};
		dbConnexion.query("INSERT INTO user SET ?", user, (err, results) => {
			if (err) {
				res.status(400).json({ err });
			} else {
				res.status(200).json({ message: "Utilisateurs enregistré !" });
			}
		});
	} catch (err) {
		const errors = signUpErrors(err);
		res.status(401).send({ errors });
	}
};

module.exports.login = async (req, res) => {
	const { email, password } = req.body;

	if ((email, password)) {
		dbConnexion.query(
			"SELECT * FROM user WHERE email = ?",
			email,
			(err, results) => {
				if (err) {
					res.status(400).json({ err });
				} else {
					console.log(results);

					if (results == 0) {
						return res.status(404).json({
							error: "utilisateur inexistant dans la base de donnée",
						});
					}

					bcrypt
						.compare(req.body.password, results[0].password)
						.then((controlPassword) => {
							if (!controlPassword) {
								return res.status(401).json({
									error: "le mot de passe est incorrecte",
								});
							}

							// on genere le token si tout est valide
							const token = jwt.sign(
								{ userId: results[0].id },
								`${process.env.JWT_TOKEN}`,
								{ expiresIn: "24h" },
							);

							// on enleve le password de la reponse pour plus de sécurité
							delete results[0].password;

							res.cookie("jwt", token);
							res.status(200).json({
								user: results[0],
								token,
							});
						})
						.catch((err) => {
							const errors = loginErrors(err);
							res.status(401).send({ errors });
						});
				}
			},
		);
	}
};

module.exports.logout = async (req, res) => {
	res.clearCookie("jwt");
	res.redirect("/");
};
