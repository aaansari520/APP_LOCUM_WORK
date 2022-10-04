import React from "react";
import { Button, Col, Row, Modal } from "antd";
import { Card } from "antd";
import { connect } from "react-redux";

import * as actionTypes from "../../Redux/Actions/action";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import Modal2 from "../../validations/Modal2";

const { Meta } = Card;

const Home = ({
  products,
  cart,
  wish,
  addToCart,

  addToWish,
  search,
  profile,
}) => {
  console.log("HomeProd", products);

  const success = (product) => {
    if (profile.length === 0) {
      return <Modal2 />;
    } else {
      Modal.success({
        content: "Want to add item to wishlist? press yes or escape",
        okText: "yes",
        onOk: () => {
          addToWish(product.id);
        },
      });
    }
  };

  const addToCartFromHome = (product) => {
    if (profile.length === 0) {
      return <Modal2 />;
    } else {
      addToCart(product);
    }
  };

  // console.log(
  //   "filtered Array...",
  //   products.filter((prod) =>
  //     prod.title.toLowerCase().includes(search.toLowerCase())
  //   )
  // );

  return (
    <div>
      <div className="container-fluid">
        <Row
          gutter={[16, 16]}
          className="media"
          style={{
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          {products
            .filter((prod) =>
              prod.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((product) => {
              return (
                <Col
                  span={6}
                  sm={8}
                  xs={8}
                  lg={7}
                  xl={7}
                  style={{ display: "flex", justifyContent: "center" }}
                  key={product.id}
                >
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
                      description={product.description.slice(0, 25)}
                      className="truncate-1"
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
            })}
        </Row>
      </div>
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
const mapDispatchToProps = (dispatch) => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
