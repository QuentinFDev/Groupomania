const Like = require('../models/Like')
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

router.post('/likes/:id', auth, (req, res) => {
	console.log(req.body.like);
	if(req.body.like == 1 ){
		const likeData = {
			postId: req.params.id,
			userName : req.user.firstname + ' ' + req.user.lastname,
			userId : req.user.userId
		}
		Like.create(likeData)
		.then(() => res.status(201).json({message: "Like enregistré !", data: likeData}))
		.catch( error => res.status(400).json({error}))
	} else if(req.body.like == 0) {
		Like.destroy({
			where: {userId: req.user.userId, postId: req.params.id}
			})
			.then(() => res.status(201).json({message: "like supprimé !"}))
			.catch( error => res.status(400).json({error}))
	} else {
		console.log("erreur de like");
	}
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