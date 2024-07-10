import React from "react";
import { Layout, Row, Col, Typography, Input, Button, Checkbox } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;
const { Title, Text, Link } = Typography;

const TimbuFooter = () => {
  return (
    <Footer className="custom-footer">
      <Row gutter={[16, 16]} justify="space-between">
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={14}
          order={1}
          className="my-5 d-flex align-items-center flex-column footer-col-1"
        >
          <div className="links-1  mb-4">
            <Text className="me-5">Contact Us</Text>
            <Text>JOIN US ON</Text>
          </div>
          <div className="links-2  mb-4">
            <Text className="me-5">NEED HELP?</Text>
            <Text className="me-5">ABOUT US</Text>
            <Text>USEFUL LINKS</Text>
          </div>
          <div className="links-3 mb-3">
            <Text className="me-3">PAYMENT METHODS & DELIVERY PARTNERS</Text>
            <Text>Terms & Condition</Text>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={10} className="footer-col-2">
          <Text className="footer-title ">
            NEW TO TIMBU?
          </Text>
          <Text className="footer-text">
            Subscribe to our newsletter to get updates on our latest offers!
          </Text>
          <Input.Group compact className="newsletter-input">
            <Input />
          </Input.Group>
          <Checkbox className="footer-checkbox">
            <p className="p-0 m-0 mb-1">
              I agree to TIMBU's Privacy and Cookie Policy. You can unsubscribe
              from newsletter at any time.
            </p>
            <span className="fw-bold">I accept the Legal Terms</span>
          </Checkbox>
        </Col>
      </Row>

      <Row justify="center" className="footer-bottom">
        <Col>
          <Text>
            © 2024 TIMBU, Inc. All rights reserved
          </Text>
        </Col>
      </Row>
    </Footer>
  );
};

export default TimbuFooter;
