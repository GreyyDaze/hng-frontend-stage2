import React, { useEffect, useState } from "react";
import CompanyLogo from "../common/companyLogo";
import Navbar from "../common/navbar";
import SalesCountdown from "../common/salesCountdown";
import TimbuFooter from "../common/timbuFooter";
import {
  Row,
  Col,
  Card,
  Button,
  Input,
  Typography,
  Divider,
  notification,
} from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import Delete from "@images/icons/delete.png";
import { useNavigate } from "react-router-dom";
import { leatherBags } from "../../utils/data";
import { useCart } from "../../context/CartContext.jsx";
const { Text, Title } = Typography;

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    incrementItem,
    decrementItem,
    addToCart,
    totalPrice,
  } = useCart();
  const [randomProducts, setRandomProducts] = useState([]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  useEffect(() => {
    const shuffled = leatherBags.sort(() => 0.5 - Math.random());
    setRandomProducts(shuffled.slice(0, 4));
  }, []);

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.count, 0);

  const handleIncrement = (productId) => {
    incrementItem(productId);
  };

  const handleDecrement = (productId) => {
    decrementItem(productId);
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleCheckout = () => {
    if (totalPrice === 0) {
      notification.open({
        message: "Cannot proceed to checkout",
        description: "Add items to your cart to proceed to checkout.",
        type: "warning", // This sets the notification type to warning
      });
      console.log("Cannot proceed to checkout");
    } else {
      navigate("/check-out");
    }
  };

  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div>
      <SalesCountdown />
      <CompanyLogo />
      <Navbar />
      <div className="cart-page">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={16}>
            <Card className="cart-items">
              <Title level={3} className="cart-title">
                CART ({totalItemCount})
              </Title>
              <Divider />
              {cartItems.map((item, index) => (
                <div key={item.id}>
                  <div className="cart-item">
                    <div className="d-flex">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="item-image"
                      />
                      <div className="item-details">
                        <Text strong className="item-title">
                          {item.name}
                        </Text>
                        <Text className="item-desc">{item.description}</Text>
                        <Text className="item-price">
                          {/* ${item.price.toFixed(2)} */}$
                          {priceFormatter.format(item.price)}
                        </Text>
                      </div>
                    </div>

                    <div className="quantity-control">
                      <div>
                        <Button
                          type="text"
                          icon={
                            <img
                              src={Delete}
                              alt="Delete"
                              className="delete-btn"
                            />
                          }
                          onClick={() => handleRemove(item.id)}
                        />
                      </div>
                      <div>
                        <Button
                          icon={<MinusOutlined className="icon" />}
                          className="minus-icon"
                          onClick={() => handleDecrement(item.id)}
                        />
                        <Input
                          value={item.count}
                          className="quantity-input"
                          readOnly
                        />
                        <Button
                          icon={<PlusOutlined className="icon" />}
                          className="plus-icon"
                          onClick={() => handleIncrement(item.id)}
                        />
                      </div>
                    </div>
                  </div>
                  {index !== cartItems.length - 1 && <Divider />}
                </div>
              ))}
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card className="cart-summary">
              <Title level={3} className="cart-title">
                CART SUMMARY
              </Title>
              <Divider />

              <div className="summary-item">
                <Text className="subtotal">Subtotal</Text>
                <Text strong className="item-price-total">
                  $
                  {priceFormatter.format(
                    cartItems.reduce(
                      (acc, item) => acc + item.price * item.count,
                      0
                    )
                  )}
                </Text>
              </div>
              <Divider />
              <Text type="secondary" className="delivery-text">
                Delivery requires additional fee{" "}
              </Text>
            </Card>
            <Button
              type="primary"
              block
              className="checkout-btn"
              onClick={handleCheckout}
              // disabled={totalPrice === 0}
            >
              CHECKOUT (${priceFormatter.format(totalPrice)})
            </Button>
            <Text type="secondary" className="terms-text mb-0 pb-0">
              Returns are allowed for ELIGIBLE Products.
            </Text>
            <Text type="secondary" className="terms-text p-0 m-0">
              Terms & Conditions apply.
            </Text>
          </Col>
        </Row>

        <Title level={2} className="related-products-title">
          Related Products
        </Title>

        <Row gutter={[20, 60]} className="related-row leather-row">
          {randomProducts.map((product) => (
            <Col key={product.id} xs={12} sm={10} md={8} lg={6}>
              <Card
                hoverable
                cover={<img alt={product.name} src={product.imageUrl} />}
                className="custom-card mt-4"
              >
                <div className="card-content">
                  <div className="product-info">
                    <Text className="product-name">{product.name}</Text>
                    <Text className="product-description">
                      {product.description}
                    </Text>
                    <Text className="product-price">
                      {/* ${product.price.toFixed(2)} */}$
                      {priceFormatter.format(product.price)}
                    </Text>
                  </div>
                  <div className="product-action">
                    <Button
                      className="add-to-cart-button"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <TimbuFooter />
    </div>
  );
};

export default Cart;
