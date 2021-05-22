const courses = require("../learninghistory.json");
const employees = require("../sampledata.json");
const employeeSchema = require("../Models/employee.schema");
const courseSchema = require("../Models/courses.schema");

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://vignesh:77723442@cluster0.04yoq.mongodb.net/vestas?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected To DataBase");
    InsertAll();
  }
);

async function InsertAll() {
  console.log("in");
  await Promise.all(
    employees.root.employee.map(async (employee, i) => {
      let tempEmployee = employee;
      tempEmployee["_id"] = new mongoose.Types.ObjectId();
      let newemployee = await employeeSchema.create(employee);
      console.log("Inserting Employee", i);
      let tempcourse = courses.root.records.filter(
        (course) => course.delegate_id === employee.delegate_id
      );
      await Promise.all(
        tempcourse.map(async (course) => {
          let newcourse = course;

          let newrecords = newcourse.records.map((record) => {
            return {
              ...record,
              completed_on: new Date(record.completed_on),
              valid_from: new Date(record.valid_from),
              valid_until: new Date(record.valid_until),
            };
          });

          newcourse = {
            ...newcourse,
            employee_ref: newemployee._id,
            records: newrecords,
          };
          await courseSchema.create(newcourse);
          console.log("Inserting Course", i);
        })
      );
    })
  );
}

// async function GetData() {
//   Employee.findOne({ delegate_id: "AB810875DK" })
//     .populate("employee_ref")
//     .exec(function (err, story) {
//       if (err) return console.log(err);
//       console.log("Complete Data", story);
//     });
// }

// async function InsertCourse() {
//   console.log("inserting Courses", courses.root.records.length);
//   await Promise.all(
//     courses.root.records.map(async (course, i) => {
//       try {
//         console.log(course.records.length);
//         let temp = course;
//         temp["records_count"] = course.records.length;
//         await courseSchema.create(temp);
//         console.log("Inserting Course", i);
//       } catch (error) {
//         console.log({ error, course });
//       }
//     })
//   );
//   console.log("End");
//   return true;
// }

// async function InsertEmployee() {
//   console.log("inserting Employees", employees.root.employee.length);
//   await Promise.all(
//     employees.root.employee.map(async (employee, i) => {
//       await employeeSchema.create(employee);
//       console.log("Inserting Employee", i);
//     })
//   );
//   InsertCourse();
// }
