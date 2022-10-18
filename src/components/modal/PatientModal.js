import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Upload,
  Spin,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addPatients,
  cancle,
  getSurgery,
  removeSurgery,
  reset,
  updateId,
} from "../../Redux/patientSlice";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const PatientModal = () => {
  const { open, patient, surgery } = useSelector((store) => store.patient);
  const [searchedSurgery, setSearchedSurgery] = useState(null);

  var navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = React.createRef();
  const firstUpdate = useRef(true);

  const handleCancel = () => {
    dispatch(cancle());
    navigate("/table");
  };
  // console.log("gettingID", getId);

  const gettingID = (id) => {
    dispatch(updateId(id));
    console.log("gettingID", id);
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  //   useEffect(() => {
  //     navigate("/table");
  //   }, [patient]);

  // useEffect(() => {
  //   if (!getId) {
  //     setSurID(1);
  //   } else if (getId) {
  //     setSurID(getId);
  //   }
  // }, [getId]);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      console.log("stop");
      if (firstUpdate.current) {
        firstUpdate.current = false;
      } else {
        if (searchedSurgery) {
          dispatch(getSurgery(searchedSurgery));
        }
      }
      if (!searchedSurgery) {
        dispatch(removeSurgery());
      }
    }, 2000);

    return () => clearTimeout(delaySearch);
  }, [searchedSurgery]);

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
          // initialValues={{
          //   surgery_id: surID,
          // }}
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
                // action={"https://dev-api.alldaydr.com/api/doctor/patients.json"}
                customRequest={dummyRequest}
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
                {["Mother's Name", "School Name", "College Name"].map(
                  (ques, index) => {
                    return (
                      <Select.Option value={ques} allowClear key={index}>
                        {ques}
                      </Select.Option>
                    );
                  }
                )}
              </Select>
            </Form.Item>

            <Form.Item
              name="surgery_id"
              label="Select Surgery"
              rules={[
                {
                  required: true,
                  message: "This Field is Required!",
                },
              ]}
            >
              <Select
                showSearch
                filterOption={false}
                onSearch={(e) => {
                  setSearchedSurgery(e);

                  console.log("setSearchedSurgery", e);
                }}
                onSelect={(sur) => {
                  // setSurID(sur.id);
                  console.log("Chalas Kya");
                }}
                // setSurID(e.target.id);
                onChange={function (e) {
                  console.log(this);
                  console.log("shdshds", e);
                  // setSurgeryValue();
                  gettingID(e);
                }}
              >
                {surgery?.map((sur) => {
                  return (
                    <Select.Option value={sur.id} allowClear key={sur.id}>
                      {sur.practice_name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item name="securityAns" label="Security Answer" hasFeedback>
              <Input></Input>
            </Form.Item>
            {/* <Form.Item name="surgery_id" label="Surgery_id" hasFeedback>
              {getId ? <Input value={getId} readOnly></Input> : ""}
            </Form.Item> */}
          </div>

          <Form.Item className="form-btn">
            <Button
              block
              type="primary"
              htmlType="submit"
              className="shake-btn"
            >
              Add Patient
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default PatientModal;
