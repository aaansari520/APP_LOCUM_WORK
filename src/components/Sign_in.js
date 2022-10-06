import { Button, Checkbox, DatePicker, Form, Input, Select } from "antd";
import React, { useState } from "react";

const Sign_In = () => {
  const [data, setData] = useState([]);
  console.log("whole data", data);
  //   console.log("DOB", JSON.stringify(data.dob));
  //   console.log(localStorage.setItem("data", JSON.stringify(data)));

  return (
    <div style={{ margin: "0 auto", justifyContent: "center" }}>
      <Form
        autoCapitalize="true"
        // autoComplete="off"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        onFinish={(values) => {
          const setYourData = [...data, { ...values }];
          setData(setYourData);
        }}
        style={{ marginTop: "15px" }}
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

        <Form.Item name="role" label="Role">
          <Input placeholder="Type your role"></Input>
        </Form.Item>

        <Form.Item
          name="deviceType"
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
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Sign_In;
