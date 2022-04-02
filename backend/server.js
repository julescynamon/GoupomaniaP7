const express = require("express");
const cookieParser = require("cookie-parser");
// Lancement de Express
const app = express();
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
// Mise en place du package Helmet pour pour pouvoir respecter les standars de securite
const helmet = require("helmet");
// mise en place du package path pour accéder au path de notre serveur
const path = require("path");
// on appel la fonction qui check le token du user;
const { requireAuth } = require("./middlewares/auth");
const cors = require("cors");
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

// utilistation de cookie-parser pour pouvoir utiliser nos cookies
app.use(cookieParser());

// verification lors de l'arrive du client sur notre site si il a un token si oui on le connect direct sans demander son email et mot de passe
app.get("/jwtid", requireAuth, (req, res) => {
	res.status(200).send(res.locals.user.idUSER);
});

// Nous devons autoriser express à servir les fichiers publics afin de pouvoir diffuser les images téléchargées.
app.use(
	"../../frontend/public/uploads",
	express.static(path.join(__dirname, "../../frontend/public/uploads")),
);

// Routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

// server
app.listen(process.env.PORT, () => {
	console.log(`Listening on port ${process.env.PORT}`);
});
