/**
 * Created by alessandrofrancia on 23/07/15.
 */

var nfc_tags = require('./nfc_tags').Nfc_tag;
var users = require('./users').User;
var mongoose = require('mongoose');

var models_schema = mongoose.models_schema = {};


var initialized = false;
module.exports = {
  init :  function(){
      if(!initialized){
          models_schema['Nfc_tags'] = nfc_tags;
          models_schema['Users'] = users;
      }
  }
};