const courseSchema = require("../../Models/courses.schema");
module.exports = async (req, res) => {
  let year = req.params.year || 2019;
  console.log({ year });
  try {
    let data = await courseSchema.aggregate([
      { $unwind: "$records" },
      {
        $match: {
          "records.completed_on": {
            $gte: new Date(`${year}-01-01T00:00:00.0Z`),
            $lt: new Date(`${year}-12-31T00:00:00.0Z`),
          },
        },
      },
    ]);
    res.send({ count: data.length });
  } catch (error) {
    console.log({ error });
  }
};
