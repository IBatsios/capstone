/**
 * This is the schema for the comments that will appear under posts.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */

const mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    content: String,
    // authorId: String, // userSchema should probably handle this functionality.
    dateCreated: Date,
    dateEdited: Date,
    isActive: Boolean // In lieu of permanently deleting the Comment.
});

// Allows the Comment Schema to be used outside of this file.
module.exports = mongoose.model("Comment", commentSchema);
