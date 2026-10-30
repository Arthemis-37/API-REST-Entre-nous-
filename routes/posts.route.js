const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/posts", postController.getPosts);
router.post("/posts", authMiddleware, postController.createPost);
router.post("/posts/:postId/comments", authMiddleware, postController.addComment);

module.exports = router;