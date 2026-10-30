const database = require('./config/database');
const User = require('./model/user.model');
const Post = require('./model/posts.model');
const Comment = require('./model/comment.model');
const {associate} = require('./model/associations');

async function sync() {
    await associate();
    await database.sync();
}
sync();