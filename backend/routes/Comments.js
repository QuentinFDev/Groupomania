const Comment = require('../models/Comment')
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')


router.post('/comments', (req, res) => {
    const today = new Date()
    const commentData = {
      comment: req.body.content,
      created: today,
      createdby: req.body.name,
      postId: req.body.postId
    }
    console.log(commentData);
    Comment.create(commentData)
        .then(() => res.status(201).json({message: "Commentaire enregistré !", data: commentData}))
        .catch( error => res.status(400).json({error}))
})

router.get("/comments", (req, res, next) => {
  Comment.findAll()
    .then(comments => res.status(200).json(comments))
    .catch(error => res.status(400).json({error}))
})


module.exports = router