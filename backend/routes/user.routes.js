// import express
const express = require("express");
// creer un routeur
const router = express.Router();
// middleware pour limité le nombre de tentative de connexion
const limitConnect = require("../middlewares/connectParams");
// import du controller du user
const userAuth = require("../controllers/auth");
const userControlls = require("../controllers/user");
const uploadController = require("../controllers/uploads");
const multer = require("multer");
const upload = multer();

// Mise en place des chemins d'acces au routes
// Route pour l'inscription
router.post("/signup", userAuth.signUp);
// Route pour la connexion
router.post("/login", limitConnect, userAuth.login);
// penser a remettre la limite de tentative de connexion avec limitConnect
router.get("/logout", userAuth.logout);

// Route de modif et delete et avoir tous les users et avoir un seul user dans la db
router.get("/", userControlls.getAllUsers);
router.get("/:id", userControlls.getOneUser);
router.put("/:id", userControlls.updateOneUser);
router.delete("/:id", userControlls.deleteUser);

// route pour l'upload de la photo de profil de l'utilisateur
router.post("/upload", upload.single("file"), uploadController.uploadProfil);

// exporter ce router
module.exports = router;
