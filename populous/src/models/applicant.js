const mongoose = require('mongoose');

const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var Applicant = new Schema({
    personalInfo: {
        firstName: String,
        lastName: String,
    },
    applicantId: Number,
});

module.exports = mongoose.model('Applicant', Applicant, 'Applicants');
