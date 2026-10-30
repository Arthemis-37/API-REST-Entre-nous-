const User = require('./user.model');
const Posts = require('./posts.model');
const Comment = require('./comment.model');

exports.associate = async () => {
    User.hasMany(Posts, { foreignKey: 'userId' });
    Posts.belongsTo(User, { as: 'author', foreignKey: 'userId' });

    User.hasMany(Comment, { foreignKey: 'userId' });
    Comment.belongsTo(User, { as: 'author', foreignKey: 'userId' });

    Posts.hasMany(Comment, { as: 'comments', foreignKey: 'postId' });
    Comment.belongsTo(Posts, { as: 'post', foreignKey: 'postId' });
};