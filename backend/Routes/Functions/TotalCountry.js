const courseSchema = require("../../Models/courses.schema");
module.exports = async (req, res) => {
  try {
    let data = await courseSchema.aggregate([
      { $unwind: "$records" },
      {
        $group: {
          _id: "$records.country",
        },
      },
    ]);
    res.send({ totalCountry: data.length });
  } catch (error) {
    console.log({ error });
  }
};
