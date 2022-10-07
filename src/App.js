import { Button } from "antd";
import "antd/dist/antd.min.css";
import "./App.css";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Cart from "./components/cart/Cart";
import Header from "./components/Header";
import Sign_Up from "./components/LoginForm";
import Sign_In from "./components/Sign_in";
import "react-toastify/dist/ReactToastify.css";
import SharedLayout from "./components/cart/SharedLayout";
import Home from "./components/cart/Home";
import NavBar from "./components/cart/NavBar";

function App() {
  const getData = async () => {
    const data = await axios
      .get("https://dev-api.alldaydr.com")
      .then((data) => console.log("data", data));
  };
  getData();

  return (
    <BrowserRouter>
      <div className="Main">
        <ToastContainer />
        <Header />
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Sign_Up />} />
          <Route exact path="/sign_in" element={<Sign_In />} />
          <Route exact path="/home" element={<Home />} />
          {/* <Route exact path="/home" element={<NavBar />} /> */}
          <Route exact path="/cart" element={<Cart />} />
        </Routes>
        {/* <div style={{ display: "flex", justifyContent: "center" }}>
          <Button type="primary">Try it out</Button>
        </div> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
