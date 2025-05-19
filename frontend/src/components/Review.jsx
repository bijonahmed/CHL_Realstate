import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../components/css/Review.css";
import axios from "/config/axiosConfig";

const Review = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("/public/getServiceList"); // Update with the correct endpoint
        if (Array.isArray(response.data)) {
          setTestimonials(response.data);
        } else if (response.data?.data) {
          setTestimonials(response.data.data);
        } else {
          console.error("Unexpected API response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div
      className="testi4 sp1"
      style={{
        backgroundImage: "url(/assets/img/all-images/bg/team-bg1.png)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="container review-section">
        <div className="heading2 text-center my-5">
          <h5 className="text-primary">Real Stories, Real Satisfaction</h5>
          <h2 className="fw-bold">Our Satisfied Homeowners</h2>
        </div>

        {testimonials.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            loop={true}
            className="review-swiper"
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="testimonial-box">
                  <p className="testimonial-quote">“{item.message}”</p>
                  <div className="testimonial-author">
                    <strong>{item.name}</strong>{" "}
                    <span className="role">– {item.designation}</span>
                  </div>
                  <ul className="rating-stars">
                    {[...Array(5)].map((_, i) => (
                      <li key={i}>
                        <i className="fa-solid fa-star text-warning" />
                      </li>
                    ))}
                  </ul>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-muted">Loading testimonials...</p>
        )}
      </div>
    </div>
  );
};

export default Review;