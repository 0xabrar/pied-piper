const mongoose = require('mongoose');

const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var Ticket = new Schema({
    state: {
        type: String,
        enum: ['INITIAL', 'GRANTED', 'REQUESTED', 'PENDING', 'REFUSED', 'ACCEPTED']
    },
    type: {
        type: String,
        enum: ['DOMESTIC', 'INTERNATIONAL']
    },
    applicantId: Number,
    facultyId: Number,
    created: Date,
    lastModified: Date,
    notes: [{ type: Schema.ObjectId, ref: 'Note' }]
});

module.exports = mongoose.model('Ticket', Ticket, 'Tickets');
