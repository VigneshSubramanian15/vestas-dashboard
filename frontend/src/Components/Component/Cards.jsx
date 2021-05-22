import React, { useEffect, useState } from "react";
import { Card, CardBody, Row, Col } from "shards-react";
import axios from "axios";
import rightArr from "./../Images/right-arrow.svg";
import leftArr from "./../Images/left-arrow.svg";

export default function CardsComponent() {
  const [year, setYear] = useState(2019);
  const [yearCount, setYearCount] = useState(0);
  const [yearExpire, setyearExpire] = useState(2020);
  const [yearExpireCount, setyearExpireCount] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalCountry, settoTalCountry] = useState(0);
  const [totalTrainingProvider, settotalTrainingProvider] = useState(0);

  useEffect(() => {
    GetTotalCoursesAvailable();
    GetTotalCountryAvailable();
    GetTotalTrainingProvider();
  }, []);

  useEffect(() => {
    setYearCount(0);
    axios
      .get(process.env.REACT_APP_API_URL + "yearlyCompletion/" + year, {
        headers: { Authorization: process.env.REACT_APP_HEADER_TOKEN },
      })
      .then(({ data }) => setYearCount(data.count));
  }, [year]);

  useEffect(() => {
    setyearExpireCount(0);
    axios
      .get(process.env.REACT_APP_API_URL + "yearlyExpire/" + yearExpire, {
        headers: { Authorization: process.env.REACT_APP_HEADER_TOKEN },
      })
      .then(({ data }) => setyearExpireCount(data.count));
  }, [yearExpire]);

  const GetTotalCoursesAvailable = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "totalCourses/", {
        headers: { Authorization: process.env.REACT_APP_HEADER_TOKEN },
      })
      .then(({ data }) => {
        setTotalCourses(data.totalCourses);
      });
  };

  const GetTotalCountryAvailable = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "totalCountry/", {
        headers: { Authorization: process.env.REACT_APP_HEADER_TOKEN },
      })
      .then(({ data }) => {
        settoTalCountry(data.totalCountry);
      });
  };

  const GetTotalTrainingProvider = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "totalTrainingProvider/", {
        headers: { Authorization: process.env.REACT_APP_HEADER_TOKEN },
      })
      .then(({ data }) => {
        settotalTrainingProvider(data.totalTrainingProvider);
      });
  };

  return (
    <Row className="Card-Component">
      <Col sm="6" lg="12" className="color">
        <Card className="mb-3">
          <CardBody>
            <div className="title">Courses Completed on {year}</div>
            <div className="count">{yearCount}</div>
            <div className="arrows">
              <span onClick={() => setYear((year) => year - 1)}>
                <img src={leftArr} width={10} alt="larrow" />
              </span>
              <span onClick={() => setYear((year) => year + 1)}>
                <img src={rightArr} width={10} alt="rarrow" />
              </span>
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col sm="6" lg="12" className="color">
        <Card className="mb-3">
          <CardBody>
            <div className="title">Courses Expired Till {yearExpire}</div>
            <div className="count">{yearExpireCount}</div>
            <div className="arrows">
              <span onClick={() => setyearExpire((year) => year - 1)}>
                <img src={leftArr} width={10} alt="larrow" />
              </span>
              <span onClick={() => setyearExpire((year) => year + 1)}>
                <img src={rightArr} width={10} alt="rarrow" />
              </span>
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col sm="6" lg="12" className="color">
        <Card className="mb-3">
          <CardBody>
            <div className="title">Total Courses</div>
            <div className="count">{totalCourses}</div>
          </CardBody>
        </Card>
      </Col>
      <Col sm="6" lg="12" className="color">
        <Card className="mb-3">
          <CardBody>
            <div className="title">Total Country</div>
            <div className="count">{totalCountry}</div>
          </CardBody>
        </Card>
      </Col>
      <Col sm="6" lg="12" className="color">
        <Card className="mb-3">
          <CardBody>
            <div className="title">Total Training Provider</div>
            <div className="count">{totalTrainingProvider}</div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}
