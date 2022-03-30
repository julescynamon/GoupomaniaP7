// import express
const express = require("express");
// creer un routeur
const router = express.Router();
// validation mot de passe
const validPassword = require("../middlewares/passwordValidator");
// validation email
const emailValid = require("../middlewares/emailValidator");
// middleware pour limité le nombre de tentative de connexion
const limitConnect = require("../middlewares/connectParams");
// import du controller du user
const userAuth = require("../controllers/auth");
const userControlls = require("../controllers/user");
// import du controllers pour uploader une image
const uploadController = require("../controllers/upload");
const multer = require("multer");
const upload = multer();

// Mise en place des chemins d'acces au routes
// Route pour l'inscription
router.post("/signup", emailValid, validPassword, userAuth.signUp);
// Route pour la connexion
router.post("/login", limitConnect, userAuth.login);
// penser a remettre la limite de tentative de connexion avec limitConnect
router.get("/logout", userAuth.logout);

// Route de modif et delete et avoir tous les users et avoir un seul user dans la db
router.get("/", userControlls.getAllUsers);
router.get("/:id", userControlls.getOneUser);
router.put("/:id", userControlls.updtateUser);
router.delete("/:id", userControlls.deleteUser);

// upload
router.post("/upload", upload.single("file"), uploadController.uploadProfil);

// exporter ce router
module.exports = router;
