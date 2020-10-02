const Post = require('../models/Post')
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')


router.post('/', auth, multer, (req, res, next) => {
    const today = new Date()
    if(!req.file) {
        const postData = {
            post: req.body.form,
            created: today,
            createdby: req.body.createdby,
            letterUserPost: req.body.letterUserPost,
            imageUrl : "null"
        }
        Post.create(postData)
        .then(() => res.status(201).json({message: "Post enregistré !", data: postData}))
        .catch( error => res.status(400).json({error}))
    } else {
        const postData = {
            post: req.body.form,
            created: today,
            createdby: req.body.createdby,
            letterUserPost: req.body.letterUserPost,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
        Post.create(postData)
        .then(() => res.status(201).json({message: "Post enregistré !", data: postData}))
        .catch( error => res.status(400).json({error}))
    }
})

router.post('/likes', (req, res, next) => {
    Post.update(
        {userLiked: req.body.name},
    )
    .then(() => res.status(201).json({message: "Like enregistré !", data: postData}))
    .catch( error => res.status(400).json({error}))
})

router.get("/", auth, (req, res, next) => {
  Post.findAll()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({error}))
})


module.exports = router