/**
 * This is the schema for the comments that will appear under posts.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    content: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    isActive: Boolean // In lieu of permanently deleting the Comment.
}, {timestamps: true}); // Mongoose automatically keeps track of "created" and "edited" dates.

// Allows the Comment Schema to be used outside of this file.
module.exports = mongoose.model("Comment", commentSchema);
