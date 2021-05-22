const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new mongoose.Schema(
  {
    _id: Schema.Types.ObjectId,
    employee_id: {
      type: String,
      require: true,
    },
    delegate_id: {
      type: String,
      require: true,
    },
    stories: [{ type: Schema.Types.ObjectId, ref: "courses" }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Employee", employeeSchema);
