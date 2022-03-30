const jwt = require("jsonwebtoken");
// importation de la connexion mysql
const dbConnexion = require("../config/db");
require("dotenv").config({ path: "./config/.env" });

module.exports.requireAuth = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, process.env.JWT_TOKEN, async (err, decodedToken) => {
			if (err) {
				console.log(err);
			} else {
				console.log(decodedToken.id);
				next();
			}
		});
	} else {
		console.log("Pas de token présent");
	}
};

module.exports.checkUser = (req, res, next) => {
	try {
		if (req.cookies.jwt) {
			const token = req.cookies.jwt;
			const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
			const { idUSER: userId } = decodedToken;

			const sql = `SELECT idUSER FROM user WHERE idUSER=${userId}`;
			dbConnexion.query(sql, (err, results) => {
				if (err) {
					res.status(204).json(err);
				} else {
					console.log(results);
					next();
				}
			});
		} else {
			res.clearCookie();
			res.status(401).json({ message: "Unauthorized" });
		}
	} catch (err) {
		res.clearCookie();
		console.log(err);
		res.status(401).json({ message: "Unauthorized" });
	}
};
