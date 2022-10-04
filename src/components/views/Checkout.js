import React, { useEffect, useState } from "react";

import { Button, Checkbox, Col, Form, Input, Row, Table } from "antd";
import { connect } from "react-redux";

const Checkout = ({ profile, cart }) => {
  const [total, setTotal] = useState();

  const objName = profile.map((name) => name.fullName).toString();
  const objEmail = profile.map((name) => name.email).toString();

  useEffect(() => {
    setTotal(
      cart.reduce(
        (accu, curr) => accu + Number(curr.price.toFixed().toString()),
        0
      )
    );
  }, [cart]);
  const totalObj = {
    title: "Grand total",
    price: total,
  };
  console.log(
    "Profile.objName",
    // profile.map((name) => name.fullName)
    objEmail
  );

  console.log("Cart data in chk", [...cart, totalObj]);

  const column = [
    {
      title: "Name",
      dataIndex: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <Row gutter={[16, 16]}>
        <Col span={14}>
          <div id="contact" className="block contactBlock">
            <div className="container-fluid">
              <div className="titleHolder">
                <h3>Get In Touch</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ipsum, dignissimos.
                </p>
              </div>
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{ fullName: objName, email: objEmail }}
                //   onFinish={onFinish}
                style={{ width: "70%", margin: "auto" }}
              >
                <Form.Item
                  name="fullName"
                  // rules={[{ required: true, message: "Please input your fullname!" }]}
                >
                  <Input
                    prefix={<i className="fa fa-user" aria-hidden="true"></i>}
                    placeholder="Full Name"
                    //   value={objName}
                    //   onChange={()=> }
                    readOnly
                  ></Input>
                </Form.Item>
                <Form.Item name="email">
                  <Input
                    prefix={
                      <i className="fa fa-envelope" aria-hidden="true"></i>
                    }
                    placeholder="Email"
                    readOnly
                  />
                </Form.Item>

                <Form.Item
                  name="address"
                  rules={[
                    { required: true, message: "Please input your Address!" },
                  ]}
                >
                  <Input
                    prefix={<i className="fa-solid fa-house"></i>}
                    placeholder="Address"
                  />
                </Form.Item>

                <Form.Item
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    prefix={<i className="fa fa-phone" aria-hidden="true"></i>}
                    placeholder="Phone"
                  />
                </Form.Item>
                {/* <Form.Item> */}
                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  noStyle
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
                  <Checkbox style={{ marginBottom: "20px" }}>
                    I agree with the term's & Conditions
                  </Checkbox>
                </Form.Item>

                {/* <a className="login-form-forgot" href="">
              Forgot password
            </a> */}
                {/* </Form.Item> */}

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    style={{
                      margin: "auto",
                      width: "50%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    Submit
                  </Button>
                  {/* Or <a href="">register now!</a> */}
                </Form.Item>
              </Form>
            </div>
          </div>
        </Col>
        <Col span={10}>
          <div id="contact" className="block contactBlock">
            <div className="container-fluid">
              <div className="titleHolder">
                <h3>Products Details</h3>
                <p>This is information table of your products</p>
              </div>
              <Table
                dataSource={[...cart, totalObj]}
                pagination={false}
                columns={column}
              ></Table>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (store) => {
  return {
    products: store.products,
    cart: store.cart,
    profile: store.profile,
    wish: store.wishlist,
    search: store.searchValue,
  };
};

export default connect(mapStateToProps)(Checkout);
