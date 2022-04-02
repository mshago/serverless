const express = require('express')
const Users = require('../models/Users')

const router = express.Router()

router.get('/',(req, res) => {
    Users.find()
        .exec()
        .then(x => res.status(200).send(x))
})

router.get('/:id',(req,res) => {
    Users.findById(req.params.id)
        .exec()
        .then(x => res.status(200).send(X))
})

router.put('/update/:id',(req,res) => {
    Users.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.sendStatus(204))
})

router.get('/follow',(req, res) => {
    Users.findById(req.params.id)
        .exec()
        .then(x => {
            res.send(x)
        })
})

router.put('/unfollow',(req,res) => {

})

module.exports = router