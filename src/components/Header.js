import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          The User Authentication App
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Sign_Up
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Register
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
