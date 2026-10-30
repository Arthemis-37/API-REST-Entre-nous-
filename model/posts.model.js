const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  content: {
    type: DataTypes.STRING(2000),
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