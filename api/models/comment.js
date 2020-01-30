const mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    content: String,
    authorId: String,
    dateCreated: Date,
    dateEdited: Date,
    isActive: Boolean // In lieu of permanently deleting the Comment.
});

// Allows the Comment Schema to be used outside of this file.
module.exports = mongoose.model("Comment", commentSchema);
