const mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    title: String,
    content: String,
    datePosted: Date,
    dateEdited: Date,
    isActive: Boolean
});

// Allows the User Schema to be used outside of this file.
module.exports = mongoose.model("User", userSchema);