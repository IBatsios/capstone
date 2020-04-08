/**
 * This is the schema for the comments that will appear under posts.
 * 
 * @author Hieu Vo and Christopher Thacker
 * @since 1.0.0
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: false
    },
    phone: {
        type: Number,
        required: false
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
});

// userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);