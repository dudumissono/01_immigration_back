const crypto = require('crypto')

exports.validPassword = (password, hash, salt) => {
    let hashVerify = crypto
        .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
        .toString('hex')

    return hash === hashVerify
}

exports.generatePassword = (password) => {
    let salt = crypto
        .randomBytes(32).toString('hex')

    let genHash = crypto
        .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
        .toString('hex')

    return {
        salt: salt,
        hash: genHash
    }
}

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()){
        return next()
    } else {
        return res.status(400).json({
            "statusCode": 400,
            "msg": "Not Authenticated"
        })
    }
}