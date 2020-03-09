/**
 * This is the schema for the comments that will appear under posts.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
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

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
