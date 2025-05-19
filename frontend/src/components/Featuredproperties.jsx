import React, { useState, useEffect } from "react";
import "../components/css/FeaturesPropertis.css";
import axios from "/config/axiosConfig";

const Featuredproperties = () => {

   const [properties, setProperties] = useState([]);
  
    useEffect(() => {
      const fetchSliders = async () => {
        try {
          const response = await axios.get("/public/getFeaturesProSliders");
          // Access the array correctly now
          if (Array.isArray(response.data.data)) {
            console.log("Slider Data:", response.data.data);
            setProperties(response.data.data);
          } else {
            console.warn("Invalid slider data:", response.data);
            setProperties([]);
          }
        } catch (error) {
          console.error("Error fetching sliders:", error);
        }
      };
  
      fetchSliders();
    }, []);


  return (
    <div
  className="property4 sp2"
  style={{
    backgroundImage: "url(/assets/img/all-images/bg/team-bg1.png)",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  }}
>
  <div className="container">
    <div className="row align-items-center space-margin60">
      <div className="col-lg-6">
        <div className="heading2">
          <h5>
            {/* Icon omitted for brevity */}
            Dream Property Awaits
          </h5>
          <div className="space18" />
          <h2>Featured Properties For You</h2>
        </div>
      </div>
    </div>

    <div className="row">
      {properties.map((property) => (
        <div key={property.id} className="col-md-4 mb-4">
          <div className="property-single-boxarea">
            <div className="img1">
              <a href="#">
                <img
                  src={property.sliderImage}
                  alt={property.title_name}
                  className="property-image img-fluid"
                />
              </a>
             
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default Featuredproperties;
