// Path
const sequelize = require('../database/db');
const { DataTypes } = require('sequelize');

// Model
const Token = sequelize.define('Token', {
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users', 
            key: 'id'       
        },
        allowNull: false
    }
}, {
    tableName: 'refreshTokens',
    timestamps: true
});

module.exports = Token;