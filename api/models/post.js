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
    // authorId: String, // userSchema should probably handle this functionality as this has done with Comments.
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