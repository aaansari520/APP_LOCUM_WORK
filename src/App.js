import "antd/dist/antd.min.css";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SignUp from "./components/LoginForm";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/cart/NavBar";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoutes/Protected";
import Home from "./components/cart/Home";
import Cart from "./components/cart/Cart";
import Verify from "./components/Verify";
import SignIn from "./components/Sign_in";

import PatientTable from "./components/table/Table";

function App() {
  const { showNav, user, auth } = useSelector((store) => store.user);

  return (
    <BrowserRouter>
      {showNav && <NavBar />}
      <Routes>
        <Route
          exact
          path="/"
          element={auth ? <Navigate to="/home" /> : <SignUp />}
        />
        <Route
          exact
          path="/sign_in"
          element={auth ? <Navigate to="/home" /> : <SignIn />}
        />
        <Route element={<ProtectedRoute />}>
          <Route
            exact
            path="/verify"
            element={auth ? <Navigate to="/home" /> : <Verify />}
          />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/table" element={<PatientTable />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
