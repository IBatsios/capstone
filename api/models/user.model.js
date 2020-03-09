var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  userName: String,
  bio: String,
  phone: Number,
  isActive: Boolean
}, {timestamps: true}); // Mongoose automatically keeps track of "created" and "edited" dates.

module.exports = mongoose.model('User', userSchema);