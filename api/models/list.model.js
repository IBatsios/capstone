/**
 * This is the schema for the comments that will appear under posts.
 * 
 * @author Hieu Vo and Christopher Thacker
 * @since 1.0.0
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    interest: {
        type: String,
        required: true
    },
    author: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        username: String,
        avatar: String,
    },
    items: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Item'
        },
        name: String,
        description: String,
        url: String,

      },
    ],
    isActive: {
        type: Boolean,
        required: true
    }
}, {timestamps: true}); // Mongoose automatically keeps track of "created" and "edited" dates.

module.exports = mongoose.model('List', listSchema);
