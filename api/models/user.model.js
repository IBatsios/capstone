/**
 * This is the schema for the comments that will appear under posts.
 * 
 * @author Hieu Vo and Christopher Thacker
 * @since 1.0.0
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: {
    type: String,
    required: true
},
  password: {
    type: String
    //required: true
},
  firstName: {
    type: String,
    required: false
},
  lastName: {
    type: String,
    required: false
},
  userName: {
    type: String,
    required: true
},
  bio: {
    type: String,
    required: false
  },
  phone: {
    type: Number,
    required: false
},
  isActive: Boolean
}, {timestamps: true}); // Mongoose automatically keeps track of "created" and "edited" dates.

module.exports = mongoose.model('User', userSchema);