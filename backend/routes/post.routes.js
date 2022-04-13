const router = require("express").Router();
const postController = require("../controllers/post");
const multer = require("multer");
const upload = multer();

router.get("/", postController.readPost);
router.get("/:id", postController.readOnePost);
router.post("/", upload.single("picture"), postController.createPost);
router.delete("/:id", postController.deletePost);

// comments
router.get("/:id/allcomments", postController.getAllComment);
router.get("/:id", postController.getOneComment);
router.post("/:id", postController.commentPost);
router.delete("/:id", postController.deleteOneComment);

module.exports = router;
