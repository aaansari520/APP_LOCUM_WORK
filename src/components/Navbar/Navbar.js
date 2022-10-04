import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { connect } from "react-redux";
import "./Navbar.css";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  tool: {
    position: "relative",
  },
}));
function Navbar2({ cart }) {
  const classes = useStyles();
  const [cartCount, setCartCount] = useState();

  console.log("cart.", cart);
  useEffect(() => {
    let count = 0;
    cart.forEach((item) => {
      console.log("Item", item.qty);
      count += parseInt(item.qty);
    });

    setCartCount(count);
  }, [cart, cartCount]);

  const logout = () => {
    localStorage.removeItem("authToken");
  };

  return (
    <div className={classes.root}>
      <AppBar style={{ backgroundColor: "#badc58" }} position="static">
        <Toolbar className={classes.tool}>
          <Typography variant="h6" className={classes.title}>
            <Link to="/home" style={{ color: "#2f3542" }}>
              Redux Shopping Cart
            </Link>
          </Typography>
          <Link to="/cart" style={{ color: "#2f3542" }}>
            <Button color="inherit">
              YourCart
              <ShoppingCartIcon
                style={{ marginLeft: "12%", marginRight: "1%" }}
              />
              <span className="cartNumber" style={{}}>
                {cart.length}
              </span>
            </Button>
          </Link>

          <Link to="/" onClick={logout} style={{ color: "#eb3734" }}>
            <Button color="inherit">Logout</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (store) => {
  return {
    cart: store.cart,
  };
};

export default connect(mapStateToProps)(Navbar2);
