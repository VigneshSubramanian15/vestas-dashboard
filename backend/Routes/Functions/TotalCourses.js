const courseSchema = require("../../Models/courses.schema");
module.exports = async (req, res) => {
  try {
    let data = await courseSchema.aggregate([
      { $unwind: "$records" },
      {
        $group: {
          _id: "null",
          Count: { $sum: 1 },
        },
      },
    ]);
    res.send({ totalCourses: data[0].Count });
  } catch (error) {
    console.log({ error });
  }
};
