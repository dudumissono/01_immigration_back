let mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

let Schema = mongoose.Schema

let UserSchema = new Schema({
    username: {
        type: String,
        default: "",
        trim: true,
        required: "username is required"
    },
    email: {
        type: String,
        default: "",
        trim: true,
        required: "email is required"
    },
    displayName: {
        type: String,
        default: "",
        trim: true,
        required: "Display Name is required"
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    hash: {
        type: String
    },
    salt: {
        type: String
    }
},{
    collection: "users"
})

let options = ({
    missingPasswordError: 'Wrong/Missing Password'
})
UserSchema.plugin(passportLocalMongoose, options)

module.exports = mongoose.model("Users", UserSchema)