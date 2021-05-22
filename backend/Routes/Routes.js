const router = require("express").Router();
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

router.get("/statusWiseCount", StatusWiseCount);
router.get("/trainingProvider", TrainingProvider);
router.get(["/yearlyExpire", "/yearlyExpire/:year"], YearlyExpire);
router.get(["/yearlyCompletion", "/yearlyCompletion/:year"], YearlyCompletion);
router.get("/countryCompletion", CountryCompletion);
router.get("/courseCompletion", CourseCompletion);
router.get("/totalCourses", TotalCourses);
router.get("/totalCountry", TotalCountry);
router.get("/totalTrainingProvider", TotalTrainingProvider);
router.post("/addRecord", AddRecord);

module.exports = router;
