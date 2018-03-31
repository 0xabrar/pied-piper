const mongoose = require('mongoose');

const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var Faculty = new Schema({
    personalInfo: {
        firstName: String,
        lastName: String,
    },
    department: String,
    facultyId: Number,
});

module.exports = mongoose.model('Faculty', Faculty, 'Faculty');
