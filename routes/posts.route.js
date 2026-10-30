const express = require("express");
const router = express.Router();
const postController = require("../controller/post.controller");
const { auth } = require("../middlewares/auth.middleware");

router.get("/", postController.getAllPosts);
router.post("/", auth, postController.createPost);
router.post("/:postId/comments", auth, postController.addComment);

module.exports = router;