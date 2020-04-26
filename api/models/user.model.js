/**
 * This is the schema for the comments that will appear under posts.
 *
 * @author Hieu Vo and Christopher Thacker
 * @since 1.0.0
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var passportLocalMongoose = require('passport-local-mongoose')

var userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      default: '',
    },
    // LEAVE COMMENTED OUT TO AVOID STORING PLAIN TEXT PASSWORDS! PASSPORTJS HANDLES THIS!
    // password: {
    //     type: String,
    //     required: true,
    //     default: ''
    // },
    firstName: {
      type: String,
      required: true,
      default: '',
    },
    lastName: {
      type: String,
      required: true,
      default: '',
    },
    username: {
      type: String,
      required: true,
      default: '',
    },
    avatar: {
      type: String,
      required: true,
      default: 'avatar.png',
    },
    bio: {
      type: String,
      required: false,
      default: '',
    },
    phone: {
      type: Number,
      required: false,
      default: null,
    },

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Users',
      },
    ],
    pendingRequests: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Users',
      },
    ],
    sentRequests: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Users',
      },
    ],


    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  { timestamps: true }
)

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', userSchema)
