/**
 * This is the schema for user posts that will be displayed on the web application.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    title: String,
    content: String,
    topic: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    isActive: Boolean // In lieu of permanently deleting the Post.
}, {timestamps: true}); // Mongoose automatically keeps track of "created" and "edited" dates.

// Allows the Post Schema to be used outside of this file.
module.exports = mongoose.model("Post", postSchema);