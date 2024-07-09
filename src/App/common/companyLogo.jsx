import React from "react";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const CompanyLogo = () => {
  const navigate = useNavigate();
  return (
    <div className="company-logo-container">
      <Title
        level={1}
        className="company-logo-title"
        onClick={() => navigate("/")}
      >
        TIMBU
      </Title>
    </div>
  );
};

export default CompanyLogo;
