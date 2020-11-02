const Like = require('../models/Like')
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')


router.post('/likes/:id', auth, (req, res) => {
	const likeData = {
		postId: req.params.id,
		userName : req.body.userName
	}
	Like.create(likeData)
	.then(() => res.status(201).json({message: "Like enregistré !", data: likeData}))
	.catch( error => res.status(400).json({error}))
})

router.delete('/like/:id',auth, (req, res, next) => {
	Like.destroy({
		where: {
			id : req.params.id
		}
	})
	.then(() => res.status(201).json({message: "like supprimé !"}))
	.catch( error => res.status(400).json({error}))
})

router.delete('/likes/:id',auth, (req, res, next) => {
	Like.destroy({
		where: {
			postId : req.params.id
		}
	})
	.then(() => res.status(201).json({message: "Likes supprimés !"}))
	.catch( error => res.status(400).json({error}))
})

module.exports = router