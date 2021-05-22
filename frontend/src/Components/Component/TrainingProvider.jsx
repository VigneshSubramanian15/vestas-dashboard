import React, { useEffect } from "react";
import axios from "axios";
import { Card, CardBody } from "shards-react";
import BarChart from "../Chart/BarChart";

export default function TrainingProvider({
  settrainingProvider,
  trainingProvider,
}) {
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "trainingProvider")
      .then(({ data: { data } }) => settrainingProvider(data));
  }, []);
  return (
    <Card style={{ width: "100%", height: "850px" }}>
      <CardBody>
        <h4>Training Provider Wise Course Completion</h4>
        {trainingProvider && (
          <BarChart
            data={trainingProvider}
            y={"Count"}
            x={"_id"}
            axisAngle={90}
          />
        )}
      </CardBody>
    </Card>
  );
}
