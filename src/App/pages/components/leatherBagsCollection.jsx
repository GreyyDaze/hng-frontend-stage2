import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col, Button, Typography, Pagination, Spin } from "antd";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const LeatherBagsCollection = () => {
  const navigation = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const totalProducts = 30;
  const pageSize = 10;

  const priceFormatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/products?organization_id=2f5fd01de3984e7cb02664ade3d3aba1&reverse_sort=false&page=${currentPage}&size=${pageSize}&Appid=N56K7YCIHBAKPOV&Apikey=b3358887daa04cb7a517201f7bb3087f20240713012036686158`
      );
      setProducts(response.data.items);
      console.log("Products", response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="leather-collection-container">
      {loading ? (
        <div className="loading-spinner">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Row gutter={[20, 60]} className="leather-row">
            {products && products.length > 0 ? (
              products.map((product) => (
                <Col key={product.id} xs={12} sm={10} md={8} lg={6}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={product.name}
                        src={`https://api.timbu.cloud/images/${product.photos?.[0]?.url}`}
                      />
                    }
                    className="custom-card"
                  >
                    <div className="card-content">
                      <div className="product-info">
                        <Text className="product-name">{product.name}</Text>
                        <Text className="product-price mt-4">
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
              ))
            ) : (
              <div className="d-flex justify-content-center w-100">
                No products available
              </div>
            )}
          </Row>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Pagination
              current={currentPage}
              total={totalProducts}
              pageSize={pageSize}
              onChange={handlePageChange}
              className="pagination"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default LeatherBagsCollection;
