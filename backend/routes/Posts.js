const Post = require('../models/Post')
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')


router.post('/', auth, (req, res, next) => {
    console.log(req.body["content-type"]);
    const today = new Date()
    const postData = {
      post: req.form,
      created: today,
      createdby: req.createdby,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    console.log(postData);
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