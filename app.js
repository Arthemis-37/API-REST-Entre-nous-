const express = require('express');
const authRoute = require('./routes/auth.route');
const postsRoute = require('./routes/posts.route');
const app = express();

app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/posts', postsRoute);

module.exports = app;