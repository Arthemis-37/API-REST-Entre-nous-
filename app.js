const express = require('express');
const authroute = require('./routes/auth.route');
const postsroute = require('./routes/posts.route');

const app = express();
app.use(express.json());
app.use('/api/auth', authroute);
app.use('/api/posts', postsroute);

app.listen(3001, () => {
    console.log('Server started on port 3001');
});

module.exports = app;