import { Button, Checkbox, DatePicker, Form, Input, Select } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const [state, setState] = useState(initialState);
  // console.log("whole data", state);
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((store) => store.user);

  //   console.log("DOB", JSON.stringify(data.dob));
  //   console.log(localStorage.setItem("data", JSON.stringify(data)));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    console.log("state", state);
    // setFormErrors(validate(state));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setState({ ...state });
    const formData = new FormData();

    console.log("Submit per data", state);
    formData.set("user[first_name]", state.firstName);
    formData.set("user[last_name]", state.lastName);
    formData.set("user[email]", state.email);
    formData.set("user[phone]", state.phone);
    formData.set("user[password]", state.password);
    formData.set("device_detail[device_type]", state.deviceType);
    formData.set("device_detail[player_id]", state.player_id);

    console.log("Login me frm Data", Object.fromEntries(formData));
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

  return (
    <div>
      <form className="Form">
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
        <div>
          <button
            type="submit"
            className="btn btn-block"
            onClick={handleSubmit}
          >
            Sign_Up
          </button>
        </div>
      </form>

      {/* <Form
        className="Form"
        autoCapitalize="true"
        // autoComplete="off"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        onFinish={(values) => {
          const name = Object.keys(values);
          const value = Object.values(values);
          const entries = Object.entries(values);
          // console.log("keys in Name var", name);
          // console.log("value in Value var", value);
          // console.log("entries in Value var", entries);
          // console.log("kya milri values", values);
          // console.log("KEys mili", Object.keys(values));
          setState({ ...state, ...values });
          console.log("Datat check kar", state);
          const setYourData = [{ ...values }];
          setState(setYourData);
          const { email, firstName, lastName, password, phone, player_id } =
            state;
          // const formData = new FormData();
          formData.append(name, values);
          dispatch(
            registerUser(
              formData
              //   {
              //   // email,
              //   // firstName,
              //   // lastName,
              //   // password,
              //   // phone,
              //   // player_id,
              //   values,
              // }
            )
          );
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
            { min: 10, message: "Name must contain 10 characters" },
          ]}
          hasFeedback
        >
          <Input placeholder="Type your fullName"></Input>
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
      </Form> */}
    </div>
  );
};

export default Sign_Up;
