import "antd/dist/antd.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Sign_Up from "./components/LoginForm";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/cart/NavBar";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoutes/Protected";
import Home from "./components/cart/Home";
import Cart from "./components/cart/Cart";
import { getUserFromLocalStorage } from "./localStorage/LocalStorageData";
import Verify from "./components/Verify";

function App() {
  const { user } = useSelector((store) => store.user);
  getUserFromLocalStorage();
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route exact path="/" element={<Sign_Up />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/verify" element={<Verify />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
