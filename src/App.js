import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import SingleItem from "./components/SingleItem/SingleItem";
import Login from "./validation/Register";
import PrivateRoute from "./components/Protected/ProtectedRoutes";
import Checkout from "./components/Checkout/Checkout";
import Thank from "./components/Checkout/Thank";

function App({ current, cart, isLoggedIn }) {
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/" component={Login} />
          <>
            <Navbar />
            <PrivateRoute exact path="/home" component={Products} />
            <PrivateRoute exact path="/cart" component={Cart} />
            <PrivateRoute exact path="/checkout" component={Checkout} />
            <PrivateRoute exact path="/thank" component={Thank} />
            {!current ? (
              <Redirect to="/home" />
            ) : (
              <PrivateRoute exact path="/product/:id" component={SingleItem} />
            )}
          </>
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = (store) => {
  return {
    current: store.currentItem,
    cart: store.cart,
    isLoggedIn: store.isLoggedIn,
  };
};

export default connect(mapStateToProps)(App);
