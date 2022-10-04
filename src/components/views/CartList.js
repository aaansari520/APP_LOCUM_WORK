import React from "react";
import { connect } from "react-redux";
import { Button, Col, Modal, Row } from "antd";
import * as actionTypes from "../../Redux/Actions/action";
import { Card } from "antd";
import Modal2 from "../../validations/Modal2";
import { Link } from "react-router-dom";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

const { Meta } = Card;

const CartList = ({
  products,
  cart,
  search,
  removeFromCart,
  profile,
  addToCart,
  wish,
  addToWish,
}) => {
  const addToCartFromHome = (product) => {
    if (profile.length === 0) {
      return <Modal2 />;
    } else {
      addToCart(product);
    }
  };

  const success = (product) => {
    Modal.success({
      content: "Want to add item to wishlist? press yes or escape",
      okText: "yes",
      onOk: () => {
        addToWish(product.id);
      },
    });
  };

  return (
    <div>
      <div className="container-fluid">
        <Row
          gutter={[16, 16]}
          className="media"
          style={{
            width: "100%",
            justifyContent: "flex-start",
          }}
        >
          {profile.length === 0 ? (
            <Modal2 />
          ) : search ? (
            products
              ?.filter((prod) => {
                return prod.title.toLowerCase().includes(search.toLowerCase());
              })
              .map((product) => {
                return (
                  <Col span={6} sm={8} xs={8} lg={7} xl={7} key={product.id}>
                    <Card hoverable style={{ width: "100%" }}>
                      {wish?.find((e) => e.id === product.id) ? (
                        <Button
                          className="Hover"
                          style={{ border: "none", color: "red" }}
                        >
                          <HeartFilled />
                        </Button>
                      ) : (
                        <Button
                          className="Hover"
                          style={{ border: "none", color: "blue" }}
                          onClick={() => success(product)}
                        >
                          <HeartOutlined />
                        </Button>
                      )}
                      <div className="productImg">
                        <img src={product.image} alt="example" />
                      </div>
                      <Meta
                        title={product.title}
                        description={product.description?.substring(0, 40)}
                      />

                      <div className="productButt">
                        <Button
                          type="primary"
                          onClick={() => addToCartFromHome(product.id)}
                        >
                          ADD TO CART
                        </Button>

                        <Link to="/checkout" style={{ marginLeft: "10px" }}>
                          {cart.length === 0 ? (
                            <Button type="primary" disabled>
                              Check Out
                            </Button>
                          ) : (
                            <Button type="primary">Check Out</Button>
                          )}
                        </Link>
                      </div>
                    </Card>
                  </Col>
                );
              })
          ) : (
            cart
              ?.filter((prod) => {
                return prod.title.toLowerCase().includes(search.toLowerCase());
              })
              .map((product) => {
                return (
                  <Col
                    span={6}
                    sm={8}
                    xs={8}
                    lg={7}
                    xl={7}
                    // style={{ justifyContent: "" }}
                    key={product.id}
                  >
                    <Card hoverable style={{ width: "100%" }}>
                      <div className="productImg">
                        <img src={product.image} alt="example" />
                      </div>
                      <Meta
                        title={product.title}
                        description={product.description?.substring(0, 40)}
                      />

                      <div className="productButt">
                        <Button
                          type="primary"
                          onClick={() => {
                            removeFromCart(product.id);
                          }}
                          // style={{ color: "red" }}
                        >
                          Remove
                        </Button>

                        <Link to="/checkout" style={{ marginLeft: "10px" }}>
                          <Button type="primary">Check Out</Button>
                        </Link>
                      </div>
                    </Card>
                  </Col>
                );
              })
          )}
        </Row>
      </div>
    </div>
  );
};

const mapStateToProps = (store) => {
  return {
    products: store.products,
    wish: store.wishlist,
    cart: store.cart,
    search: store.searchValue,
    profile: store.profile,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (id) =>
      dispatch({
        type: actionTypes.DELETE_FROM_CART,
        payload: { id: id },
      }),
    addToCart: (id) =>
      dispatch({
        type: actionTypes.ADD_TO_CART,
        payload: { id: id },
      }),
    addToWish: (id) =>
      dispatch({
        type: actionTypes.ADD_TO_WISHLIST,
        payload: { id: id },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartList);
