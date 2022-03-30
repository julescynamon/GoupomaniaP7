const jwt = require("jsonwebtoken");

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
