import axios from "axios";
import React, { useState } from "react";
import {
  Form,
  FormInput,
  FormGroup,
  Modal,
  ModalBody,
  ModalHeader,
  FormSelect,
  Row,
  Col,
} from "shards-react";
import Swal from "sweetalert2";

export default function AddRecord() {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [records, setRecords] = useState([]);
  const [addRecord, setaddRecord] = useState(false);
  const [record, setRecord] = useState({
    course_title: "",
    course_code: "",
    country: "",
    training_provider: "",
    completed_on: "",
    valid_from: "",
    valid_until: "",
    previous_course_valid_until: "",
    status: "",
  });
  const [formData, setFormData] = useState({
    employee_id: "",
    delegate_id: "",
    found: "",
    first_name: "",
    last_name: "",
  });

  const updateFormData = ({ target: { value, name } }) => {
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const updateRecord = ({ target: { value, name } }) => {
    setRecord((record) => ({ ...record, [name]: value }));
  };

  const addRecordToList = (e) => {
    e.preventDefault();
    let recordTemp = record;
    recordTemp = {
      ...record,
      previous_course_valid_until: new Date(record.previous_course_valid_until),
      valid_from: new Date(record.valid_from),
      valid_until: new Date(record.valid_until),
      completed_on: new Date(record.completed_on),
    };
    setRecords((records) => [...records, recordTemp]);
    setRecord({
      course_title: "",
      course_code: "",
      country: "",
      training_provider: "",
      completed_on: "",
      valid_from: "",
      valid_until: "",
      previous_course_valid_until: "",
      status: "",
    });
    setaddRecord(false);
  };

  const SaveRecord = (e) => {
    e.preventDefault();
    console.log({
      formData: {
        ...formData,
        records,
      },
    });
    axios
      .post(
        process.env.REACT_APP_API_URL + "addRecord",
        {
          ...formData,
          records,
        },
        { headers: { Authorization: process.env.REACT_APP_HEADER_TOKEN } }
      )
      .then((res) => {
        Swal.fire({
          title: "Course SuccessFully Created",
          icon: "success",
        }).then(() => {
          setIsModelOpen(false);
          setRecord({
            course_title: "",
            course_code: "",
            country: "",
            training_provider: "",
            completed_on: "",
            valid_from: "",
            valid_until: "",
            previous_course_valid_until: "",
            status: "",
          });
          setRecords([]);
          setaddRecord(false);
          setFormData({
            employee_id: "",
            delegate_id: "",
            found: "",
            first_name: "",
            last_name: "",
          });
        });
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <>
      <button
        className="spcl-button "
        onClick={() => setIsModelOpen((isModelOpen) => !isModelOpen)}
      >
        Add New Course
      </button>
      <Modal
        open={isModelOpen}
        size={"lg"}
        toggle={() => setIsModelOpen((isModelOpen) => !isModelOpen)}
      >
        <ModalHeader> Add New Course</ModalHeader>

        <ModalBody>
          <Form onSubmit={SaveRecord} className="form-style">
            <Row>
              <Col sm={12} md={6}>
                <FormGroup>
                  <label htmlFor="#employee_id">Employee Id</label>
                  <FormInput
                    id="#employee_id"
                    value={formData.employee_id}
                    name="employee_id"
                    required
                    placeholder="Employee Id"
                    onChange={updateFormData}
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <label htmlFor="#delegate_id">Delegate Id</label>
                  <FormInput
                    id="#delegate_id"
                    required
                    value={formData.delegate_id}
                    name="delegate_id"
                    placeholder="Delegate Id"
                    onChange={updateFormData}
                  />
                </FormGroup>
              </Col>

              <Col sm={12} md={6}>
                <FormGroup>
                  <label htmlFor="#first_name">First Name</label>
                  <FormInput
                    id="#first_name"
                    required
                    value={formData.first_name}
                    name="first_name"
                    placeholder="First Name"
                    onChange={updateFormData}
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <label htmlFor="#last_name">Last Name</label>
                  <FormInput
                    id="#last_name"
                    value={formData.last_name}
                    required
                    name="last_name"
                    placeholder="Last Name"
                    onChange={updateFormData}
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <label htmlFor="#found">Found</label>
                  <FormInput
                    id="#found"
                    required
                    onChange={updateFormData}
                    value={formData.found}
                    name="found"
                    placeholder="Found"
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                {!addRecord ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setaddRecord(true);
                    }}
                    className="mt-3"
                  >
                    Add Records
                  </button>
                ) : (
                  ""
                )}
              </Col>

              {records.length
                ? records.map((record, index) => {
                    return (
                      <table className="table table-bordered">
                        <tr>
                          <td>{record.course_title}</td>
                          <td>{record.status}</td>
                          {/* <td>
                            <span
                              onClick={() => {
                                setRecord(record);
                                // console.log({ res: records.splice(index, 1) });
                                // setRecords((records) =>
                                //   records.splice(index, 1)
                                // );
                              }}
                              className="option"
                            >
                              Edit
                            </span>
                            |
                            <span
                              onClick={() =>
                                setRecords((records) =>
                                  records.splice(index, 1)
                                )
                              }
                              className="option"
                            >
                              Delete
                            </span>
                          </td> */}
                        </tr>
                      </table>
                    );
                  })
                : ""}

              {addRecord ? (
                <Form style={{ width: "100%" }} onSubmit={addRecordToList}>
                  <Col sm={12} md={12}>
                    <h4>
                      Records{" "}
                      <span
                        className="cancle"
                        onClick={() => {
                          setRecord({
                            course_title: "",
                            course_code: "",
                            country: "",
                            training_provider: "",
                            completed_on: "",
                            valid_from: "",
                            valid_until: "",
                            previous_course_valid_until: "",
                            status: "",
                          });
                          setaddRecord(false);
                        }}
                      >
                        Cancle
                      </span>
                    </h4>
                  </Col>
                  <Row>
                    <Col sm={12} md={4}>
                      <FormGroup>
                        <label htmlFor="#course_title">Course Title</label>
                        <FormInput
                          id="#course_title"
                          name="course_title"
                          required
                          value={record.course_title}
                          onChange={updateRecord}
                          placeholder="Course Title"
                        />
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={4}>
                      <FormGroup>
                        <label htmlFor="#course_code">Course Code</label>
                        <FormInput
                          id="#course_code"
                          value={record.course_code}
                          required
                          onChange={updateRecord}
                          name="course_code"
                          placeholder="Course Code"
                        />
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={4}>
                      <FormGroup>
                        <label htmlFor="#country">Country</label>
                        <FormInput
                          id="#country"
                          value={record.country}
                          onChange={updateRecord}
                          required="true"
                          name="country"
                          placeholder="Country"
                        />
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={4}>
                      <FormGroup>
                        <label htmlFor="#training_provider">
                          Training Provider
                        </label>
                        <FormInput
                          id="#training_provider"
                          value={record.training_provider}
                          onChange={updateRecord}
                          required
                          name="training_provider"
                          placeholder="Training Provider"
                        />
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={4}>
                      <FormGroup>
                        <label htmlFor="#completed_on">Completed On</label>
                        <FormInput
                          type="date"
                          id="#completed_on"
                          required
                          value={record.completed_on}
                          onChange={updateRecord}
                          name="completed_on"
                          placeholder="Completed On"
                        />
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={4}>
                      <FormGroup>
                        <label htmlFor="#valid_from">Valid From</label>
                        <FormInput
                          type="date"
                          value={record.valid_from}
                          required
                          onChange={updateRecord}
                          id="#valid_from"
                          name="valid_from"
                          placeholder="Valid From"
                        />
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={4}>
                      <FormGroup>
                        <label htmlFor="#valid_until">Valid Until</label>
                        <FormInput
                          type="date"
                          value={record.valid_until}
                          required
                          onChange={updateRecord}
                          id="#valid_until"
                          name="valid_until"
                          placeholder="Valid Until"
                        />
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={4}>
                      <FormGroup>
                        <label htmlFor="#previous_course_valid_until">
                          Previous Course Valid Until
                        </label>
                        <FormInput
                          id="#previous_course_valid_until"
                          value={record.previous_course_valid_until}
                          onChange={updateRecord}
                          required
                          type="date"
                          name="previous_course_valid_until"
                          placeholder="Previous Course Valid Until"
                        />
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={4}>
                      <FormGroup>
                        <label htmlFor="#status">Status</label>
                        <FormSelect
                          value={record.status}
                          name="status"
                          onChange={updateRecord}
                          required="true"
                        >
                          <option value="" selected disabled>
                            Select Status
                          </option>
                          <option value="Extended refresher period">
                            Extended refresher period
                          </option>
                          <option value="Record will soon be invalid">
                            Record will soon be invalid
                          </option>
                          <option value="Record will soon be invalid">
                            Record will soon be invalid
                          </option>
                          <option value="Record is invalid">
                            Record is invalid
                          </option>
                          <option value="Record is valid">
                            Record is valid
                          </option>
                        </FormSelect>
                      </FormGroup>
                    </Col>
                    <Col className={"mb-5"} sm={12} md={12}>
                      <FormGroup>
                        <button
                          type="submit"
                          className="mt-3"
                          onClick={addRecordToList}
                        >
                          Add Record
                        </button>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              ) : (
                ""
              )}
              {records.length ? (
                <Row className="create-course-div">
                  <Col sm={12}>
                    <button className="create-course">Create Course</button>{" "}
                  </Col>
                </Row>
              ) : (
                ""
              )}
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
}
