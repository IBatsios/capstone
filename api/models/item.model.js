/**
 * This is the schema for the comments that will appear under posts.
 * 
 * @author Hieu Vo and Christopher Thacker
 * @since 1.0.0
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    listId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'List',
      required: true
    },
    name:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    }
    
}, {timestamps: true}); // Mongoose automatically keeps track of "created" and "edited" dates.

module.exports = mongoose.model('Item', itemSchema);
