const Post = require('../models/Post')
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')


router.post('/', auth, (req, res, next) => {
    console.log(req.user);
    const today = new Date()
    const postData = {
      post: req.body.form,
      created: today,
      createdby: req.body.createdby,
      letterUserPost: req.body.letterUserPost,
      //imageUrl: `${req.protocol}://${req.get('host')}/images/${req.body.filename}`
    }
    console.log(postData.letterUserPost);
    Post.create(postData)
        .then(() => res.status(201).json({message: "Post enregistré !", data: postData}))
        .catch( error => res.status(400).json({error}))
})

router.get("/", auth, (req, res, next) => {
  Post.findAll()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({error}))
})


module.exports = router