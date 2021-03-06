const jwt = require("jsonwebtoken");
// importation de la connexion mysql
const dbConnexion = require("../config/db");

// Middleware pour checker si les droits de l'utilisateur a faire tel ou tel action sont bon
module.exports.checkUser = (req, res, next) => {
	try {
		if (req.cookies.jwt) {
			const token = req.cookies.jwt;
			const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
			console.log(decodedToken);
			const { userId: userId } = decodedToken;
			console.log(userId);

			const sql = `SELECT * FROM user WHERE idUSER=${userId}`;
			dbConnexion.query(sql, (err, results) => {
				if (err) {
					res.status(204).json(err);
					next();
				} else {
					res.locals.user = decodedToken.userId;
					console.log(res.locals.user);
					next();
				}
			});
		} else {
			res.status(401).json({ message: "Unauthorized" });
		}
	} catch (err) {
		console.log(err);
		res.status(401).json({ message: "Unauthorized" });
	}
};

// middleware pour checker le token et pour pouvoir voir si la session de l'utilisateur est toujour active
module.exports.requireAuth = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, process.env.JWT_TOKEN, async (err, decodedToken) => {
			if (err) {
				console.log(err);
				res.status(200).json({ message: "no token" });
			} else {
				console.log(decodedToken.userId);
				next();
			}
		});
	} else {
		console.log("No token");
	}
};

module.exports.checkAuth = (req, res, next) => {
	try {
		if (req.cookies.jwt) {
			const token = req.cookies.jwt;
			const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
			console.log(decodedToken);
			const { IdUSER: userId } = decodedToken;
			console.log(userId);
			const sql = `SELECT IdUSER FROM users WHERE IdUSER = ${userId}`;
			dbConnexion.query(sql, (err, result) => {
				if (err) res.status(204).json(err);
				else {
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
