import React from "react";
import { connect } from "react-redux";
import { Button, Col, Row } from "antd";
import * as actionTypes from "../../Redux/Actions/action";
import { Card } from "antd";
import Modal2 from "../../validations/Modal2";
import { Link } from "react-router-dom";

const { Meta } = Card;

const CartList = ({ cart, search, removeFromCart, profile }) => {
  // console.log("Cart wala cart", cart);

  // useEffect(() => {
  //   if (cart?.length === 0) {
  //     return Modal.error({
  //       title: "This is an error message",
  //       content: "some messages...some messages...",
  //     });
  //   }
  // });

  // const error = () => {
  //   return Modal.error({
  //     title: "This is an error message",
  //     content: "some messages...some messages...",
  //   });
  //   setShow(true);
  // };

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
          ) : (
            cart
              ?.filter((prod) =>
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
                          onClick={() => removeFromCart(product.id)}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartList);
