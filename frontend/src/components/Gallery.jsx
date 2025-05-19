import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import axios from "/config/axiosConfig";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

const Gallery = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [galleryImages, setGalleryData] = useState([]);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await axios.get("/public/getGalleryData");
        if (Array.isArray(response.data.data)) {
          setGalleryData(response.data.data);
        } else {
          console.warn("Invalid slider data:", response.data);
          setGalleryData([]);
        }
      } catch (error) {
        console.error("Error fetching sliders:", error);
        setGalleryData([]);
      }
    };

    fetchSliders();
  }, []);

  return (
    <div className="galley4-section-area sp1">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 m-auto">
            <div className="heading2 text-center space-margin60">
              <h5>See Our Featured Gallery</h5>
              <div className="space18" />
              <h2>Browse Our Real Estate Gallery</h2>
            </div>
          </div>
        </div>

        {/* Render Swipers only when galleryImages has content */}
        {galleryImages.length > 0 && (
          <>
            {/* Main Swiper */}
            <Swiper
              modules={[Navigation, Pagination, Thumbs]}
              spaceBetween={10}
              navigation
              pagination={{ clickable: true }}
              thumbs={{ swiper: thumbsSwiper }}
              className="all-galler-images"
            >
              {galleryImages.slice(0, 100).map((img, index) => (
                <SwiperSlide key={index}>
                  <div className="big-img">
                    <img src={img.sliderImage} style={{ height: '500px'}} alt={`gallery ${index}`} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Thumbnail Swiper */}
            <Swiper
              modules={[Thumbs]}
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              watchSlidesProgress
              className="bottom-galler-images mt-4"
            >
              {galleryImages.slice(0, 100).map((img, index) => (
                <SwiperSlide key={index}>
                  <div className="small-img">
                    <img src={img.sliderImage} style={{ height: '200px'}} alt={`thumb ${index}`} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </div>
    </div>
  );
};

export default Gallery;
