const Post = require("../model/posts.model");
const Comment = require("../model/comment.model");
const User = require("../model/user.model");

exports.createPost = async (req, res) => {
    const post = await Post.create({
        content: req.body.content,
        userId: req.payload.id
    });
    res.status(201).json(post);
}

exports.getAllPosts = async (req, res) => {
    const listPosts = await Post.findAll();
    res.status(200).json(listPosts);
}

