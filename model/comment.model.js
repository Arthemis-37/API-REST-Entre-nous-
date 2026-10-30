const database = require('../config/database');
const { DataTypes } = require('sequelize');

const Comment = database.define('Comment', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  content: {
    type: DataTypes.STRING(500),
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