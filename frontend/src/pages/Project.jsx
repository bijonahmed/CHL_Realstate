import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "/config/axiosConfig";
import Footer from "../components/Footer";
import Header from "../components/GuestNavbar";
import { Helmet } from "react-helmet";
import "../components/css/Project.css";

// Move ProjectSection OUTSIDE

const Project = () => {
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(true);
  const [globalData, setGlobalData] = useState({});
  const [imagehistoryData, setImghistoryData] = useState([]);
  const { slug } = useParams();

  const projectTitles = {
    "complete-project": "Complete Project",
    "ongoing-project": "Ongoing Project",
    "upcoming-project": "Upcoming Project",
  };

  const makeParameter = {
    "complete-project": 7,
    "ongoing-project": 6,
    "upcoming-project": 5,
  };

  const projectName = projectTitles[slug] || "";
  const requestParameter = makeParameter[slug] || "";
  const [expanded, setExpanded] = useState({});

  const toggleReadMore = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const getTextContent = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get("/public/projectPost", {
          params: { post_category_id: requestParameter },
        });
        setPostData(response.data);
        setImghistoryData(response.imghistory);
      } catch (error) {
        console.error("Error fetching post data", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchGlobalData = async () => {
      try {
        const response = await axios.get(`/public/getGlobalSettingdata`);
        setGlobalData(response.data);
      } catch (error) {
        console.error("Error fetching global data", error);
      }
    };

    fetchPostData();
    fetchGlobalData();
  }, [projectName]);

  return (
    <div>
      <Helmet>
        <title>{projectName}</title>
      </Helmet>
      <Header />
      <div className="inner-header-area">
        <div className="container-fluid">
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
                <Link
                  to="/service"
                  style={{
                    textDecoration: "none",
                    color: "#0d6efd",
                    transition: "color 0.2s ease",
                  }}
                  onMouseOver={(e) => (e.target.style.color = "#0a58ca")}
                  onMouseOut={(e) => (e.target.style.color = "#0d6efd")}
                >
                  Service &nbsp;
                </Link>
                <li style={{ marginRight: "8px", color: "#adb5bd" }}>/</li>
                <li style={{ color: "#6c757d" }}>{projectName}</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      <div className="miision1">
        <div className="container-fluid">
          <div>
            {loading ? (
              <center>
                <div style={{ textAlign: "center", padding: "50px 0" }}>
                  <div className="loader"></div>
                </div>
              </center>
            ) : (
              <div className="project-grid">
                {postData?.map((item, index) => {
                  const fullText = getTextContent(item.description || "");
                  const isExpanded = expanded[index];
                  const shortText = fullText.slice(0, 700); // adjust limit

                  return (
                    <div className="project-item" key={index}>
                      {Array.isArray(item.imghistory) &&
                        item.imghistory.length > 0 && (
                          <div
                            id={`carousel-${item.id}`}
                            className="carousel slide"
                            data-bs-ride="carousel"
                          >
                            <div className="carousel-inner">
                              {item.imghistory.map((img, index) => (
                                <div
                                  className={`carousel-item ${
                                    index === 0 ? "active" : ""
                                  }`}
                                  key={img.id}
                                >
                                  <img
                                    src={img.image_url}
                                    className="d-block w-100"
                                    alt={`Slide ${index}`}
                                    style={{
                                      maxHeight: "300px",
                                      objectFit: "cover",
                                    }}
                                  />
                                </div>
                              ))}
                            </div>

                            {/* Carousel controls */}
                            {item.imghistory.length > 1 && (
                              <>
                                <button
                                  className="carousel-control-prev"
                                  type="button"
                                  data-bs-target={`#carousel-${item.id}`}
                                  data-bs-slide="prev"
                                >
                                  <span
                                    className="carousel-control-prev-icon"
                                    aria-hidden="true"
                                  ></span>
                                  <span className="visually-hidden">
                                    Previous
                                  </span>
                                </button>
                                <button
                                  className="carousel-control-next"
                                  type="button"
                                  data-bs-target={`#carousel-${item.id}`}
                                  data-bs-slide="next"
                                >
                                  <span
                                    className="carousel-control-next-icon"
                                    aria-hidden="true"
                                  ></span>
                                  <span className="visually-hidden">Next</span>
                                </button>
                              </>
                            )}
                          </div>
                        )}

                      {/* <img
                      loading="lazy"
                        src={item.thumnail_img}
                        alt={`Thumbnail for ${item.name || "project"}`}
                        className="thumbnail"
                      /> */}

                      <div className="project-content">
                        <h4 className="project-title">{item.name}</h4>
                        {isExpanded ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.description,
                            }}
                            className="project-description"
                          />
                        ) : (
                          <p className="project-description">{shortText}...</p>
                        )}
                        <div className="read-more-container">
                          <button
                            className="read-more-button"
                            onClick={() => toggleReadMore(index)}
                          >
                            {isExpanded ? "Read Less" : "Read More"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space30" />
      <Footer />
    </div>
  );
};

export default Project;
