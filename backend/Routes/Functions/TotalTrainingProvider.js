const courseSchema = require("../../Models/courses.schema");
module.exports = async (req, res) => {
  try {
    let data = await courseSchema.aggregate([
      { $unwind: "$records" },
      {
        $group: {
          _id: "$records.training_provider",
        },
      },
    ]);
    res.send({ totalTrainingProvider: data.length });
  } catch (error) {
    console.log({ error });
  }
};
