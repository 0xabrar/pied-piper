var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

mongoose.Promise = global.Promise;

var Faculty = new Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    email: String,
    streetAddress: String,
    country: String,
    department: String,
    facultyId: Number,
});

module.exports = mongoose.model('Faculty', Faculty, 'Faculty');