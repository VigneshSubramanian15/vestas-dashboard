const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = Schema(
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
    stories: [{ type: Schema.Types.ObjectId, ref: "Courses" }],
  },
  { timestamps: true }
);

const coursesSchema = Schema(
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
        completed_on: String,
        valid_from: String,
        valid_until: String,
        previous_course_valid_until: String,
        status: String,
      },
    ],
    records_count: Number,
  },
  { timestamps: true }
);

const courses = mongoose.model("Courses", coursesSchema);
const Employee = mongoose.model("Employee", employeeSchema);

mongoose.connect(
  "mongodb+srv://vignesh:77723442@cluster0.04yoq.mongodb.net/vestas?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected To DataBase");
    insert();
  }
);
async function insert() {
  const employee_ref = new Employee({
    _id: new mongoose.Types.ObjectId(),
    employee_id: "Ian Fleming",
    delegate_id: 50,
  });

  employee_ref.save(function (err) {
    if (err) return handleError(err);

    const courses1 = new courses({
      employee_ref: employee_ref._id, // assign the _id from the Employee
      found: "true",
      delegate_id: "AA761744DK",
      first_name: "Allan Rahbæk Rægaard",
      last_name: "Andreasen",
      records: [
        {
          course_title: "Fire Awareness",
          course_code: "FAW",
          country: "Denmark",
          training_provider: "RelyOn Nutec",
          completed_on: "2019-11-27",
          valid_from: "2019-11-27",
          valid_until: "2021-11-27",
          previous_course_valid_until: "",
          status: "Record is valid",
        },
        {
          course_title: "Manual Handling",
          course_code: "MH",
          country: "Denmark",
          training_provider: "RelyOn Nutec",
          completed_on: "2019-11-27",
          valid_from: "2019-11-27",
          valid_until: "2021-11-27",
          previous_course_valid_until: "",
          status: "Record is valid",
        },
      ],
    });

    courses1.save(function (err) {
      if (err) return handleError(err);
      // that's it!
    });
  });
}

async function read() {
  courses
    .findOne({ delegate_id: "AA761744DK" })
    .populate("employee_ref")
    .exec(function (err, story) {
      if (err) return handleError(err);
      console.log("The employee_ref is %s", story.employee_ref);
      // prints "The employee_ref is Ian Fleming"
    });
}
