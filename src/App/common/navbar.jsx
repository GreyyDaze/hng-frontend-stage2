import React from "react";
import { Row, Col, Badge } from "antd";
import { useNavigate } from "react-router-dom";
import Menu from "@images/icons/menu.png";
import Search from "@images/icons/search.png";
import Profile from "@images/icons/profile.png";
import Cart from "@images/icons/cart.png";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  // Compute cartItemCount
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.count, 0);

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
            <img src={Menu} alt="Menu Icon" className="navbar-icon" />
            <h6 className="navbar-text">Menu</h6>
          </div>
          <div className="d-flex align-items-center">
            <img src={Search} alt="Search Icon" className="navbar-icon" />
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
            <img src={Profile} alt="Account Icon" className="navbar-icon" />
            <h6 className="navbar-text">Account</h6>
          </div>
          <div className="d-flex align-items-center">
            <span
              onClick={() => navigate("/cart")}
              className="cart-icon-wrapper"
            >
              <Badge
                count={cartItemCount}
                size="small"
                style={{
                  backgroundColor: "#FFD700",
                  color: "#ffffff",
                  fontSize: "10px",
                }}
                offset={[-4, 3]}
              >
                <img src={Cart} alt="Cart Icon" className="navbar-icon" />
              </Badge>
            </span>
            <h6 className="navbar-text">Shop</h6>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Navbar;
