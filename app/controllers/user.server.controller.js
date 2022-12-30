let { generatePassword } = require('../../config/passwordAuth')
let passport = require('passport')
let User = require('../models/user.server.model')

exports.logoutUser = (req, res) => {
    req.logout()
    res.json('Logged out successfully')
}

exports.loginUser = (req, res, next) => {
    passport.authenticate('local', function (err, user, info) {
        if (err){
            return res.status(501).json(err)
        }

        if (!user){
            return res.status(501).json(info)
        }

        req.logIn(user, function (err) {
            if (err) { return res.status(501).json(err) }
            return res.status(200).json(user)
        })
    })
}

exports.registerUser = (req, res) => {
    const saltHash = generatePassword(req.body.password)

    const salt = saltHash.salt
    const hash = saltHash.hash

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName,
        hash: hash,
        salt: salt
    })

    newUser.save()
        .then((user) => {
            console.log(`User saved: ${user}`)
        })

    res.json('Registered user successfully')
}