const mongoose = require('mongoose');

const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var Note = new Schema({
    text: String,
    created: Date,
    lastModified: Date,
    resolved: Boolean,
});

module.exports = mongoose.model('Note', Note, 'Notes');
