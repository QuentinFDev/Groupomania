const Post = require('../models/Post')
const User = require('../models/User')
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const fs = require('fs')

//Création de post
router.post('/', auth, multer, (req, res, next) => {
    const today = new Date()
    //Si il y a une image
    if(!req.file) {
        const postData = {
            post: req.body.form,
            created: today,
            createdby: req.body.createdby,
            userId: req.body.userId,
            letterUserPost: req.body.letterUserPost,
            imageUrl : "null",
            likes: 0,
            usersliked: []
        }
        Post.create(postData)
        .then(() => res.status(201).json({message: "Post enregistré !", data: postData}))
        .catch( error => res.status(400).json({error}))
    //Si il n'y a pas d'image
    } else {
        const postData = {
            post: req.body.form,
            created: today,
            createdby: req.body.createdby,
            userId: req.body.userId,
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

//suppression d'un post avec l'image dans le dossier images du serveur
router.delete('/:id', auth, (req, res, next) => {
    Post.findByPk(req.params.id)
        .then((post) => {
            const filename = post.imageUrl.split('/images/')[1]
            fs.unlink(`images/${filename}`, () => {
                Post.destroy({
                    where: {
                        id : req.params.id
                    }
                })
                .then(() => res.status(201).json({message: "Post supprimé !"}))
                .catch( error => res.status(400).json({error}))
            })
        })
        .catch(error => res.status(500).json({error}))
})

//modification d'un post
router.put('/:id', auth, multer, (req, res, next) => {
    Post.findByPk(req.params.id)
    Post.update({
        post : req.body.post,
        imageUrl : "null",
        created: new Date()
    })
    .then(() => res.status(201).json({message: "Post modifié !"}))
    .catch( error => res.status(400).json({error}))
})


router.get("/", auth, (req, res, next) => {
    try {
        Post.findAll({include : ['comments', 
        {
            model: User,
            as : 'author',
            attributes : {
                exclude : ['password', 'email']
            }
        }
    ]})
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({error}))
    } catch (error) {
        console.log(error);
    }
})

router.get("/:id", auth, (req, res, next) => {
    Post.findByPk(req.params.id)
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({error}))
})

module.exports = router