const express = require('express')
const Posts = require('../models/Posts')
const { isAuthenticated } = require('../auth')

const router = express.Router()

router.get('/',(req,res) => {
    Posts.find()
        .populate('user')
        .exec()
        .then(x => res.status(200).send(x))
})

router.get(':/id',(req,res) => {
    Posts.findById(req.params.id)
        .exec()
        .then(x => res.status(200).send(x))
})

router.post('/',isAuthenticated,(req,res) => {
    const { _id } = req.user
    const { description } = req.body
    Posts.create({
        description:description,
        user: _id,
    })
    .then(x => res.status(201).send(x))
})

router.put('/:id',isAuthenticated,(req,res) => {
    Posts.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.sendStatus(204))
})

router.delete('/:id',isAuthenticated,(req,res) => {
    Posts.findByIdAndDelete(req.params.id)
        .then(() => res.sendStatus(204))
})

module.exports = router