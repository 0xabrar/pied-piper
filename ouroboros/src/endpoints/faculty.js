const mongoose = require("mongoose");

const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var Faculty = new Schema({
  facultyId: { type: Number, index: true },
  personalInfo: {
    firstName: String,
    lastName: String
  },
  department: String,
  type: String,
  allotedTickets: Number,
  email: { type: String, index: true },
  password: String
});

module.exports = mongoose.model("Faculty", Faculty, "Faculty");
