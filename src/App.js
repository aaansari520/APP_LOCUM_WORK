import "antd/dist/antd.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SignUp from "./components/LoginForm";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/cart/NavBar";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoutes/Protected";
import Home from "./components/cart/Home";
import Cart from "./components/cart/Cart";
import { getUserFromLocalStorage } from "./localStorage/LocalStorageData";
import Verify from "./components/Verify";
import SignIn from "./components/Sign_in";

import PatientTable from "./components/table/Table";
import { Modal } from "antd";

function App() {
  const { showNav, showPatient } = useSelector((store) => store.user);
  getUserFromLocalStorage();
  return (
    <BrowserRouter>
      {showNav && <NavBar />}
      <Routes>
        <Route exact path="/" element={<SignUp />} />
        <Route exact path="/sign_in" element={<SignIn />} />
        <Route element={<ProtectedRoute />}>
          {showPatient ? (
            <Route exact path="/table" element={<PatientTable />} />
          ) : (
            "Please verify you self..."
          )}
          <Route exact path="/verify" element={<Verify />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/cart" element={<Cart />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
