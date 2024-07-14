import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SalesCountdown from "../common/salesCountdown";
import CompanyLogo from "../common/companyLogo";
import Navbar from "../common/navbar";
import visa from "@images/icons/Visa.jpg";
import lock from "@images/icons/lock.png";
import TimbuFooter from "../common/timbuFooter";
import {
  Form,
  Input,
  Select,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Divider,
  Tooltip,
  notification,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useCart } from "../../context/CartContext";

const { Option } = Select;
const { Title } = Typography;

const countries = [
  "United Kingdom",
  "United States",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "China",
  "India",
  "Brazil",
  "Russia",
  "Italy",
  "Mexico",
  "Spain",
  "South Korea",
];

const Checkout = () => {
  const navigate = useNavigate();
  const { clearCart, totalPrice, cartItems } = useCart();
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "United States",
    postalCode: "",
    phoneNumber: "",
    cardNumber: "",
    securityCode: "",
    expirationDate: "",
  });

  console.log(totalPrice);
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    if (value.trim() !== "") {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const handleCountryChange = (value) => {
    setFormValues({
      ...formValues,
      country: value,
    });
    if (value) {
      setFormErrors({
        ...formErrors,
        country: "",
      });
    }
  };

  const validateForm = () => {
    let errors = {};

    if (!formValues.firstName.trim()) {
      errors.firstName = "First name is required";
    }
    if (!formValues.lastName.trim()) {
      errors.lastName = "Last name is required";
    }
    if (!formValues.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Email is invalid";
    }
    if (!formValues.country) {
      errors.country = "Country is required";
    }
    if (!formValues.postalCode.trim()) {
      errors.postalCode = "Postal code is required";
    }
    if (!formValues.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    }
    if (!formValues.cardNumber.trim()) {
      errors.cardNumber = "Card number is required";
    }
    if (!formValues.securityCode.trim()) {
      errors.securityCode = "Security code is required";
    }
    if (!formValues.expirationDate.trim()) {
      errors.expirationDate = "Expiration date is required";
    }

    return errors;
  };

  const onFinish = () => {
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log("Success:", formValues);
      notification.success({
        message: "Order Placed Successfully",
        description: `Your order has been placed and will be delivered to ${
          formValues.country
        }. Total price: $${totalPrice.toFixed(2)}`,
        duration: 5,
      });
      navigate("/");
      clearCart();
    } else {
      console.log("Failed:", errors);
    }
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
      <div className="checkout-heading">
        <Title level={1} className="checkout-title">
          CHECK OUT
        </Title>
      </div>
      <div className="checkout-container">
        <Row
          gutter={{
            xs: 12,
            lg: 25,
          }}
        >
          <Col xs={24} sm={10} md={13} className="check-col-1 ">
            <Title level={5} className="section-title">
              <span className="section-number">1</span> PERSONAL INFORMATION
            </Title>

            <Card className="info-card">
              <Form layout="vertical">
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item label="First name" className="custom-form-item">
                      <Input
                        name="firstName"
                        value={formValues.firstName}
                        onChange={handleInputChange}
                        placeholder="Riley"
                        className="custom-input"
                      />
                    </Form.Item>
                    {formErrors.firstName &&
                      formValues.firstName.trim() === "" && (
                        <div className="error-message">
                          {formErrors.firstName}
                        </div>
                      )}
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item label="Last name" className="custom-form-item">
                      <Input
                        name="lastName"
                        value={formValues.lastName}
                        onChange={handleInputChange}
                        placeholder="Kent"
                        className="custom-input"
                      />
                    </Form.Item>
                    {formErrors.lastName &&
                      formValues.lastName.trim() === "" && (
                        <div className="error-message">
                          {formErrors.lastName}
                        </div>
                      )}
                  </Col>
                </Row>
                <Form.Item label="Email" className="custom-form-item">
                  <Input
                    name="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className="custom-input"
                  />
                </Form.Item>
                {formErrors.email && formValues.email.trim() === "" && (
                  <div className="error-message">{formErrors.email}</div>
                )}
                <Row gutter={16} className="mt-3">
                  <Col xs={24} sm={12}>
                    <Form.Item label="Country" className="custom-form-item">
                      <Select
                        value={formValues.country}
                        onChange={handleCountryChange}
                        placeholder="Select Country"
                        className="custom-select"
                      >
                        {countries.map((country) => (
                          <Option key={country} value={country}>
                            {country}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    {formErrors.country && formValues.country.trim() === "" && (
                      <div className="error-message">{formErrors.country}</div>
                    )}
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item label="Postal Code" className="custom-form-item">
                      <Input
                        name="postalCode"
                        value={formValues.postalCode}
                        onChange={handleInputChange}
                        placeholder="10001"
                        className="custom-input"
                      />
                    </Form.Item>

                    {formErrors.postalCode &&
                      formValues.postalCode.trim() === "" && (
                        <div className="error-message">
                          {formErrors.postalCode}
                        </div>
                      )}
                  </Col>
                </Row>
                <Form.Item label="Phone Number" className="custom-form-item">
                  <Input
                    name="phoneNumber"
                    value={formValues.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="+44 12441 440222"
                    className="custom-input"
                  />
                </Form.Item>
                {formErrors.phoneNumber &&
                  formValues.phoneNumber.trim() === "" && (
                    <div className="error-message">
                      {formErrors.phoneNumber}
                    </div>
                  )}
              </Form>
            </Card>

            <Title level={5} className="section-title">
              <span className="section-number">2</span> PAYMENT DETAILS
              <img src={lock} alt="lock" className="lock-icon" />
            </Title>

            <Card className="info-card mt-4">
              <Form layout="vertical">
                <Form.Item
                  label="Credit Card Number"
                  className="custom-form-item"
                >
                  <Input
                    name="cardNumber"
                    value={formValues.cardNumber}
                    onChange={handleInputChange}
                    placeholder="3355 4444 0087 32876"
                    className="custom-input"
                  />
                  <img src={visa} alt="Visa" className="card-logo" />
                </Form.Item>

                {formErrors.cardNumber &&
                  formValues.cardNumber.trim() === "" && (
                    <div className="error-message">{formErrors.cardNumber}</div>
                  )}
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label={<span className="fw-bold">Security code</span>}
                      className="custom-form-item"
                    >
                      <Input
                        name="securityCode"
                        value={formValues.securityCode}
                        onChange={handleInputChange}
                        placeholder="***"
                        className="custom-input"
                      />
                      <Tooltip title="The 3-digit code on the back of your card">
                        <QuestionCircleOutlined className="card-logo " />
                      </Tooltip>
                    </Form.Item>

                    {formErrors.securityCode &&
                      formValues.securityCode.trim() === "" && (
                        <div className="error-message">
                          {formErrors.securityCode}
                        </div>
                      )}
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Expiration date"
                      className="custom-form-item"
                    >
                      <Input
                        name="expirationDate"
                        value={formValues.expirationDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className="custom-input"
                      />
                    </Form.Item>

                    {formErrors.expirationDate &&
                      formValues.expirationDate.trim() === "" && (
                        <div className="error-message">
                          {formErrors.expirationDate}
                        </div>
                      )}
                  </Col>
                </Row>
              </Form>
            </Card>

            <Button
              type="primary"
              block
              className="complete-purchase mt-4"
              onClick={onFinish}
            >
              Complete Purchase
            </Button>
          </Col>

          <Col xs={24} sm={7} md={10} className="check-col-2 ms-3">
            <Card className="order-summary">
              <Title level={2} className="order-title">
                Your Order
              </Title>
              {cartItems.map((item, index) => (
                <div key={index} className="mb-3">
                  <Title level={5} className="order-product-name">
                    {item.name}
                  </Title>
                  <div className="">
                    <Title level={5} className="order-product-price">
                      ₦{priceFormatter.format(item.price)}
                    </Title>
                  </div>
                </div>
              ))}

              <Divider />
              <div className="price-details">
                <div className="price-row">
                  <Title>Total Purchase</Title>
                  <Title>₦ {priceFormatter.format(totalPrice)}</Title>
                </div>
                <div className="price-row">
                  <Title>Estimated Tax</Title>
                  <Title>₦ 0</Title>
                </div>
                <Divider />
                <div className="total">
                  <Title className="title-total">Total</Title>
                  <Title className="">
                    ₦ {priceFormatter.format(totalPrice)}
                  </Title>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <TimbuFooter />
    </div>
  );
};

export default Checkout;
