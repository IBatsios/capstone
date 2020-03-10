var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: {
    type: String,
    required: true
},
  password: {
    type: String,
    required: true
},
  firstName: {
    type: String,
    required: true
},
  lastName: {
    type: String,
    required: true
},
  userName: {
    type: String,
    required: true
},
  bio: String,
  phone: {
    type: Number,
    required: true
},
  isActive: Boolean
}, {timestamps: true}); // Mongoose automatically keeps track of "created" and "edited" dates.

module.exports = mongoose.model('User', userSchema);