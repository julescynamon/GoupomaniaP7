const router = require("express").Router();
const postController = require("../controllers/post");
const multer = require("multer");
const upload = multer();
const { checkUser } = require("../middlewares/auth");

router.get("/", checkUser, postController.readPost);
router.get("/:id", checkUser, postController.readOnePost);
router.post(
	"/",
	checkUser,
	upload.single("picture"),
	postController.createPost,
);
router.delete("/:id", checkUser, postController.deletePost);

// comments
router.get("/:id/allcomments", checkUser, postController.getAllComment);
router.get("/:id", checkUser, postController.getOneComment);
router.post("/:id", checkUser, postController.commentPost);
router.delete("/:id", checkUser, postController.deleteOneComment);

module.exports = router;
