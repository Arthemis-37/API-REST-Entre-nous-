const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { as: 'author', foreignKey: 'userId' });

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { as: 'author', foreignKey: 'userId' });

Post.hasMany(Comment, { as: 'comments', foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

module.exports = { User, Post, Comment };