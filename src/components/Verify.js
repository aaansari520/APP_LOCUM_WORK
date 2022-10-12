import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyUser } from "../Redux/userSlice";

const Verify = () => {
  const { user, auth } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  var navigate = useNavigate();

  // window.addEventListener("popstate", (event) => {
  //   console.log("jhfhd");
  //   return false;
  // });

  useEffect(() => {
    if (auth) {
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    }
  }, [auth]);

  // const navigating = () => {
  //   if (auth) {
  //     navigate("/home");
  //   }
  // };

  return (
    // <div className="home-container">
    <div className="form-Design signinForm">
      <Form
        className="Form"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        initialValues={{
          phone: user.phone,
          role: user.role,
        }}
        onFinish={(values) => {
          console.log("Verify me otp", values);
          dispatch(verifyUser(values));
        }}
      >
        <Form.Item
          label="Enter OTP"
          name="otp"
          rules={[
            {
              required: true,
              message: "This field is required!",
            },
          ]}
        >
          <Input></Input>
        </Form.Item>

        <Form.Item label="Phone No." name="phone">
          <Input readOnly></Input>
        </Form.Item>

        <Form.Item label="Role" name="role">
          <Input readOnly></Input>
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 12 }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{ padding: "5px 50px" }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
    // </div>
  );
};

export default Verify;
