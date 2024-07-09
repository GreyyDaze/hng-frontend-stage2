import { useEffect, useState } from 'react';
import { Typography, Row, Col } from 'antd';

const { Text } = Typography;

const SalesCountdown = () => {
  const [timeLeft, setTimeLeft] = useState(3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          return 3600;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="sales-countdown-container">
      <Row justify="center" align="middle" className="sales-countdown-content">
        <Col>
          <Text  className="sales-countdown-title">
            Summer Sales Ends in: {formatTime(timeLeft)}
          </Text>
        </Col>
      </Row>
    </div>
  );
};

export default SalesCountdown;
