const courseSchema = require("../../Models/courses.schema");
module.exports = async (req, res) => {
  try {
    let data = await courseSchema.aggregate([
      { $unwind: "$records" },
      {
        $group: {
          _id: "$records.country",
          Count: { $sum: 1 },
        },
      },
    ]);
    res.send({ data: data.sort((a, b) => a.Count - b.Count) });
  } catch (error) {
    console.log({ error });
  }
};
