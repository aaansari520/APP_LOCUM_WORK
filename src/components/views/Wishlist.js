import React from "react";
import { Col, Row, Button, Modal } from "antd";
import { Card } from "antd";
import { connect } from "react-redux";
import * as actionTypes from "../../Redux/Actions/action";
import Modal2 from "../../validations/Modal2";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

const { Meta } = Card;

const Wishlist = ({
  wish,
  removeFromWish,
  profile,
  search,
  products,
  addToWish,
  addToCart,
  cart,
}) => {
  const success = (product) => {
    Modal.success({
      content: "Want to remove item from wishlist?",
      okText: "yes",
      onOk: () => {
        removeFromWish(product.id);
      },
    });
  };

  const success1 = (product) => {
    Modal.success({
      content: "Want to add item to wishlist? press yes or escape",
      okText: "yes",
      onOk: () => {
        addToWish(product.id);
      },
    });
  };

  const addToCartFromHome = (product) => {
    if (profile.length === 0) {
      return <Modal2 />;
    } else {
      addToCart(product);
    }
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
              ?.filter((prod) =>
                prod.title.toLowerCase().includes(search.toLowerCase())
              )
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
                          onClick={() => success1(product)}
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
                      </div>
                    </Card>
                  </Col>
                );
              })
          ) : (
            wish
              ?.filter((prod) =>
                prod.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((product) => {
                return (
                  <Col span={6} sm={8} xs={8} lg={7} xl={7} key={product.id}>
                    <Card hoverable style={{ width: "100%" }}>
                      <Button
                        className="Hover"
                        style={{ border: "none", color: "red" }}
                        // onClick={() => removeFromWish(product.id)}
                        onClick={() => success(product)}
                      >
                        <i className="fa fa-heart"></i>
                      </Button>

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
    wish: store.wishlist,
    profile: store.profile,
    search: store.searchValue,
    products: store.products,
    cart: store.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromWish: (id) =>
      dispatch({
        type: actionTypes.DELETE_FROM_WISHLIST,
        payload: { id: id },
      }),
    addToWish: (id) =>
      dispatch({
        type: actionTypes.ADD_TO_WISHLIST,
        payload: { id: id },
      }),
    addToCart: (id) =>
      dispatch({
        type: actionTypes.ADD_TO_CART,
        payload: { id: id },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
