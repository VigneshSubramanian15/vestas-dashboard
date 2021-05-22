import React, { useEffect } from "react";
import { Card, CardBody } from "shards-react";
import axios from "axios";
import LineChart from "../Chart/LineChart";

export default function StatusWiseCount({ statusCount, setstatusCount }) {
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "statusWiseCount")
      .then(({ data: { data } }) => setstatusCount(data));
  }, []);
  return (
    <Card style={{ width: "100%", height: "600px" }}>
      <CardBody>
        <h4>Status Wise Course Count</h4>
        {statusCount && <LineChart data={statusCount} y={"Count"} x={"_id"} />}
      </CardBody>
    </Card>
  );
}
