const mongoose = require('mongoose');

const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const Ticket = new Schema({
  state: {
    type: String,
    enum: ['INITIAL', 'GRANTED', 'REQUESTED', 'PENDING', 'REFUSED', 'ACCEPTED'],
  },
  applicantId: Number,
  facultyId: Number,
  notes: [{ type: Schema.ObjectId, ref: 'Note' }],
});

module.exports = mongoose.model('Ticket', Ticket, 'Tickets');
