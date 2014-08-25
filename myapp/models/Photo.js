var mongoose = require('mongoose');
console.log(mongoose.version);
mongoose.connect('mongodb://localhost/my_app', function(err){
    if(err) throw err;
    console.log('connected');
});
var schema = new mongoose.Schema({
    name: String,
    path: String
});
module.exports = mongoose.model('Photo', schema);