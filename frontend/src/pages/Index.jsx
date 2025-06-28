import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "/config/axiosConfig";
import Footer from "../components/Footer";
import Header from "../components/GuestNavbar";
import Sliders from "../components/Sliders";
import Featuredproperties from "../components/Featuredproperties";
import Client from "../components/Client";
import WhatsApp from "../components/WhatsApp";
import Review from "../components/Review";
import Swal from "sweetalert2";
import Gallery from "../components/Gallery";


const Index = () => {
  const [data, setName] = useState({});
  const [slugan, setSlugan] = useState({});
  const fetchGlobalData = async () => {
    try {
      const response = await axios.get(`/public/getGlobalSettingdata`);
      setName(response.data);
      setSlugan(response.data.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  

  useEffect(() => {
    fetchGlobalData();
  }, []);

  return (
    <div>
      <div className="paginacontainer">
        <div className="progress-wrap">
          <svg
            className="progress-circle svg-content"
            width="100%"
            height="100%"
            viewBox="-1 -1 102 102"
          >
            <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
          </svg>
        </div>
      </div>
      <Header />
      <div className="body-overlay" />
      {/* Component */}
      <Sliders />
      <Client />
      <Featuredproperties />
      <Gallery />
      <Review />

      {/*===== TESTIMONIAL AREA ENDS =======*/}

      {/*===== CTA AREA STARTS =======*/}
      <div className="cat4-section-area mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="cta-bg-area">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div className="heading2">
                      <h2>{slugan.slugan}</h2>
                      <div className="space28" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="cta-images-area">
                      <img
                      loading="lazy"
                        src="/assets/img/elements/elements7.png"
                        alt="housa"
                        className="elements7 aniamtion-key-1"
                      />
                      <div className="img1 text-end">
                        <img
                        loading="lazy"
                          src={data.banner_image}
                          alt={data.name}
                          className="img-fluid rounded-circle"
                          style={{
                            height: "350px",
                            width: "350px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div className="villa-listing">
                        <div className="space8" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*===== CTA AREA ENDS =======*/}
      <div className="space80" />
      {/*===== FOOTER AREA STARTS =======*/}
      <Footer />
      {/*===== FOOTER AREA ENDS =======*/}
      <div className="space40" />
    </div>
  );
};

export default Index;
