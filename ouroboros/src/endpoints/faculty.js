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
  email: { type: String, index: true },
  password: String,
  internationalTickets: { type: Number, default: 0 },
  domesticTickets: { type: Number, default: 0 },
});

module.exports = mongoose.model("Faculty", Faculty, "Faculty");
