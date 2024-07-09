import CompanyLogo from "../common/companyLogo";
import Navbar from "../common/navbar";
import SalesCountdown from "../common/salesCountdown";
import { Breadcrumb, Carousel } from "antd";
import { Button, Row, Col, Typography } from "antd";
const { Text, Title } = Typography;
import { leatherBags } from "../../utils/data.js";
import LeatherBagsCollection from "./components/leatherBagsCollection.jsx";
import TimbuFooter from "../common/timbuFooter.jsx";

const ProductListing = () => {
  const images = [
    "./src/assets/images/hero.jpg",
    "./src/assets/images/hero-1.jpg",
    "./src/assets/images/hero-2.jpg",
    "./src/assets/images/hero-3.jpg",
    "./src/assets/images/hero-4.jpg",
  ];

  return (
    <div>
      <SalesCountdown />
      <CompanyLogo />
      <Navbar />
      <Breadcrumb className="breadcrumb-container" separator=">">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Fashion</Breadcrumb.Item>
        <Breadcrumb.Item>Women’s Fashion</Breadcrumb.Item>
        <Breadcrumb.Item>Handbags</Breadcrumb.Item>
        <Breadcrumb.Item>Luxury Leather Collection</Breadcrumb.Item>
      </Breadcrumb>
      <div className="hero-carousel-container">
        <Carousel autoplay>
          {images.map((image, index) => (
            <div key={index} className="hero-container">
              <img
                src={image}
                alt={`Belmont Luxury Leather Collection ${index + 1}`}
                className="hero-image"
              />
              <div className="image-overlay"></div>
              <div className="hero-overlay">
                <Row justify="start" align="middle" className="hero-content">
                  <Col>
                    <Title className="hero-heading">
                      The Belmont Luxury Leather Collection
                    </Title>
                    <Text className="hero-subheading">
                      Timeless Elegance, Exceptional Craftsmanship, Crafted from
                      the finest full-grain leathers
                    </Text>
                    <Button className="hero-button">Shop Now</Button>
                  </Col>
                </Row>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <Row align="middle" className="heading-container">
        <Col>
          <Title level={1} className="heading-text">
            Luxury Leather Collection
          </Title>
        </Col>
      </Row>
      <LeatherBagsCollection products={leatherBags} />
      <div className="back-container">
        <Title level={1} className="back-title">
          Back to Handbags
        </Title>
      </div>
      <TimbuFooter />
    </div>
  );
};
export default ProductListing;
