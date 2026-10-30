const User = require('../model/user.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = async (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(401).json({ error: 'Username and password are required' });
    }
    let user = await User.findOne({ 
        where: { 
            username: req.body.username
        }
    });
    if (!user) {
        return res.status(401).json({ error: 'User not found' });
    }
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
        return res.status(401).json({ error: 'Login or password incorrect' });
    }
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_KEY);
    return res.status(200).json({ token: token, user: { id: user.id, username: user.username }});
}

exports.register = async (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
    if (req.body.username.trim().length < 2 || req.body.username.trim().length > 30) {
        return res.status(400).json({ error: 'Username must be between 2 and 30 characters long' });
    }
    if (req.body.password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }
    let user = await User.findOne({ where: { username: req.body.username } });
    if (user) {
        return res.status(409).json({ error: 'User already exists' });
    }
    const hash = await bcrypt.hash(req.body.password, 10);

    const token = jwt.sign({ id: req.body.id, username: req.body.username }, process.env.JWT_KEY);
    await User.create({ username: req.body.username, password: hash });
    res.status(201).json({ token: token, user: { id: req.body.id, username: req.body.username }});
}

exports.getMe = async (req, res) => {
    let user = await User.findByPk(req.payload.id, { attributes: ['id', 'username'] });
    if (!user) {
        return res.status(401).json({ error: 'User not found' });
    }
    
    return res.status(200).json(user);
}