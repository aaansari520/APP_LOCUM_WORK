import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Redux/userSlice";

const SignIn = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  var navigate = useNavigate();
  const formRef = React.createRef();

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/verify");
      }, 2000);
    }
  }, [user]);

  // useEffect(() => {
  //   if (user) {
  //     setTimeout(() => {
  //       navigate("/home");
  //     }, 2000);
  //   }
  // }, [user]);

  return (
    <div className="form-Design signinForm">
      <Form
        className="Form"
        autoCapitalize="true"
        // autoComplete="off"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        onFinish={(values) => {
          dispatch(loginUser(values));
          formRef.current.resetFields();
        }}
        ref={formRef}
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
            {
              // type: "regexp", ye use karneki zrurat nahi hai
              pattern: new RegExp(
                "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
              ),
              message: "Pattern is not matching the requirement",
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Type your password"></Input.Password>
        </Form.Item>

        <Form.Item
          name="device_type"
          label="Device Type"
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
          label="Player Id"
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
          <Button
            block
            type="primary"
            htmlType="submit"
            style={{ padding: "5px 50px" }}
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
