import React, { useState } from "react";
import Image from "../../assets/images/cart.png";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import {
  CloseOutlined,
  LoginOutlined,
  LogoutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import * as actionTypes from "../../Redux/Actions/action";
import { Input } from "antd";

const AppHeader = ({
  cart,
  search,
  profile,
  deleteFromProfile,
  removeFromCart,
  removeFromWish,
}) => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  // const submitHandler = (e, val) => {
  //   e.preventDefault();

  //   console.log("value Of input", val);

  //   search(val);
  //   setValue("");
  // };

  const removing = () => {
    deleteFromProfile();
    removeFromCart();
    removeFromWish();
  };

  const searchHandler = (e, val) => {
    e.preventDefault();
    console.log("value Of input", val);
    setValue(val);
    search(val);
  };
  // const deleteFromProfile = () => {};

  return (
    <div className="container-fluid">
      <div className="header">
        <div className="logo">
          <Link to="/home">
            <img src={Image} alt="logo" />
          </Link>
        </div>
        <div className="searchWrapper">
          <form
            // onSubmit={(e) => submitHandler(e, value)}
            className="searchForm"
          >
            <Input
              placeholder="Search here..."
              value={value}
              // onChange={(e) => setValue(e.target.value)}
              onChange={(e) => setValue(e.target.value)}
              onKeyUp={(e) => searchHandler(e, value)}
            />
            {/* <button className="searchButton" type="submit"> */}
            {value && (
              <button
                className="searchButton"
                type="button"
                onClick={() => setValue("")}
              >
                {/* <SearchOutlined /> */}
                <CloseOutlined />
              </button>
            )}
          </form>
          <div className="underline"></div>
        </div>

        {profile.length <= 0 ? (
          <div className="logo">
            <Link to="/" className="cartButton">
              <LoginOutlined style={{ color: "red" }} />
            </Link>
          </div>
        ) : (
          <div className="logo">
            <Link to="/" onClick={() => removing()} className="cartButton">
              {/* <Button > */}
              <LogoutOutlined style={{ color: "red" }} />
              {/* </Button> */}
            </Link>
          </div>
        )}

        <div className="logo">
          <Link to="/cartlist" className="cartButton">
            <i
              className="fa-solid fa-cart-shopping"
              style={{ color: "yellow" }}
            ></i>
            <span className="cartNumber">{cart.length}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (store) => {
  return {
    cart: store.cart,
    profile: store.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    search: (value) =>
      dispatch({
        type: actionTypes.APPLY_SEARCH,
        payload: { value: value },
      }),
    deleteFromProfile: () =>
      dispatch({
        type: actionTypes.DELETE_FROM_PROFILE,
        // payload: { id: id },
      }),
    removeFromWish: () =>
      dispatch({
        type: actionTypes.EMPTY_WISH,
      }),
    removeFromCart: () =>
      dispatch({
        type: actionTypes.EMPTY_CART,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
