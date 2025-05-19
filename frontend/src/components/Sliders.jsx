import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import axios from "/config/axiosConfig";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Sliders = () => {
  const [slides, setSliders] = useState([]);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await axios.get("/public/getSliders");

        // Access the array correctly now
        if (Array.isArray(response.data.data)) {
          console.log("Slider Data:", response.data.data);
          setSliders(response.data.data);
        } else {
          console.warn("Invalid slider data:", response.data);
          setSliders([]);
        }
      } catch (error) {
        console.error("Error fetching sliders:", error);
      }
    };

    fetchSliders();
  }, []);

  return (
     <div className="hero4-slider-sectionarea">
  <Swiper
    modules={[Navigation, Pagination, Autoplay]}
    spaceBetween={0}
    slidesPerView={1}
    navigation
    pagination={{ clickable: true }}
    autoplay={{ delay: 5000 }}
    loop={true}
  >
    {slides.map((bgImage, index) => (
      <SwiperSlide key={index}>
        <div
          className="hero4-slider-area"
          style={{
            backgroundImage: `url(${bgImage.sliderImage})`, // ✅ fixed this line
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="hero2-header heading2">
                  <h5>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M2 20H4M4 20H10M4 20V11.452C4 10.918 4 10.651 4.065 10.402C4.12256 10.1819 4.21725 9.97322 4.345 9.78497C4.49 9.57197 4.691 9.39497 5.093 9.04397L9.894 4.84197C10.64 4.18997 11.013 3.86397 11.432 3.73997C11.802 3.62997 12.197 3.62997 12.567 3.73997C12.987 3.86397 13.361 4.18997 14.107 4.84397L18.907 9.04397C19.309 9.39597 19.51 9.57197 19.655 9.78397C19.783 9.9753 19.8763 10.1813 19.935 10.402C20 10.651 20 10.918 20 11.452V20M10 20H14M10 20V16C10 15.4695 10.2107 14.9608 10.5858 14.5858C10.9609 14.2107 11.4696 14 12 14C12.5304 14 13.0391 14.2107 13.4142 14.5858C13.7893 14.9608 14 15.4695 14 16V20M20 20H14M20 20H22"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>{" "}
                    Your Trusted Real Estate Partner
                  </h5>
                  <div className="space28" />
                  <h1>Start Your Property Journey To Housa</h1>
                  <div className="space36" />
                  <div className="form-area text-end">
                    <form>
                      <input type="text" placeholder="Property Type" />
                      <button type="submit" className="vl-btn1">
                        Search Now{" "}
                        <span className="arrow1">
                          <i className="fa-solid fa-arrow-right" />
                        </span>
                        <span className="arrow2">
                          <i className="fa-solid fa-arrow-right" />
                        </span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>

  );
};

export default Sliders;
