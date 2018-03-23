const mongoose = require('mongoose');

const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var Ticket = new Schema({
    state: {
        type: String,
        enum: ['INITIAL', 'GRANTED', 'REQUESTED', 'PENDING', 'REFUSED', 'ACCEPTED']
    },
    applicantId: String,
    facultyId: String,
    created: Date,
    lastModified: Date,
    notes: [{ type: Schema.ObjectId, ref: 'Note' }]
});

module.exports = mongoose.model('Ticket', Ticket, 'Tickets');
