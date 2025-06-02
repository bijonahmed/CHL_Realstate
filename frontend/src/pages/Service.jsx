import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "/config/axiosConfig";
import Footer from "../components/Footer";
import Header from "../components/GuestNavbar";
import { Helmet } from "react-helmet";

// Move ProjectSection OUTSIDE
const ProjectSection = ({ data }) => {
  const projectList = [
    {
      key: "ongoing",
      image: data.ongoing_image,
      label: "Ongoing Project",
      alt: "ongoing-project",
      slug: "ongoing-project",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={48}
          height={48}
          viewBox="0 0 48 48"
          fill="none"
        >
          <path
            d="M6.31818 19.2955C6.14639 16.9763 7.98171 15 10.3073 15H37.6927C40.0183 15 41.8536 16.9763 41.6818 19.2955L40.2744 38.2955C40.1197 40.3843 38.3798 42 36.2853 42H11.7147C9.62016 42 7.88032 40.3843 7.72559 38.2955L6.31818 19.2955Z"
            stroke="white"
            strokeWidth={3}
            strokeLinejoin="round"
          />
          <path
            d="M16 19V10C16 7.79086 17.7909 6 20 6H28C30.2091 6 32 7.79086 32 10V19"
            stroke="white"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 34H32"
            stroke="white"
            strokeWidth={3}
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      key: "complete",
      image: data.complete_image,
      label: "Complete Project",
      alt: "complete-project",
      slug: "complete-project",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={48}
          height={48}
          viewBox="0 0 48 48"
          fill="none"
        >
          <circle cx="24" cy="24" r="20" stroke="white" strokeWidth="3" />
          <path
            d="M16 24l6 6 10-10"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      key: "future",
      image: data.future_image,
      label: "Future Project",
      alt: "future-project",
      slug: "future-project",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={48}
          height={48}
          viewBox="0 0 48 48"
          fill="none"
        >
          <circle cx="24" cy="24" r="20" stroke="white" strokeWidth="3" />
          <path
            d="M24 12V24L32 28"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="row">
      {projectList.map((project, index) => (
        <div className="col-lg-4 col-md-6" key={index}>
          <div className="service-single-boxarea">
            <div className="img1">
              {project.image ? (
                 <Link to={`/project/${project.slug}`}><img
                  src={project.image}
                  loading="lazy"
                  alt={project.alt}
                  style={{ height: "300px", width: "100%" }}
                /></Link>
              ) : (
                <div
                  style={{
                    height: "300px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  Loading...
                </div>
              )}
            </div>
            <div className="content-area">
              <div className="icons">{project.icon}</div>
              <div className="content">
                <Link to={`/project/${project.slug}`}>
                  {project.label}
                </Link>
                <div className="space16" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Service = () => {
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(true);
  const [globalData, setGlobalData] = useState({});

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get("/public/getPostData", {
          params: { post_category_id: 3 },
        });
        setPostData(response.data);
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
  }, []);

  return (
    <div>
      <Helmet>
        <title>Our Service</title>
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
                <li style={{ color: "#6c757d" }}>Service</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="miision1">
        <div className="container-fluid">
          <div className="service1-inner">
            <div className="container-fluid">
              {/* ✅ ProjectSection usage here */}
              <ProjectSection data={globalData} />
            </div>
          </div>

          <div
            style={{
              textAlign: "justify",
              minHeight: "200px",
              padding: "10px",
            }}
          >
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
      <Footer />
    </div>
  );
};

export default Service;
