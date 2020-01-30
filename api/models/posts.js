const mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    title: String,
    content: String,
    authorId: String,
    datePosted: Date,
    dateEdited: Date,
    isActive: Boolean
});

// Allows the Post Schema to be used outside of this file.
module.exports = mongoose.model("Post", postSchema);