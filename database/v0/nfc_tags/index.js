/**
 * Created by alessandrofrancia on 23/07/15.
 */

var mongoose = require('mongoose');

var User
var Nfc_tag = mongoose.model('nfc_tag', {
    name: String,
    type: Number,
    locked : Boolean,
    authorized: [],
    state : {type:Number, default :0},
    in_use:[]


});


module.exports =  {
    'Nfc_tag': Nfc_tag
};