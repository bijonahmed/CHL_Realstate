import React, { useState, useEffect } from "react";
import "../components/css/FeaturesPropertis.css";
import axios from "/config/axiosConfig";

const Client = () => {

     const [propertyLocations, SetPropertyLocations] = useState([]);
    
      useEffect(() => {
        const fetchSliders = async () => {
          try {
            const response = await axios.get("/public/getsOurProperties");
            // Access the array correctly now
            if (Array.isArray(response.data.data)) {
              console.log("Slider Data:", response.data.data);
              SetPropertyLocations(response.data.data);
            } else {
              console.warn("Invalid slider data:", response.data);
              SetPropertyLocations([]);
            }
          } catch (error) {
            console.error("Error fetching sliders:", error);
          }
        };
    
        fetchSliders();
      }, []);
  return (
    <div className="location4 sp1">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 m-auto">
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
        <div className="row g-0">
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
