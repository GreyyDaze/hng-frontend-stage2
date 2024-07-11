import React from "react";
import { Card, Row, Col, Button, Typography, notification } from "antd";
import { useCart } from "../../../context/CartContext.jsx";

const { Text } = Typography;

const LeatherBagsCollection = ({ products }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    notification.open({
      message: "Item Added to Cart",
      description: `${product.name} has been added to your cart.`,
      type: "success",
    });
  };

  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="leather-collection-container">
      <Row gutter={[20, 60]} className="leather-row">
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={10} md={8} lg={6}>
            <Card
              hoverable
              cover={<img alt={product.name} src={product.imageUrl} />}
              className="custom-card"
            >
              <div className="card-content">
                <div className="product-info">
                  <Text className="product-name">{product.name}</Text>
                  <Text className="product-description">
                    {product.description}
                  </Text>
                  <Text className="product-price">
                    ${priceFormatter.format(product.price)}
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
  );
};

export default LeatherBagsCollection;
