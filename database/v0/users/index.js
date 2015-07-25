/**
 * Created by alessandrofrancia on 23/07/15.
 */
var mongoose = require('mongoose');


var User = mongoose.model('user', {
    'name': {type: String, required: true},
    'role': {type: Number, default: 3},
    'email': {type: String, required: true},
    'creation_timestamp': {type: Date, default: Date.now},
    'update_timestamp': {type: Date, default: Date.now}
});

module.exports ={
    'User' : User
} ;