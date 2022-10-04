import { Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

import "./Register.css";

import profile from "./image/a.png";

const Login = ({ isLoggedIn }) => {
  const history = useHistory();
  const input = {
    email: "",
    password: "",
  };

  const data = {
    email: "admin@gmail.com",
    password: "adminuser",
  };

  const LogInHandler = (values) => {
    const { email, password } = values;
    if (data.email === email && data.password === password) {
      localStorage.setItem("authToken", "token123");
      history.push("/home");
    } else {
      console.log("Invalid Email & Password!");
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("invalid email !")
      .required("please enter email id."),
    password: Yup.string()
      .required("please enter password.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });

  return (
    <Formik
      initialValues={input}
      onSubmit={LogInHandler}
      validationSchema={validationSchema}
    >
      {({ values, handleChange, handleSubmit, errors, touched }) => {
        return (
          <Form>
            <div className="main">
              <div className="sub-main">
                <div>
                  <div className="imgs">
                    <div className="container-image">
                      <img src={profile} alt="profile" className="profile" />
                    </div>
                  </div>
                  <div>
                    <h1>Login Page</h1>
                    <div className="second-input">
                      <input
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        name="email"
                        classNameName="name"
                        placeholder="Enter Your Email"
                      />

                      <div className="text-danger">
                        {touched.email && errors.email}
                      </div>
                    </div>
                    <div className="second-input">
                      <input
                        type="password"
                        placeholder="Enter Your Password"
                        value={values.password}
                        onChange={handleChange}
                        className="name"
                        name="password"
                      />

                      <div className="text-danger">
                        {touched.password && errors.password}
                      </div>
                    </div>
                    <div className="login-button">
                      <button onClick={handleSubmit} type="button">
                        Login
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

const mapStateToProps = (store) => {
  return {
    isLoggedIn: store.isLoggedIn,
  };
};

export default Login;
