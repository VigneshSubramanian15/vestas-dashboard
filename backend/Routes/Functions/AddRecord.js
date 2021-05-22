const courseSchema = require("../../Models/courses.schema");
const mongoose = require("mongoose");
const employeeSchema = require("../../Models/employee.schema");
/*
 {
    "employee_id": "",
    "delegate_id": "",
    "found": "",
    "delegate_id": "",
    "first_name": "",
    "last_name": "",
    "records": [
        {
            "course_title": "",
            "course_code": "",
            "country": "",
            "training_provider": "",
            "completed_on": "",
            "valid_from": "",
            "valid_until": "",
            "previous_course_valid_until": "",
            "status": ""
        },
    ]
}
*/

module.exports = async ({ body }, res) => {
  let { employee_id, ...course } = body;
  try {
    let employee = {
      _id: new mongoose.Types.ObjectId(),
      employee_id,
      delegate_id: body.delegate_id,
    };
    let newemployee = await employeeSchema.create(employee);
    course = { ...course, employee_ref: newemployee._id };
    await courseSchema.create(course);

    res.send("Record Created Successfully");
  } catch (error) {
    console.log({ error });
  }
};
