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
  }
}, {
  tableName: 'posts'
});

module.exports = Post;