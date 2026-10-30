const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Post = sequelize.define('Post', {
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  comments: {
    type: DataTypes.ARRAY(DataTypes.UUID),
    allowNull: true
  }
}, {
  tableName: 'posts'
});

module.exports = Post;