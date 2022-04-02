const router = require("express").Router();
const postController = require("../controllers/post");
const multer = require("multer");
const upload = multer();
const { checkUser } = require("../middlewares/auth");

router.get("/", checkUser, postController.readPost);
router.post("/", checkUser, upload.single("file"), postController.createPost);
router.put("/:id", checkUser, upload.single("file"), postController.updatePost);
router.delete("/:id", checkUser, postController.deletePost);
router.patch("/like-post/:id", checkUser, postController.likePost);
router.patch("/unlike-post/:id", checkUser, postController.unLikePost);

// comments
router.patch("/comment-post/:id", checkUser, postController.commentPost);
router.patch(
	"/edit-comment-post/:id",
	checkUser,
	postController.editCommentPost,
);
router.patch(
	"/delete-comment-post/:id",
	checkUser,
	postController.deleteCommentPost,
);

module.exports = router;
