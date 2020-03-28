/**
 * This is the schema for the comments that will appear under posts.
 * 
 * @author Hieu Vo and Christopher Thacker
 * @since 1.0.0
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
    itemName:{
        type: String,
        required: true
    },
    URL:{
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    description: {
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

module.exports = mongoose.model('Item', itemSchema);
