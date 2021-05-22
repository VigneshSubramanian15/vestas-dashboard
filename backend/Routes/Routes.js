const router = require("express").Router();
const HeaderValidation = require("../Helpers/HeaderValidation");
const StatusWiseCount = require("./Functions/StatusWiseCount");
const TrainingProvider = require("./Functions/TrainingProvider");
const YearlyExpire = require("./Functions/YearlyExpire");
const YearlyCompletion = require("./Functions/YearlyCompletion");
const CountryCompletion = require("./Functions/CountryCompletion");
const CourseCompletion = require("./Functions/CourseCompletion");
const TotalCourses = require("./Functions/TotalCourses");
const TotalCountry = require("./Functions/TotalCountry");
const TotalTrainingProvider = require("./Functions/TotalTrainingProvider");
const AddRecord = require("./Functions/AddRecord");

router.get("/", (req, res) => res.send("welcome"));
router.get("/statusWiseCount", HeaderValidation, StatusWiseCount);
router.get("/trainingProvider", HeaderValidation, TrainingProvider);
router.get(
  ["/yearlyExpire", "/yearlyExpire/:year"],
  HeaderValidation,
  YearlyExpire
);
router.get(
  ["/yearlyCompletion", "/yearlyCompletion/:year"],
  HeaderValidation,
  YearlyCompletion
);
router.get("/countryCompletion", HeaderValidation, CountryCompletion);
router.get("/courseCompletion", HeaderValidation, CourseCompletion);
router.get("/totalCourses", HeaderValidation, TotalCourses);
router.get("/totalCountry", HeaderValidation, TotalCountry);
router.get("/totalTrainingProvider", HeaderValidation, TotalTrainingProvider);
router.post("/addRecord", HeaderValidation, AddRecord);

module.exports = router;
