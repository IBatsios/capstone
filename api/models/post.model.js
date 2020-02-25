/**
 * This is the schema for user posts that will be displayed on the web application.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String,
    },
    isActive: {
        type: Boolean,
        required: true
    }
}, {timestamps: true}); // Mongoose automatically keeps track of "created" and "edited" dates.

const Post = mongoose.model('Post', postSchema);
module.exports = Post;