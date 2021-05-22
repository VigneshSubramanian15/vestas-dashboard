import React, { useEffect } from "react";
import axios from "axios";
import { Card, CardBody } from "shards-react";
import LineChart from "../Chart/LineChart";
export default function CourseWiseCompletion({ courseData, setcourseData }) {
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "courseCompletion", {
        headers: { Authorization: process.env.REACT_APP_HEADER_TOKEN },
      })
      .then(({ data: { data } }) => setcourseData(data));
  }, []);
  return (
    <Card style={{ width: "100%", height: "600px" }}>
      <CardBody>
        <h4>Course Wise Completion</h4>
        {courseData && (
          <LineChart axisAngle={70} data={courseData} y={"Count"} x={"_id"} />
        )}
      </CardBody>
    </Card>
  );
}
