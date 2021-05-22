const express = require("express");
//const serverless = require("serverless-http");
var cors = require("cors");
const routes = require("./Routes/Routes");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected To DataBase");
  }
);

app.use(routes);
app.post("/", (req, res) => {
  console.log("in");
  console.log(req);
  res.send("success");
});

app.listen(3000, () => console.log("listerning on port 3000"));
