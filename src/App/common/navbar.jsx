import React from "react";
import { Row, Col, Badge } from "antd";
import { useNavigate } from "react-router-dom";

const Navbar = ({ cartItemCount = 1 }) => {
  const navigate = useNavigate();

  return (
    <div className="navbar-container">
      <Row justify="space-around" align="middle" className="navbar-content">
        <Col
          xs={4}
          sm={4}
          md={3}
          lg={5}
          className="d-flex align-items-center justify-content-between box-1"
        >
          <div className="d-flex align-items-center">
            <img
              src="./src/assets/icons/menu.png"
              alt="Menu Icon"
              className="navbar-icon"
            />
            <h6 className="navbar-text">Menu</h6>
          </div>
          <div className="d-flex align-items-center">
            <img
              src="./src/assets/icons/search.png"
              alt="Search Icon"
              className="navbar-icon"
            />
            <h6 className="navbar-text">Search</h6>
          </div>
        </Col>
        <Col
          xs={4}
          sm={4}
          md={3}
          lg={5}
          className="d-flex align-items-center justify-content-between box-2"
        >
          <div className="d-flex align-items-center">
            <img
              src="./src/assets/icons/profile.png"
              alt="Account Icon"
              className="navbar-icon"
            />
            <h6 className="navbar-text">Account</h6>
          </div>
          <div className="d-flex align-items-center">
            <span
              onClick={() => navigate("/cart")}
              className="cart-icon-wrapper"
            >
              <Badge
                count={cartItemCount}
                size="large"
                style={{
                  backgroundColor: "#FFD700",
                  color: "#ffffff",
                  fontSize: "12px",
                }}
                offset={[-5, 5]}
              >
                <img
                  src="./src/assets/icons/cart.png"
                  alt="Cart Icon"
                  className="navbar-icon"
                />
              </Badge>
            </span>
            <h6 className="navbar-text">Cart</h6>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Navbar;
