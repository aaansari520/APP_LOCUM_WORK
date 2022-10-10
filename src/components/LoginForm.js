import { Button, Checkbox, DatePicker, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { registerUser } from "../Redux/userSlice";

const initialState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  deviceType: "",
  player_id: "",
  password: "",
};

const Sign_Up = () => {
  const { user } = useSelector((store) => store.user);
  const [state, setState] = useState(initialState);
  var navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    console.log("state", state);
    // setFormErrors(validate(state));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(
      registerUser({
        firstName: state.firstName,
        lastName: state.lastName,
        phone: state.phone,
        email: state.email,
        deviceType: state.deviceType,
        player_id: state.player_id,
        password: state.password,
      })
    );
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/verify");
      }, 2000);
    }
  }, [user]);

  return (
    <div className="form-Design">
      {/* <form className="Form">
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            // formErrors={formErrors}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            // formErrors={formErrors}
          />
        </div>
        <div>
          <label htmlFor="firstName">FirstName</label>
          <input
            type="text"
            name="firstName"
            value={state.firstName}
            onChange={handleChange}
            // formErrors={formErrors}
          />
        </div>
        <div>
          <label htmlFor="lastName">LastName</label>
          <input
            type="text"
            name="lastName"
            value={state.lastName}
            onChange={handleChange}
            // formErrors={formErrors}
          />
        </div>

        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            value={state.phone}
            onChange={handleChange}
            // formErrors={formErrors}
          />
        </div>

        <div>
          <label htmlFor="deviceType">DeviceType</label>
          <input
            type="text"
            name="deviceType"
            value={state.deviceType}
            onChange={handleChange}
            // formErrors={formErrors}
          />
        </div>

        <div>
          <label htmlFor="player_id">Player_Id</label>
          <input
            type="text"
            name="player_id"
            value={state.player_id}
            onChange={handleChange}
            // formErrors={formErrors}
          />
        </div>
        <Link to="/home" onClick={handleSubmit}>
          {/* <Button type="submit" className="btn btn-block"> */}
      {/* Sign_Up */}
      {/* </Button> */}
      {/* </Link> */}
      {/* </form>  */}

      <Form
        className="Form"
        // autoComplete="off"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        initialValues={{ role: "doctor" }}
        onFinish={(values) => {
          dispatch(registerUser(values));
        }}
        style={{ marginTop: "20px" }}
      >
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
          <Input placeholder="Type your fullName"></Input>
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
          name="confirmpassword"
          label="Confirm Password"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "This Field is Required!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "Confirm Password is not matching with the Password!"
                );
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Type your Confirm password"></Input.Password>
        </Form.Item>

        <Form.Item name="role" label="Role" hasFeedback>
          <Input readOnly></Input>
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
            Sign_Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Sign_Up;
