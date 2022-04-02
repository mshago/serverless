const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Posts = mongoose.model('Post', new Schema({
    description: String,
    user: {type: Schema.Types.ObjectId, ref:'User'},
    date: { type: Date, default: Date.now },
}))

module.exports = Posts