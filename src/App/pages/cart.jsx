import React, { useEffect, useState } from "react";
import CompanyLogo from "../common/companyLogo";
import Navbar from "../common/navbar";
import SalesCountdown from "../common/salesCountdown";
import TimbuFooter from "../common/timbuFooter.jsx";
import { Row, Col, Card, Button, Input, Typography, Divider } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { leatherBags } from "../../utils/data.js";

import Image1 from "@images/images/collection-image-1.png"; 
const { Text, Title } = Typography;

const Cart = () => {
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const shuffled = leatherBags.sort(() => 0.5 - Math.random());
    setRandomProducts(shuffled.slice(0, 4));
  }, []);

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
                CART (1)
              </Title>
              <Divider />
              <div className="cart-item">
                <div className="d-flex">
                  <img
                    src={Image1}
                    alt="Dolce & Gabbana Bag"
                    className="item-image"
                  />
                  <div className="item-details">
                    <Text strong className="item-title">
                      Dolce & Gabbana | Casual Style Calfskin 2WAY
                    </Text>
                    <Text className="item-desc">Plain Leather Party Style</Text>
                    <Text className="item-price">$1,400.00 USD</Text>
                  </div>
                </div>

                <div className="quantity-control">
                  <div>
                    <Button
                      type="text"
                      icon={
                        <img
                          src="./src/assets/icons/delete.png"
                          alt="icon"
                          className="delete-btn"
                        />
                      }
                    />
                  </div>
                  <div>
                    <Button icon={<MinusOutlined />} className="minus-icon" />
                    <Input value="1" className="quantity-input" />
                    <Button icon={<PlusOutlined />} className="plus-icon" />
                  </div>
                </div>
              </div>
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
                  $1,400.00
                </Text>
              </div>
              <Divider />
              <Text type="secondary" className="delivery-text">
                Delivery charges calculated at checkout
              </Text>
              <Button type="primary" block className="checkout-btn">
                CHECKOUT ($1,400.00)
              </Button>
            </Card>
            <Text type="secondary" className="terms-text mb-0 pb-0">
              Returns allowed are allowed for ELIGIBLE Products.
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
                className="custom-card"
              >
                <Text className="product-name">{product.name}</Text>
                <Text className="product-description">
                  {product.description}
                </Text>
                <Text className="product-price">${product.price} USD</Text>
                <Button className="add-to-cart-button">Add to Cart</Button>
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
