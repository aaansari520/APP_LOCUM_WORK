import { Button } from "antd";
import React from "react";
import { BackTop } from "antd";

const AppFooter = () => {
  return (
    <div className="container-fluid">
      <div className="footer">
        <div className="logo" style={{ marginTop: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div>
              <i className="fas fa-bolt"></i>
              <a href="#">Tech</a>
            </div>

            <ul
              className="socials"
              style={{ marginBottom: "0", marginTop: "10px" }}
            >
              <li>
                <a target="blank" href="http://www.facebook.com">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a target="blank" href="http://www.twitter.com">
                  <i className="fab fa-twitter" aria-hidden="true"></i>
                </a>
              </li>{" "}
              <li>
                <a target="blank" href="http://www.linkedin.com">
                  <i className="fab fa-linkedin-in" aria-hidden="true"></i>
                </a>
              </li>{" "}
              <li>
                <a target="blank" href="http://www.pinterest.com">
                  <i className="fab fa-pinterest-p" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a target="blank" href="http://www.instagram.com">
                  <i className="fab fa-instagram" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
            <div>
              <BackTop style={{ color: "red" }}>
                <i className="fa-solid fa-arrow-up"></i>
              </BackTop>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "12px",
            }}
          >
            Copyright <i className="fa-solid fa-copyright"></i>, 2022 Tech
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppFooter;
