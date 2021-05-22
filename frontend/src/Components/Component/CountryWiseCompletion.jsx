import React, { useEffect } from "react";
import BarChart from "../Chart/BarChart";
import axios from "axios";

import { Card, CardBody } from "shards-react";

export default function CountryWiseCompletion({ countryData, setcountryData }) {
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "countryCompletion", {
        headers: { Authorization: process.env.REACT_APP_HEADER_TOKEN },
      })
      .then(({ data: { data } }) => setcountryData(data));
  }, []);
  return (
    <Card style={{ width: "100%", height: "600px" }}>
      <CardBody>
        <h4>Country Wise Course Completion</h4>
        {countryData && (
          <BarChart data={countryData} y={"Count"} x={"_id"} axisAngle={90} />
        )}
      </CardBody>
    </Card>
  );
}
