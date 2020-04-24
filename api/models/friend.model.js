/**
 * This is the schema for the friend 
 *
 * @author Hieu Vo a
 * @since 1.0.0
 */

var mongoose = require('mongoose')
var Schema = mongoose.Schema

const friendSchema = new Schema({
    requester: { 
        type: Schema.Types.ObjectId, 
        ref: 'User'},
    recipient: { 
        type: Schema.Types.ObjectId, 
        ref: 'User'},
    status: {
      type: Number,
      enums: [
          0,    //'add friend',
          1,    //'requested',
          2,    //'pending',
          3,    //'friends'
      ]
    }
  }, {timestamps: true})
  module.exports = mongoose.model('Friend', friendSchema)