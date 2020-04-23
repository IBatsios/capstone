/**
 * This is the schema for the comments that will appear under posts.
 *
 * @author Hieu Vo and Christopher Thacker
 * @since 1.0.0
 */

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        required: true,
      },
    },
    // TODO: Maybe try and make this a reference. It wasn't
    // working that way.
    postId: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
) // Mongoose automatically keeps track of "created" and "edited" dates.

module.exports = mongoose.model('Comment', commentSchema)
