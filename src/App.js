import "./App.css";

import "antd/dist/antd.min.css";
import { Route, Routes } from "react-router-dom";
import {
  Wishlist,
  Home,
  Profile,
  SideBarMenu,
  Cartlist,
} from "./components/views";
import { Layout } from "antd";
import AppHeader from "./components/common/Header";
import { useEffect } from "react";
import { connect } from "react-redux";

import Modal1 from "./validations/Modal1";

import Checkout from "./components/views/Checkout";

const { Header, Content, Sider } = Layout;

const App = ({ cart, wish, profile }) => {
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("wish", JSON.stringify(wish));
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [cart, wish, profile]);

  return (
    <Layout>
      <Header style={{ backgroundColor: "black", height: "80px" }}>
        <AppHeader />
      </Header>
      <div style={{ display: "flex", width: "100%" }}>
        <Sider style={{ position: "fixed", top: "100px", left: "0" }}>
          <SideBarMenu />
        </Sider>
        <Layout style={{ margin: "20px 20px", paddingLeft: "200px" }}>
          <Content
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "80px",
            }}
          >
            <Content1 profile={profile} />
          </Content>
        </Layout>
      </div>
    </Layout>
  );
};

const Content1 = (profile) => {
  console.log("Checing Profile", profile);
  return (
    <Routes>
      <Route path="/" element={<Modal1 />} />
      <Route path="/home" element={<Home />} />

      <Route exact path="/wishlist" element={<Wishlist />} />
      <Route exact path="/cartlist" element={<Cartlist />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/checkout" element={<Checkout />} />
    </Routes>
  );
};

const mapStateToProps = (store) => {
  return {
    cart: store.cart,
    wish: store.wishlist,
    profile: store.profile,
  };
};

export default connect(mapStateToProps)(App);
