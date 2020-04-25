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
<<<<<<< HEAD
<<<<<<< HEAD
    friends: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Friends'}],
=======
=======
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Friends',
      },
    ],
>>>>>>> a28ed9cd0f7aa27561d324798a792e10fcf529ac
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
<<<<<<< HEAD
>>>>>>> ae4b9fcae4c0f76e05c478b51c70aa10b4ea3738
=======
>>>>>>> a28ed9cd0f7aa27561d324798a792e10fcf529ac
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
