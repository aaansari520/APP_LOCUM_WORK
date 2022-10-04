import React, { useState } from "react";
import styles from "./SingleItem.css";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import * as actionTypes from "../redux/action";

const SingleItem = ({ current, addToCart, adjustQty }) => {
  const [input, setInput] = useState(current.qty);

  console.log("VIEW WALA INPUT", input);

  const onChangeHandler = (e) => {
    if (e.target.value > 0) {
      setInput(e.target.value);
      adjustQty(current.id, e.target.value);
    }
  };

  return (
    <div className="s-container">
      <div className="img-container">
        <img className="img" src={current.image} alt={current.title} />
      </div>
      <div className="detailss">
        <h1 className="p-name">{current.title}</h1>
        <p style={{ color: "#d63031", marginBottom: "5%" }}>
          <span style={{ color: "grey" }}>M.R.P.</span>&nbsp; ₹ {current.price}
        </p>
        <h4 style={{ color: "#2d3436", marginBottom: "4%" }}>Description</h4>
        <div className="itemQuantity">
          <label htmlFor="qty">Qty</label>
          <input
            // min="1"
            type="number"
            id="qty"
            name="qty"
            value={input}
            onChange={onChangeHandler}
          />
        </div>
        <p className="description">{current.description}</p>

        <Button
          style={{ backgroundColor: "#e67e22", marginTop: "5%" }}
          onClick={() => addToCart(current.id)}
          className={styles.details__addBtn}
        >
          <ShoppingCartOutlinedIcon />
          &nbsp; Add To Cart
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (store) => {
  return {
    current: store.currentItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) =>
      dispatch({ type: actionTypes.ADD_TO_CART, payload: { id } }),
    adjustQty: (id, qty) =>
      dispatch({ type: actionTypes.UPDATE_QTY, payload: { id: id, qty: qty } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem);
