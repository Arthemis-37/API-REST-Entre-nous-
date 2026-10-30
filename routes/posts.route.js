const express = require("express");
const router = express.Router();
const postController = require("../controller/post.controller");

router.get("/", postController.getAllPosts);
router.post("/", postController.createPost);
//router.post("/:postId/comments", postController.addComment);

module.exports = router;