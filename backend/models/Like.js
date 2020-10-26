const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
    'likes',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        postId: {
            type: Sequelize.NUMBER
        },
        userName: {
          	type: Sequelize.STRING
        },
        
    },
    {
        timestamps: false
    }
)