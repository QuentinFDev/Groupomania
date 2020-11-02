const Comment = require('../models/Comment')
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')


router.post('/comments', auth, (req, res) => {
    const today = new Date()
    const commentData = {
      comment: req.body.content,
      created: today,
      createdby: req.body.name,
      postId: req.body.postId
    }
    Comment.create(commentData)
        .then(() => res.status(201).json({message: "Commentaire enregistré !", data: commentData}))
        .catch( error => res.status(400).json({error}))
})

router.delete('/comment/:id',auth, (req, res, next) => {
  Comment.destroy({
      where: {
          id : req.params.id
      }
  })
  .then(() => res.status(201).json({message: "Commentaire supprimé !"}))
  .catch( error => res.status(400).json({error}))
})

router.delete('/comments/:id',auth, (req, res, next) => {
  Comment.destroy({
      where: {
          postId : req.params.id
      }
  })
  .then(() => res.status(201).json({message: "Commentaires supprimés !"}))
  .catch( error => res.status(400).json({error}))
})

router.get("/comments", auth, (req, res, next) => {
  Comment.findAll()
    .then(comments => res.status(200).json(comments))
    .catch(error => res.status(400).json({error}))
})


module.exports = router