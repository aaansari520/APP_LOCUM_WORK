import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import { connect } from "react-redux";
import { uid } from "uid";
import * as actionTypes from "../Redux/Actions/action";

const Login = ({ handleOk, loading, profileData, addProfileData }) => {
  //   const [data, setData] = useState([]);
  //   console.log("whole data", data);
  //   console.log("DOB", parseInt(data.dob));
  //   console.log(localStorage.setItem("data", JSON.stringify(data)));

  const handleSubmit = (values) => {
    // const setYourData = [...data, { ...values }];
    console.log("valuess...", values);
    addProfileData({ ...values, id: uid() });
    handleOk();
  };

  return (
    <div>
      <Form
        autoCapitalize="true"
        // autoComplete="off"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        onFinish={(values) => handleSubmit(values)}
      >
        {/* <Form.Item>
          <Upload.Dragger
            listType="picture"
            showUploadList=""
            accept=".png,.jpeg,.jpg"
            beforeUpload={(file) => {
              console.log("Uploading", file);
            }}
          >
            Drag Image Here or
            <br />
            <Button>Click Upload</Button>
          </Upload.Dragger>
        </Form.Item> */}
        <Form.Item
          name="fullName"
          label="Full Name"
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
          <Input placeholder="Type your fullName"></Input>
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

        <Form.Item
          name="agreement"
          wrapperCol={{ span: 24 }}
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                      "To proceed, you need to agree with our Terms & Conditions"
                    ),
            },
          ]}
        >
          <Checkbox>
            Agree to our <p>Term's and Conditions</p>
          </Checkbox>
        </Form.Item>
        {/* wrapperCol={{ span: 24 }} */}
        <Form.Item
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStateToProps = (store) => {
  return {
    profileData: store.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProfileData: (data) =>
      dispatch({
        type: actionTypes.ADD_PROFILE_DATA,
        payload: { data: data },
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
