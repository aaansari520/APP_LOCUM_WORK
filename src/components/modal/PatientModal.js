import { Button, DatePicker, Form, Input, Modal, Select, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addPatients,
  cancle,
  getSurgery,
  reset,
} from "../../Redux/patientSlice";
import { UploadOutlined } from "@ant-design/icons";

const PatientModal = () => {
  const { open, patient } = useSelector((store) => store.patient);
  //   const [searchedPatient, setSearchedPatient] = useState(null);
  var navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = React.createRef();

  const handleCancel = () => {
    dispatch(cancle());
    navigate("/table");
  };

  //   useEffect(() => {
  //     navigate("/table");
  //   }, [patient]);

  //   useEffect(() => {
  //     if (searchedPatient) {
  //       dispatch(getSurgery(searchedPatient));
  //     }
  //   }, [searchedPatient]);

  return (
    <Modal
      open={open}
      title="Add Patient"
      //   onOk={handleOk}
      onCancel={handleCancel}
      footer=""
    >
      <div className="form-Design">
        <Form
          className="Form"
          // autoComplete="off"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 12 }}
          initialValues={{ securityAns: "test", surgery_id: "13052" }}
          onFinish={(values) => {
            dispatch(addPatients(values));
            console.log("Patient Data", values);
            formRef.current.resetFields();
            setTimeout(() => {
              navigate("/table");
            }, 2000);
          }}
          ref={formRef}
          style={{ marginTop: "20px" }}
        >
          <div className="inner">
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                {
                  required: true,
                  message: "This Field is Required!",
                },
                {
                  whitespace: true,
                },
                { min: 3, message: "Name must contain minimum 3 characters" },
              ]}
              hasFeedback
            >
              <Input placeholder="Type your firstName"></Input>
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                {
                  required: true,
                  message: "This Field is Required!",
                },
                {
                  whitespace: true,
                },
                { min: 3, message: "Name must contain minimum 3 characters" },
              ]}
              hasFeedback
            >
              <Input placeholder="Type your lastName"></Input>
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "This Field is Required!",
                },
                { whitespace: true },
                { type: "email", message: "Email is not valid" },
              ]}
              hasFeedback
            >
              <Input placeholder="Type your email" type="email"></Input>
            </Form.Item>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[
                {
                  required: true,
                  message: "This Field is Required!",
                },
              ]}
            >
              <Select placeholder="Gender">
                {["male", "female", "transgender"].map((gender, index) => {
                  return (
                    <Select.Option value={gender} allowClear key={index}>
                      {gender}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                {
                  required: true,
                  message: "This Field is Required!",
                },
                {
                  whitespace: true,
                },
                { min: 13, message: "Phone must contain 13 numbers" },
                { max: 14, message: "Limit exceeded" },
              ]}
              hasFeedback
            >
              <Input placeholder="Type your phone no."></Input>
            </Form.Item>
            <Form.Item name="upload" label="Image">
              <Upload
                action={"https://dev-api.alldaydr.com/api/doctor/patients.json"}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item name="dob" label="DOB" hasFeedback>
              <DatePicker />
            </Form.Item>
            <Form.Item name="addName" label="Add. Name" hasFeedback>
              <Input placeholder="Type your Add. Name"></Input>
            </Form.Item>
            <Form.Item name="addL1" label="Add. Line 1" hasFeedback>
              <Input placeholder="Type your Add. Line 1"></Input>
            </Form.Item>
            <Form.Item name="addL2" label="Add. Line 2" hasFeedback>
              <Input placeholder="Type your Add. Line 2"></Input>
            </Form.Item>
            <Form.Item name="addL3" label="Add. Line 3" hasFeedback>
              <Input placeholder="Type your Add. Line 3"></Input>
            </Form.Item>

            <Form.Item
              name="securityQues"
              label="Security Ques"
              rules={[
                {
                  required: true,
                  message: "This Field is Required!",
                },
              ]}
            >
              <Select placeholder="securityQues">
                {["Mother's Name"].map((ques, index) => {
                  return (
                    <Select.Option value={ques} allowClear key={index}>
                      {ques}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>

            {/* <Form.Item
              name="surgery"
              label="Select Surgery"
              rules={[
                {
                  required: true,
                  message: "This Field is Required!",
                },
              ]}
            >
              <Input.Search
                placeholder="Search patients..."
                onChange={(e) => {
                  const change = e.target.value;
                  setSearchedPatient(change);
                }}
              ></Input.Search>
            </Form.Item> */}

            <Form.Item name="securityAns" label="Security Answer" hasFeedback>
              <Input readOnly></Input>
            </Form.Item>
            <Form.Item name="surgery_id" label="surgery_id" hasFeedback>
              <Input readOnly></Input>
            </Form.Item>
          </div>

          <Form.Item className="form-btn">
            <Button
              block
              type="primary"
              htmlType="submit"
              className="shake-btn"
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default PatientModal;
