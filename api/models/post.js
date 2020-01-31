/**
 * This is the schema for user posts that will be displayed on the web application.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */

const mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    title: String,
    content: String,
    datePosted: Date,
    dateEdited: Date,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    isActive: Boolean // In lieu of permanently deleting the Post.
});

// Allows the Post Schema to be used outside of this file.
module.exports = mongoose.model("Post", postSchema);