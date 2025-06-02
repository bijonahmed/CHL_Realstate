// src/Navbar.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthUser from "../components/AuthUser";
import Footer from "../components/Footer";
import axios from "/config/axiosConfig";
import $ from "jquery";

const GuestNavbar = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const { getToken, token, logout } = AuthUser();

  const fetechGlobalData = async () => {
    try {
      const response = await axios.get(`/public/getGlobalData`);
      // console.log("Navbar API Response:", response.data); // Log the response
      setName(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const logoutUser = async () => {
    if (token) {
      await logout();
      navigate("/login");
    }
  };

  useEffect(() => {
    fetechGlobalData();
  }, []);

  return (
    <>
      {/* header  */}

      <header className="homepage4-body">
        <div
          id="vl-header-sticky"
          className="vl-header-area vl-transparent-header"
        >
          <div className="container">
            <div className="row align-items-center row-bg1">
              <div className="col-lg-2 col-md-6 col-6">
                <div className="vl-logo">
                  <Link to="/">
                    <img src="/assets/img/logo/logo1.png" loading="lazy" alt="housa" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-7 d-none d-lg-block">
                <div className="vl-main-menu text-center">
                  <nav className="vl-mobile-menu-active">
                    <ul>
                      <li className="has-dropdown">
                        <Link to="/">Home </Link>
                      </li>
                      <li>
                        <Link to="/about-us">About Us</Link>
                      </li>

                      <li>
                        <Link to="/service">Our Services</Link>
                      </li>
                      <li>
                        <Link to="/our-vision">Mision & Vision</Link>
                      </li>
                      <li>
                        <Link to="/contact">Contact Us</Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-6">
                <div className="vl-header-action-item d-block d-lg-none">
                  <button type="button" className="vl-offcanvas-toggle">
                    <i className="fa-solid fa-bars-staggered" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/*=====HEADER END =======*/}
      {/*===== MOBILE HEADER STARTS =======*/}
      <div className="homepage4-body">
        <div className="vl-offcanvas">
          <div className="vl-offcanvas-wrapper">
            <div className="vl-offcanvas-header d-flex justify-content-between align-items-center mb-90">
              <div className="vl-offcanvas-logo">
                <a href="index.html">
                  <img src="/assets/img/logo/logo1.png" loading="lazy" alt="Image" />
                </a>
              </div>
              <div className="vl-offcanvas-close">
                <button className="vl-offcanvas-close-toggle">
                  <i className="fa-solid fa-xmark" />
                </button>
              </div>
            </div>
            <div className="vl-offcanvas-menu d-lg-none mb-40">
              <nav />
            </div>
            <div className="space20" />
            <div className="vl-offcanvas-info">
              <h3 className="vl-offcanvas-sm-title">Contact Us</h3>
              <div className="space20" />
              <span>
                <a href="#">
                  {" "}
                  <i className="fa-regular fa-envelope" /> +8801712-903789
                </a>
              </span>
              <span>
                <a href="#">
                  <i className="fa-solid fa-phone" /> concreteholgingsltd@gmail.com
                </a>
              </span>
              <span>
                <a href="#">
                  <i className="fa-solid fa-location-dot" />
                  Eastern Housing 2nd phase , Pallabi, Mirpur , Dhaka, Bangladesh, 1216
                </a>
              </span>
            </div>
            <div className="space20" />
            <div className="vl-offcanvas-social">
              <h3 className="vl-offcanvas-sm-title">Follow Us</h3>
              <div className="space20" />
              <a href="https://www.facebook.com/chl.propertys" target="_blank">
                <i className="fab fa-facebook-f" />
              </a>
              {/* <a href="#">
                <i className="fab fa-twitter" />
              </a>
              <a href="#">
                <i className="fab fa-linkedin-in" />
              </a>
              <a href="#">
                <i className="fab fa-instagram" />
              </a> */}
            </div>
          </div>
        </div>
        <div className="vl-offcanvas-overlay" />
      </div>

      {/* ------------- Header end ----------------  */}
    </>
  );
};

export default GuestNavbar;
