// Import de multer
const multer = require("multer");
// mise en place du package path pour accéder au path de notre serveur
const path = require("path");

// Mise en place d'un middleware avec multer qui est un  package qui nous permet de gérer les fichiers entrants dans les requêtes HTTP

// dictionnaire d'extensions à traduire
const MIME_TYPES = {
	"image/jpg": "jpg",
	"image/jpeg": "jpg",
	"image/png": "png",
};

/* objet de configuration(qui comprend 
2 éléments : destination, et filename) de multer 
que l'on passe à la méthode diskStorage */
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		if (file.fieldname === "picture")
			cb(null, "../../frontend/public/uploads/posts/");
		else if (file.fieldname === "picture")
			cb(null, "../../frontend/public/uploads/profils/");
	},
	filename: (req, file, callback) => {
		callback(null, Date.now() + path.extname(file.originalname));
	},
	//  génère une limite de taille (ici 5go) pour les photos telecharger sécurise un peu plus l'API
	limits: {
		fileSize: 500000,
	},
});

// export du middleware multer configuré en passant l'objet storage,avec single pour un fichier image unique
module.exports = multer({
	storage: storage,
}).single("../../frontend/public/uploads/");
