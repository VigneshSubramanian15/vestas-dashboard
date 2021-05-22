const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new mongoose.Schema(
  {
    employee_ref: { type: Schema.Types.ObjectId, ref: "Employee" },
    found: {
      type: String,
      require: true,
    },
    delegate_id: {
      type: String,
      require: true,
    },
    first_name: {
      type: String,
      require: true,
    },
    last_name: {
      type: String,
      require: true,
    },
    records: [
      {
        course_title: String,
        course_code: String,
        country: String,
        training_provider: String,
        completed_on: Date,
        valid_from: Date,
        valid_until: Date,
        previous_course_valid_until: String,
        status: String,
      },
    ],
    records_count: Number,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Courses", courseSchema);
