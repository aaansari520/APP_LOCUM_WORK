import { Button, Checkbox, DatePicker, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Redux/userSlice";

const Sign_In = () => {
  const { user } = useSelector((store) => store.user);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  var navigate = useNavigate();
  console.log("whole data", data);
  //   console.log("DOB", JSON.stringify(data.dob));
  //   console.log(localStorage.setItem("data", JSON.stringify(data)));

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    }
  }, [user]);

  return (
    <div className="form-Design">
      <Form
        className="Form"
        autoCapitalize="true"
        // autoComplete="off"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        onFinish={(values) => {
          dispatch(loginUser(values));
        }}
        style={{ marginTop: "20px" }}
      >
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
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "This Field is Required!",
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Type your password"></Input.Password>
        </Form.Item>

        {/* <Form.Item name="role" label="Role">
          <Input placeholder="Type your role"></Input>
        </Form.Item> */}

        <Form.Item
          name="device_type"
          label="DeviceType"
          rules={[
            {
              required: true,
              message: "This Field is Required!",
            },
            { type: "text" },
          ]}
          hasFeedback
        >
          <Input placeholder="Type your deviceType"></Input>
        </Form.Item>

        <Form.Item
          name="player_id"
          label="Player_Id"
          rules={[
            {
              required: true,
              message: "This Field is Required!",
            },
            { type: "text" },
          ]}
          hasFeedback
        >
          <Input placeholder="Type your player_id"></Input>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button block type="primary" htmlType="submit">
            Sign_In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Sign_In;
