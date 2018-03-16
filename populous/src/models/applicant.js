const mongoose = require('mongoose');

const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const Applicant = new Schema({
  firstName: String,
  lastName: String,
  applicantId: Number,
});

module.exports = mongoose.model('Applicant', Applicant, 'Applicants');
