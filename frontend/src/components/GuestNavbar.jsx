// src/Navbar.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthUser from "../components/AuthUser";
import Footer from "../components/Footer";
import "../components/css/GuestNavbar.css";
//import "../components/css/Project.css";
import axios from "/config/axiosConfig";
import $ from "jquery";

const GuestNavbar = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const { getToken, token, logout } = AuthUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
                    <img
                      src="/assets/img/logo/logo1.png"
                      loading="lazy"
                      alt="CHL"
                    />
                  </Link>
                </div>
              </div>

              {/* Desktop Menu */}
              <div className="col-lg-7 d-none d-lg-block">
                <div className="vl-main-menu text-center">
                  <nav>
                    <ul className="navbar-nav d-flex flex-row justify-content-center gap-3">
                      <li className="nav-item">
                        <Link to="/" className="nav-link">
                          Home
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/about-us" className="nav-link">
                          About Us
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/service" className="nav-link">
                          Our Services
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/our-vision" className="nav-link">
                          Mission & Vision
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/contact" className="nav-link">
                          Contact Us
                        </Link>
                      </li>
                      {token ? (
                        <>
                          <li className="nav-item">
                            <Link to="/dashboard" className="nav-link">
                              Dashboard
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              to="#"
                              className="nav-link"
                              onClick={logoutUser}
                            >
                              Logout
                            </Link>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="nav-item">
                            <Link to="/login" className="nav-link">
                              Login
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/register" className="nav-link">
                              Register
                            </Link>
                          </li>
                        </>
                      )}
                    </ul>
                  </nav>
                </div>
              </div>

              {/* Hamburger Menu Toggle Button */}
              <div className="col-lg-3 col-md-6 col-6">
                <div className="vl-header-action-item d-block d-lg-none text-end">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mobileNavbar"
                    aria-controls="mobileNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <i className="fa-solid fa-bars-staggered"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ===== Mobile Collapse Menu (Bootstrap 5) ===== */}
      <div className="collapse navbar-collapse d-lg-none" id="mobileNavbar">
        <ul className="navbar-nav p-3 bg-white border-top mt-5">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about-us" className="nav-link">
              About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/service" className="nav-link">
              Our Services
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/our-vision" className="nav-link">
              Mission & Vision
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">
              Contact Us
            </Link>
          </li>
          {token ? (
            <>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#" className="nav-link" onClick={logoutUser}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* <div className={`homepage4-body ${isOffcanvasOpen ? "offcanvas-open" : ""}`}>
        <div className="vl-offcanvas">
          <div className="vl-offcanvas-wrapper">
            <div className="vl-offcanvas-header d-flex justify-content-between align-items-center mb-90">
              <div className="vl-offcanvas-logo">
                <a href="/">
                  <img
                    src="/assets/img/logo/logo1.png"
                    loading="lazy"
                    alt="Image"
                  />
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
                  <i className="fa-regular fa-envelope" />
                  {name.whatsApp}
                </a>
              </span>
              <span>
                <a href="#">
                  <i className="fa-solid fa-phone" /> {name.email}
                </a>
              </span>
              <span>
                <a href="#">
                  <i className="fa-solid fa-location-dot" />
                  {name.address}
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
            </div>
          </div>
        </div>
        <div className="vl-offcanvas-overlay" />
      </div> */}

      {/* ------------- Header end ----------------  */}
    </>
  );
};

export default GuestNavbar;
