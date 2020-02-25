const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    topic: {
        type: String,
        required: true
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    item: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        }

    },
    isActive: {
        type: Boolean,
        required: true
    }
}, {timestamps: true}); // Mongoose automatically keeps track of "created" and "edited" dates.

const Comment = mongoose.model('List', commentSchema);
module.exports = Comment;
