var express = require("express")
var cors = require("cors")
var bodyParser = require ("body-parser")
var app = express()
const path = require('path')
var port = process.env.PORT || 5000


app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
});


var Users = require ('./routes/Users')
app.use("/users", Users)

var Posts = require ('./routes/Posts')
app.use("/posts", Posts)

var Comments = require ('./routes/Comments')
app.use("/posts", Comments)

var Likes = require ('./routes/Likes')
app.use("/posts", Likes)


app.use('/images', express.static(path.join(__dirname, 'images')))


module.exports = app

app.listen(port, () => {
    console.log("Server is running on port: " + port)
})