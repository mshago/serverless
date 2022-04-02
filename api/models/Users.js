const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Users = mongoose.model('User', new Schema({
    username: String,
    email: String,
    password: String,
    name: String,
    last_name: String,
    salt: String,
    bio: String,
    role: { type: String, default: 'user' }, //admin
    following: [{ type: Schema.ObjectId, ref: 'User' }],
    followers: [{ type: Schema.ObjectId, ref: 'User'  }],
}))

module.exports = Users