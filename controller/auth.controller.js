const User = require('../model/user.model.js');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = async (req, res) => {
    let user = await User.findOne({ 
        where: { 
            username: req.body.username
        }
    });
    if (!user) {
        return res.status(400).json({ message: 'Login or password incorrect' });
    }
    const valid = await argon2.verify(user.password, req.body.password);
    if (!valid) {
        return res.status(400).json({ message: 'Login or password incorrect' });
    }
    const token = jwt.sign({ id: user.id, role: user.Roles }, process.env.JWT_KEY);
    return res.status(200).json({ message: 'Login successful', token: token });
}

exports.register = async (req, res) => {
    let user = await User.findOne({ where: { username: req.body.username } });
    if (user) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const hash = await argon2.hash(req.body.password,{
            type: argon2.argon2d,
            memoryCost: 65536,
            timeCost: 3,
        }
    );
    await User.create({ username: req.body.username, password: hash });
    res.status(201).json({ message: 'User created successfully'});
}

exports.getMe = async (req, res) => {
    let user = await User.findByPk(req.payload.id, { attributes: ['id', 'username'] });
    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY);
    if (!token) {
        return res.status(401).json({ message: 'You must be logged in' });
    }
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
}

exports.logout = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'You must be logged in' });
    }
    return res.status(200).json({ message: 'Logout successful' });
}