import React from "react";
import { Card, Row, Col, Button, Typography } from "antd";

const { Text } = Typography;

const LeatherBagsCollection = ({ products }) => {
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
              <Text className="product-name">{product.name}</Text>
              <Text className="product-description">{product.description}</Text>
              <Text className="product-price">${product.price} USD</Text>
              <Button className="add-to-cart-button">Add to Cart</Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default LeatherBagsCollection;
