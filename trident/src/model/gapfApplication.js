const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const GAPFApplicationSchema = new Schema({
  facultyId: { type: Number, index: true },
  created: Number, // use UNIX time stamps for all dates
  lastModified: Number,
  status: { type: String, enum: ["SUBMITTED", "BUDGET_ALLOCATED"] },
  attachedDocuments: [
    {
      name: String,
      link: String,
      attachedDate: Number
    }
  ]
});

GAPFApplicationSchema.static("findByFacultyId", function(facultyId, callback) {
  return this.findOne()
    .where("facultyId")
    .equals(facultyId);
});

GAPFApplicationSchema.static("submit", function(gapf, callback) {
  return this.findOneAndUpdate(
    { facultyId: gapf.facultyId },
    gapf,
    { upsert: true }, // create it if doesn't exist
    callback
  );
});

GAPFApplicationSchema.static("all", function(callback) {
  return this.find({}, callback);
});

const GAPFApplication = mongoose.model(
  "GAPFApplication",
  GAPFApplicationSchema
);

export { GAPFApplication };
