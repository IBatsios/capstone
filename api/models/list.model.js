const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    topic: {
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
    item: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        }

    },
    isActive: {
        type: Boolean,
        required: true
    }
}, {timestamps: true}); // Mongoose automatically keeps track of "created" and "edited" dates.

const List = mongoose.model('List', listSchema);
module.exports = List;
