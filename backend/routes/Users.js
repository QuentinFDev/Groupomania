const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth')

const User = require('../models/User')
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
  const today = new Date()
  const userData = {
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    service: req.body.service,
    admin: 0,
    created: today
  }
  console.log(req.body);
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          User.create(userData)
            .then(user => {res.json({ status: user.email + ' Enregistré!'})
            })
            .catch(err => {res.send('error 400: ' + err)
            })
        })
      } else {
        res.status(400).json({ error: 'Utilisateur déjà existant' })
      }
    })
    .catch(err => {res.send('error 500: ' + err)
    })
})

users.post('/login', (req, res) => {
  User.findOne({
    where: {email: req.body.email}
  })
  .then(user => {
    if (!user) {
      return res.status(400).json({error: 'Utilisateur non trouvé !'})
    }
    bcrypt.compare(req.body.password, user.password)
      .then(valid => {
        if (!valid) {
          return res.status(400).json({error: 'Mot de passe incorrect !'})
        }
        res.status(200).json({
          userFirstName: user.first_name,
          userLastName: user.last_name,
          userId: user.id,
          userAdmin: user.admin,
          token: jwt.sign(
            {userId: user.id, firstname: user.first_name, lastname: user.last_name, service: user.service, userAdmin: user.admin}, process.env.SECRET_KEY, { expiresIn: '24H'}
          ),
        })
      })
      .catch(error => res.status(500).json({ error }))
  })
  .catch(error => res.status(500).json({ error }))
})

users.delete('/', auth, (req, res) => {
  User.destroy({
    where: {
      id : req.user.userId
    }
  })
  .then(() => res.status(201).json({message: "Utilisateur supprimé !"}))
  .catch( error => res.status(400).json({error}))
})

module.exports = users
