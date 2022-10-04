import React from "react";
import { Col, Row, Button, Modal } from "antd";
import { Card } from "antd";
import { connect } from "react-redux";
import * as actionTypes from "../../Redux/Actions/action";
import Modal2 from "../../validations/Modal2";
import { Link } from "react-router-dom";

const { Meta } = Card;

const Wishlist = ({ wish, removeFromWish, profile, search }) => {
  // warning;
  const success = (product) => {
    Modal.success({
      content: "Want to remove item from wishlist?",
      okText: "yes",
      onOk: () => {
        removeFromWish(product.id);
      },
    });
  };

  return (
    <div
    // className="block featureBlock bgGrey"
    // style={{ backgroundColor: "#d0dbd6" }}
    >
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
                      {/* <div className="hide">
                    <p>removeFromWishList</p>
                  </div> */}
                      <div className="productImg">
                        <img src={product.image} alt="example" />
                      </div>
                      <Meta
                        title={product.title}
                        description={product.description?.substring(0, 40)}
                      />

                      <div className="productButt">
                        <Link to="/checkout">
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
    wish: store.wishlist,
    profile: store.profile,
    search: store.searchValue,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromWish: (id) =>
      dispatch({
        type: actionTypes.DELETE_FROM_WISHLIST,
        payload: { id: id },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
