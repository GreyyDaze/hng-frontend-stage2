import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CompanyLogo from "../common/companyLogo";
import Navbar from "../common/navbar";
import SalesCountdown from "../common/salesCountdown";
import TimbuFooter from "../common/timbuFooter";
import {
  Card,
  Typography,
  Row,
  Col,
  Carousel,
  Button,
  InputNumber,
  notification,
  Spin,
} from "antd";
import { ShoppingCartOutlined, CheckCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { useCart } from "../../context/CartContext";


const { Title, Text, Paragraph } = Typography;

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [api, contextHolder] = notification.useNotification();

  const handleAddToCart = (product) => {
    addToCart(product);
    api.open({
      message: "Item Added to Cart",
      description: `${product.name} has been added to your cart.`,
      icon: <CheckCircleOutlined className="success" />,
      type: "success",
    });
  };

  const priceFormatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://timbu-get-single-product.reavdev.workers.dev/${id}?organization_id=${
            import.meta.env.VITE_ORGANIZATION_ID
          }&Appid=${import.meta.env.VITE_APP_ID}&Apikey=${
            import.meta.env.VITE_API
          }`
        );
        setProduct(response.data);
        console.log("Product fetched:", response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-spinner">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      {contextHolder}

      <SalesCountdown />
      <CompanyLogo />
      <Navbar />

      <div className="container">
        <Card bordered={false} className="product-card">
          <Row gutter={[32, 32]}>
            <Col xs={24} md={12}>
              {product && product.photos && product.photos.length > 0 ? (
                <Carousel autoplay className="product-carousel">
                  {product.photos.map((image, index) => (
                    <div key={index}>
                      <img
                        src={`https://api.timbu.cloud/images/${image.url}`}
                        alt={`Product ${index + 1}`}
                        className="product-image"
                      />
                    </div>
                  ))}
                </Carousel>
              ) : (
                <div>No images available</div>
              )}
            </Col>
            <Col xs={24} md={12}>
              <Title level={2} className="product-title">
                {product && product.name}
              </Title>
              <div className="price-section">
                <Text className="current-price">
                  {product && priceFormatter.format(product.current_price)}
                </Text>
              </div>
              <Paragraph className="product-description">
                {product && product.description}
              </Paragraph>
              <div className="quantity-section">
                <Text>Available Quantity: </Text>
                <InputNumber
                  min={1}
                  max={10}
                  defaultValue={1}
                  value={product && product.available_quantity}
                />
              </div>
              <div className="action-buttons">
                <Button
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  size="large"
                  block
                  className="add-to-cart-button"
                  onClick={() => handleAddToCart(product)}
                >
                  ADD TO CART
                </Button>
              </div>
              <div className="contact-info">
                <Title level={5}>Need Help?</Title>
                <Text>Call 087458291941 To Place Your Order</Text>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
      <TimbuFooter />
    </div>
  );
};

export default ProductDetail;
