const jwt = require("jsonwebtoken");
// importation de la connexion mysql
const dbConnexion = require("../config/db");
require("dotenv").config({ path: "./config/.env" });

module.exports.checkUser = (req, res, next) => {
	try {
		if (req.cookies.jwt) {
			const token = req.cookies.jwt;
			const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
			console.log(decodedToken);
			const { userId: userId } = decodedToken;
			console.log(userId);

			const sql = `SELECT idUSER FROM user WHERE idUSER=${userId}`;
			dbConnexion.query(sql, (err, results) => {
				if (err) {
					res.status(204).json(err);
				} else {
					res.locals.user = decodedToken.userId;
					console.log(res.locals.user);
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

module.exports.requireAuth = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
	} else {
		console.log("No token");
	}
};
