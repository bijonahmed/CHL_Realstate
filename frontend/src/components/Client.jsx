import React, { useState, useEffect } from "react";
import "../components/css/FeaturesPropertis.css";
import axios from "/config/axiosConfig";
import { Link } from "react-router-dom";

// Move ProjectSection OUTSIDE
const ProjectSection = ({ data }) => {
  const projectList = [
    {
      key: "Upcoming Project",
      image: data.future_image,
      label: "Upcoming Project",
      alt: "Upcoming Project",
      slug: "upcoming-project",
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
    {
      key: "Ongoing Project",
      image: data.complete_image,
      label: "Ongoing Project",
      alt: "Ongoing Project",
      slug: "ongoing-project",
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
      key: "Complete Project",
      image: data.ongoing_image,
      label: "Complete Project",
      alt: "Complete Project",
      slug: "complete-project",
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
  ];

  return (
    <div className="row">
      {projectList.map((project, index) => (
        <div className="col-lg-4 col-md-6" key={index}>
          <div className="service-single-boxarea">
            <div className="img1">
              {project.image ? (
                <Link to={`/project/${project.slug}`}>
                  <img
                    src={project.image}
                    loading="lazy"
                    alt={project.alt}
                    style={{ height: "300px", width: "100%" }}
                  />
                </Link>
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
                <Link to={`/project/${project.slug}`}>{project.label}</Link>
                <div className="space16" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Client = () => {
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(true);
  const [globalData, setGlobalData] = useState({});
  const [propertyLocations, SetPropertyLocations] = useState([]);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await axios.get("/public/getsOurProperties");
        // Access the array correctly now
        if (Array.isArray(response.data.data)) {
         // console.log("Slider Data:", response.data.data);
          SetPropertyLocations(response.data.data);
        } else {
          console.warn("Invalid slider data:", response.data);
          SetPropertyLocations([]);
        }
      } catch (error) {
        console.error("Error fetching sliders:", error);
      }
    };
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

    fetchSliders();
  }, []);
  return (
    <div className="location4 sp1">
      <div className="container">
        <div className="row">
          <div className="service1-inner">
            <div className="container-fluid">
              {/* ✅ ProjectSection usage here */}
              <ProjectSection data={globalData} />
            </div>
          </div>

          <div className="col-lg-8 m-auto d-none">
            <div className="heading2 text-center space-margin60">
              <h5>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={25}
                  height={24}
                  viewBox="0 0 25 24"
                  fill="none"
                >
                  <path
                    d="M2.5 20H4.5M4.5 20H10.5M4.5 20V11.452C4.5 10.918 4.5 10.651 4.565 10.402C4.62256 10.1819 4.71725 9.97322 4.845 9.78497C4.99 9.57197 5.191 9.39497 5.593 9.04397L10.394 4.84197C11.14 4.18997 11.513 3.86397 11.932 3.73997C12.302 3.62997 12.697 3.62997 13.067 3.73997C13.487 3.86397 13.861 4.18997 14.607 4.84397L19.407 9.04397C19.809 9.39597 20.01 9.57197 20.155 9.78397C20.283 9.9753 20.3763 10.1813 20.435 10.402C20.5 10.651 20.5 10.918 20.5 11.452V20M10.5 20H14.5M10.5 20V16C10.5 15.4695 10.7107 14.9608 11.0858 14.5858C11.4609 14.2107 11.9696 14 12.5 14C13.0304 14 13.5391 14.2107 13.9142 14.5858C14.2893 14.9608 14.5 15.4695 14.5 16V20M20.5 20H14.5M20.5 20H22.5"
                    stroke="#ED8438"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>{" "}
                Our Property Location
              </h5>
              <div className="space18" />
              <h2>Our Properties </h2>
            </div>
          </div>
        </div>
        <div className="row g-0 d-none">
          {" "}
          {/* g-0 removes Bootstrap gutters */}
          {propertyLocations.map((property, index) => (
            <div key={index} className="col-6 col-md-4 col-lg-2 p-0">
              {" "}
              {/* p-0 removes column padding */}
              <div
                className="propety-loaction"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "0", // remove overall layout padding
                  gap: "0", // remove space between image and text
                }}
              >
                <img
                  src={property.imageUrl}
                  alt={property.name}
                  style={{
                    width: "180px",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <div
                  className="content-area"
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                    marginTop: "0", // remove top margin
                  }}
                >
                  {property.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Client;
