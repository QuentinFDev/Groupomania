const Post = require('../models/Post')
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const fs = require('fs')


router.post('/', auth, multer, (req, res, next) => {
    const today = new Date()
    if(!req.file) {
        const postData = {
            post: req.body.form,
            created: today,
            createdby: req.body.createdby,
            letterUserPost: req.body.letterUserPost,
            imageUrl : "null",
            likes: 0,
            usersliked: []
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
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            likes: 0,
            usersliked: []
        }
        Post.create(postData)
        .then(() => res.status(201).json({message: "Post enregistré !", data: postData}))
        .catch( error => res.status(400).json({error}))
    }
})

router.delete('/:id', auth, (req, res, next) => {
    var imageUrl = req.body.imageUrl
    var filename = imageUrl.split('/images')[1]
    console.log(filename)
    if(filename != undefined){
        fs.unlinkSync(`images/${filename}`)
    }
    Post.destroy({
        where: {
            id : req.params.id
        }
    })
    .then(() => res.status(201).json({message: "Post supprimé !"}))
    .catch( error => res.status(400).json({error}))
})

/*
router.put('/:id', auth, multer, (req, res, next) => {
    const PostObject = req.file ?
    {
      ...JSON.parse(req.body.post),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Post.updateOne({ 
        where: {
            id: req.params.id
        },
        data: {
            imageUrl : req.body.imageUrl,
            post : req.body.post
        }
    })
    .then(() => res.status(200).json({ message: 'Post modifiée !'}))
    .catch(error => res.status(400).json({ error }))
})
*/

router.put('/:id', auth, (req, res, next) => {
    Post.save({
        where: {
            id : req.params.id
        }
    })
    .then(() => res.status(201).json({message: "Post liké !"}))
    .catch( error => res.status(400).json({error}))
})

router.get("/", auth, (req, res, next) => {
  Post.findAll()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({error}))
})


module.exports = router