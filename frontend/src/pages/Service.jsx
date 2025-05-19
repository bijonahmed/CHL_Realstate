import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "/config/axiosConfig";
import Footer from "../components/Footer";
import Header from "../components/GuestNavbar";
import { Helmet } from "react-helmet";

const Service = () => {
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(true);
  const fetchPostData = async () => {
    try {
      const response = await axios.get("/public/getPostData", {
        params: {
          post_category_id: 3, // Replace with your actual parameter key and value
        },
      });
      setPostData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Our Service</title>
      </Helmet>
      <Header />
      <div>
        {/* start */}
        <div className="inner-header-area">
          <div className="containe-fluid">
            <div
              style={{
                padding: "20px",
                backgroundColor: "#ffffff",
                border: "1px solid #ced4da",
                borderRadius: "8px",
                margin: "0 0 30px 0",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
              }}
            >
              <nav aria-label="breadcrumb">
                <ol
                  style={{
                    margin: 0,
                    padding: 0,
                    listStyle: "none",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#495057",
                  }}
                >
                  <li style={{ marginRight: "8px" }}>
                    <Link
                      to="/"
                      style={{
                        textDecoration: "none",
                        color: "#0d6efd",
                        transition: "color 0.2s ease",
                      }}
                      onMouseOver={(e) => (e.target.style.color = "#0a58ca")}
                      onMouseOut={(e) => (e.target.style.color = "#0d6efd")}
                    >
                      Home
                    </Link>
                  </li>
                  <li style={{ marginRight: "8px", color: "#adb5bd" }}>/</li>
                  <li style={{ color: "#6c757d" }}>Service</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <div className="space30" />

        <div className="miision1">
          <div className="containr-fluid">
            <div className="row">
              <div className="col-lg-6 m-auto">
                <div className="heading1 text-center space-margin33">
                  <div className="space16" />
                  <h2>Our Service</h2>
                </div>
              </div>
            </div>

            <div style={{ textAlign: "justify", minHeight: "200px", padding: '10px' }}>
              {loading ? (
                <center>
                  <div style={{ textAlign: "center", padding: "50px 0" }}>
                    <div className="loader"></div>
                  </div>
                </center>
              ) : (
                postData?.description && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: postData.description,
                    }}
                  />
                )
              )}
            </div>
          </div>
        </div>

        <div className="space30" />
      </div>
      <Footer />
    </div>
  );
};

export default Service;
