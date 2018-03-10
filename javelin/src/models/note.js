var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

mongoose.Promise = global.Promise;

var Note = new Schema({
    text: String,
    resolved: Boolean,
});

module.exports = mongoose.model('Note', Note, 'Notes');
