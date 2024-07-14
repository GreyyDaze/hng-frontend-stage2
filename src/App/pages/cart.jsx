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
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";
import Delete from "@images/icons/delete.png";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import axios from "axios";
import {
  InfoCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    incrementItem,
    decrementItem,
    totalPrice,
    clearCart, // Added clearCart function
  } = useCart();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigation = useNavigate();

  useEffect(() => {
    fetchRelatedProducts();
  }, []);

  const fetchRelatedProducts = async () => {
    try {
      const response = await axios.get(
        `/api/products?organization_id=${
          import.meta.env.VITE_ORGANIZATION_ID
        }&reverse_sort=false&page=1&size=4&Appid=${
          import.meta.env.VITE_APP_ID
        }&Apikey=${import.meta.env.VITE_API}`
      );
      setRelatedProducts(response.data.items);
      console.log("Related Products", response.data);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.count, 0);

  const handleIncrement = (productId) => {
    incrementItem(productId);
  };

  const handleDecrement = (productId) => {
    const product = cartItems.find((item) => item.id === productId);

    if (product) {
      if (product.count === 1) {
        notification.open({
          message: "Cannot Decrease Quantity",
          description: `The quantity of ${product.name} is already at its minimum.`,
          type: "warning",
          icon: <ExclamationCircleOutlined className="warning" />,
          duration: 0,
        });
      } else {
        decrementItem(productId);
      }
    }
  };

  const handleRemove = (productId) => {
    const product = cartItems.find((item) => item.id === productId);

    if (product) {
      removeFromCart(productId);
      notification.open({
        message: "Item Removed",
        description: `${product.name} has been removed from your cart.`,
        type: "success",
        icon: <DeleteOutlined className="success" />,
      });
    }
  };

  const handleCheckout = () => {
    if (totalPrice === 0) {
      notification.open({
        message: "Cannot proceed to checkout",
        description: "Add items to your cart to proceed to checkout.",
        type: "warning",
        icon: <ExclamationCircleOutlined className="warning" />,
      });
      console.log("Cannot proceed to checkout");
    } else {
      navigate("/check-out");
    }
  };

  const handleClearCart = () => {
    clearCart();
    notification.open({
      message: "Cart Cleared",
      description: "All items have been removed from your cart.",
      type: "info",
      icon: <InfoCircleOutlined className="info" />,
    });
  };

  const priceFormatter = new Intl.NumberFormat("en-NG", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    currency: "NGN",
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
              <div
                className="cart-header"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Title level={3} className="cart-title">
                  CART ({totalItemCount})
                </Title>
                <Button
                  type="link"
                  icon={<DeleteOutlined />}
                  onClick={handleClearCart}
                  className="clear-cart-btn"
                >
                  Clear All Cart
                </Button>
              </div>
              <Divider />
              {cartItems.map((item, index) => (
                <div key={item.id}>
                  <div className="cart-item">
                    <div className="d-flex">
                      <img
                        src={`https://api.timbu.cloud/images/${item.imageUrl}`}
                        alt={item.name}
                        className="item-image"
                      />
                      <div className="item-details">
                        <Text strong className="item-title">
                          {item.name}
                        </Text>
                        <Text className="item-price">
                          ₦ {priceFormatter.format(item.price * item.count)}
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
                  ₦
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
              CHECKOUT (₦{priceFormatter.format(totalPrice)})
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
          {relatedProducts.map((product) => (
            <Col key={product.id} xs={12} sm={10} md={8} lg={6}>
              <Card
                hoverable
                cover={
                  <img
                    alt={product.name}
                    src={`https://api.timbu.cloud/images/${product.photos?.[0]?.url}`}
                  />
                }
                className="custom-card mt-4"
              >
                <div className="card-content">
                  <div className="product-info">
                    <Text className="product-name">{product.name}</Text>

                    <Text className="product-price mt-3">
                      ₦
                      {priceFormatter.format(
                        product.current_price?.[0]?.NGN?.[0]
                      )}
                    </Text>
                  </div>
                  <div className="product-action">
                    <Button
                      className="add-to-cart-button"
                      onClick={() =>
                        navigation(`/product-detail/${product.id}`)
                      }
                    >
                      View Details
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
