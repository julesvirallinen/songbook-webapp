var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var biisiSchema = new Schema({
    name: String,
    sanat: String,
   });

var Biisit = mongoose.model('Biisi', biisiSchema);

module.exports = Biisit;
