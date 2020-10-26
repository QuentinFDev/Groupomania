const Sequelize = require('sequelize')
const db = require('../database/db.js')
const Comment = require('./Comment')
const User = require('./User')
const Like = require('./Like')

let Post = db.sequelize.define(
    'posts',
        {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        post: {
            type: Sequelize.TEXT
        },
        imageUrl: {
            type: Sequelize.STRING
        },
        createdby: {
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.INTEGER
        },
        created: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        letterUserPost: {
            type: Sequelize.STRING
        },
    },
    {
        timestamps: false
    }
)

Post.hasMany(Comment, {
    foreignKey: 'postId',
    as : 'comments'
})
Post.hasMany(Like, {
    foreignKey: 'postId',
    as : 'likes'
})
Post.belongsTo(User, {
    foreignKey: 'userId',
    as : 'author'
})


module.exports = Post