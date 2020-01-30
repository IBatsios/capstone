var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  userName: String,
  phone: Number,
  posts: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
    }
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
    }
  ],
  isActive: Boolean
});

module.exports = mongoose.model('User', userSchema);