import "./App.scss";
import CountryWiseCompletion from "./Components/Component/CountryWiseCompletion";
import CourseWiseCompletion from "./Components/Component/CourseWiseCompletion";
import StatusWiseCount from "./Components/Component/StatusWiseCount";
import TrainingProvider from "./Components/Component/TrainingProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import { Row, Col } from "shards-react";
import CardsComponent from "./Components/Component/Cards";
import { useState } from "react";
import AddRecord from "./Components/Component/AddRecord";

function App() {
  const [countryData, setcountryData] = useState(null);
  const [trainingProvider, settrainingProvider] = useState(null);
  const [courseData, setcourseData] = useState(null);
  const [statusCount, setstatusCount] = useState(null);

  return (
    <div className="App">
      <div className="charts">
        <div className="heading">
          <h1>Vestas Dashboard </h1>
          <AddRecord />
        </div>
        <Row>
          <Col sm="12" lg="2">
            <CardsComponent />
          </Col>
          <Col sm="12" lg="10">
            <TrainingProvider
              trainingProvider={trainingProvider}
              settrainingProvider={settrainingProvider}
            />
          </Col>
          <Col className="mt-5" sm="12" lg="4">
            <CountryWiseCompletion
              setcountryData={setcountryData}
              countryData={countryData}
            />
          </Col>
          <Col className="mt-5" sm="12" lg="4">
            <CourseWiseCompletion
              courseData={courseData}
              setcourseData={setcourseData}
            />
          </Col>
          <Col className="mt-5" sm="12" lg="4">
            <StatusWiseCount
              statusCount={statusCount}
              setstatusCount={setstatusCount}
            />
          </Col>
        </Row>
        {/* </Container> */}
      </div>
    </div>
  );
}

export default App;
