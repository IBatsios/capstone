const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    itemName:{
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    description: {
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
    isActive: {
        type: Boolean,
        required: true
    }
}, {timestamps: true}); // Mongoose automatically keeps track of "created" and "edited" dates.

const Comment = mongoose.model('Item', commentSchema);
module.exports = Comment;
