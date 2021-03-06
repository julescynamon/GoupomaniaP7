const express = require("express");
const cookieParser = require("cookie-parser");
// Lancement de Express
const app = express();
require("./config/db");
// Mise en place du package Helmet pour pour pouvoir respecter les standars de securite
const helmet = require("helmet");
const cors = require("cors");

// mise en place du package path pour accéder au path de notre serveur
// const path = require("path");
// on appel la fonction qui check le token du user;
const { requireAuth, checkUser } = require("./middlewares/auth");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

// Utilisation de Helmet pour respecter les standars de securite, Helmet nous aide à protéger notre application de certaines des vulnérabilités bien connues du Web en configurant de manière appropriée des en-têtes HTTP.
app.use(helmet());

// Prévention des erreurs CORS
const corsOptions = {
	origin: process.env.CLIENT_URL,
	credentials: true,
	allowedHeaders: ["sessionId", "Content-Type"],
	exposedHeaders: ["sessionId"],
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	preflightContinue: false,
};
app.use(cors(corsOptions));

//intercerpte les requetes de type json et donne accès au corps de la requète remplace body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// utilistation de cookie-parser pour pouvoir utiliser nos cookies
app.use(cookieParser());

// Verifications du token valide de notre utilisateur
app.get("*", checkUser);
// verification lors de l'arrive du client sur notre site si il a un token si oui on le connect direct sans demander son email et mot de passe
app.get("/jwtid", requireAuth, (req, res) => {
	res.status(200).send({ id: res.locals.user });
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

// server
app.listen(process.env.PORT, () => {
	console.log(`Listening on port ${process.env.PORT}`);
});
