var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

mongoose.Promise = global.Promise;

var Applicant = new Schema({
    firstName: String,
    lastName: String,
    applicantId: Number,
});

module.exports = mongoose.model('Applicant', Applicant, 'Applicants');