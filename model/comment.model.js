const database = require('../config/database');
const { DataTypes } = require('sequelize');

const Comment = database.define('Comment', {
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false  
  },
  postId: {
    type: DataTypes.UUID,
    allowNull: false
  }
}, {
  tableName: 'comment'
});

module.exports = Comment;