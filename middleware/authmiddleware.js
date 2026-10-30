const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Vous devez être identifié' });
    }
    try {
        req.payload = jwt.verify(token, process.env.JWT_KEY);
        next();
    } catch (e) {
        return res.status(401).json({ message: 'Vous devez être identifié' });
    }
}