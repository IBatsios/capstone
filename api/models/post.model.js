/**
 * This is the schema for user posts that will be displayed on the web application.
 *
 * @author Hieu Vo
 * @author Christopher Thacker
 * @author Michael McCulloch
 * @since 1.0.0
 */

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var postSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    interest: {
      type: String,
      required: true
    },
    likeCount: {
      type: Number,
      required: true
    },
    arrayLike: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        username: String
      }
    ],
    comments: [
      {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        },
        content: String,
        author: Object
      }
    ],
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      username: String,
      avatar: String
    },

    isActive: {
      type: Boolean,
      required: true
    }
  },
  { timestamps: true }
) // Mongoose automatically keeps track of "created" and "edited" dates.

module.exports = mongoose.model('Post', postSchema)
