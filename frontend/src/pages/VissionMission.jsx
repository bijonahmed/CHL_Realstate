import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "/config/axiosConfig";
import Footer from "../components/Footer";
import Header from "../components/GuestNavbar";
import { Helmet } from "react-helmet";

const AboutUs = () => {
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(true);
  const fetchPostData = async () => {
    try {
      const response = await axios.get("/public/getPostData", {
        params: {
          post_category_id: 2, // Replace with your actual parameter key and value
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
        <title>Vision & Mision</title>
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
                border: "1px solid #ced4da", // Lighter but more visible gray
                borderRadius: "8px",
                margin: "0 0 30px 0", // Ensure no side margins block the border
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)", // Soft shadow for lift
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
                  <li style={{ color: "#6c757d" }}>Vision & Mision</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
        {/*===== HERO AREA ENDS =======*/}
        <div className="space30" />
        {/*===== ABOUT AREA STARTS =======*/}
        {/*===== OTHERS AREA STARTS =======*/}
        <div className="miision1">
          <div className="containr-fluid">
            <div className="row">
              <div className="col-lg-6 m-auto">
                <div className="heading1 text-center space-margin33">
                  <h5>Mision &amp; Vision</h5>
                  <div className="space16" />
                  <h2>Our Mision &amp; Vision</h2>
                </div>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-lg-12">
                <div className="mission-heading heading1">
                  <div className="space16" />
                     <div style={{ textAlign: "justify", minHeight: "200px" }}>
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
                  <div className="space32" />
                  
                 
                  <div className="space32" />
                  <div className="btn-area1">
                    <Link to="/contact" className="vl-btn1">
                      Contact{" "}
                      <span className="arrow1">
                        <i className="fa-solid fa-arrow-right" />
                      </span>
                      <span className="arrow2">
                        <i className="fa-solid fa-arrow-right" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*===== OTHERS AREA ENDS =======*/}
        <div className="space30" />
        {/*===== OTHERS AREA STARTS =======*/}
      </div>

      {/* END */}

      <Footer />
    </div>
  );
};

export default AboutUs;
