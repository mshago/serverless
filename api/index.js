const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const auth = require('./routes/auth')
const users = require('./routes/users')
const posts = require('./routes/posts')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const MONGO_URI = 'mongodb+srv://dbUser:dbUserPassword@auth.jd43x.mongodb.net/auth?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})

app.use('/api/auth', auth)
app.use('/api/users',users)
app.use('/api/posts',posts)
module.exports = app