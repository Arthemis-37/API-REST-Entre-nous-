const Post = require("../model/posts.model");
const Comment = require("../model/comment.model");
const User = require("../model/user.model");

exports.createPost = async (req, res) => {
    if (!req.body.content || req.body.content.trim().length < 1 || req.body.content.trim().length > 2000) {
        return res.status(400).json({ error: 'Content is required and must be between 1 and 2000 characters long' });
    }
    const post = await Post.create({
        content: req.body.content,
        userId: req.payload.id,
        author: {
            id: req.payload.id,
            username: req.payload.username
        },
        comments: []
    });
    res.status(201).json(post);
}

exports.getAllPosts = async (req, res) => {
    const attributes = ['id', 'username'];
    const listPosts = await Post.findAll({
        include: [{
            model: Comment, as: 'comments', include: [{ model: User, as: 'author'}]
        }, {
            model: User, as: 'author', attributes: attributes
        }],
        order: [['createdAt', 'DESC']]
    });
    res.status(200).json(listPosts);
}

exports.addComment = async (req, res) => {
    if (!req.body.content || req.body.content.trim().length < 1 || req.body.content.trim().length > 2000) {
        return res.status(400).json({ error: 'Content is required and must be between 1 and 2000 characters long' });
    }
    const post = await Post.findByPk(req.params.id);
    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }
    const comment = await Comment.create({
        content: req.body.content,
        userId: req.payload.id,
        author: {
            id: req.payload.id,
            username: req.payload.username
        }
    });
    post.comments.push(comment);
    await post.save();
    res.status(201).json(comment);
}