const mongoose = require('mongoose');

const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const Note = new Schema({
  text: String,
  resolved: Boolean,
});

module.exports = mongoose.model('Note', Note, 'Notes');
