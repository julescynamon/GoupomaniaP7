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
const { checkUser } = require("../middlewares/auth");

// Mise en place des chemins d'acces au routes
// Route pour l'inscription
router.post("/signup", emailValid, validPassword, userAuth.signUp);
// Route pour la connexion
router.post("/login", limitConnect, userAuth.login);
// penser a remettre la limite de tentative de connexion avec limitConnect
router.get("/logout", userAuth.logout);

// Route de modif et delete et avoir tous les users et avoir un seul user dans la db
router.get("/", checkUser, userControlls.getAllUsers);
router.get("/:id", checkUser, userControlls.getOneUser);
router.put("/:id", checkUser, userControlls.updateOneUser);
router.delete("/:id", checkUser, userControlls.deleteUser);

// exporter ce router
module.exports = router;
