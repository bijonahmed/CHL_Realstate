// src/pages/Index.js
import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axios from "/config/axiosConfig";
import GuestNavbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import LeftSideBarComponent from "../components/LeftSideBarComponent";
import { LanguageContext } from "../context/LanguageContext";
import AuthUser from "../components/AuthUser";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPost, setTotalPost] = useState(0);

  const rawToken = sessionStorage.getItem("token");
  const token = rawToken?.replace(/^"(.*)"$/, "$1");
  console.log("Token from Dashboard : " + token);

  const countData = async () => {
    try {
      if (!token) throw new Error("Token not found");

      const response = await axios.get("/dashboard/countBookingData", {
        headers: {
        Authorization: `Bearer ${token}`, // ✅ this must match exactly
        
      },
      });

      console.log(response.data);

      setTotalUsers(response.data.totalUsers);
      setTotalPost(response.data.totalPost);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response?.data || error.message
      );
    }
  };
  // Correctly closed useEffect hook
  useEffect(() => {
    countData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      {/* Start */}

      <div>
        <div className="wrapper">
          {/*sidebar wrapper */}
          <LeftSideBarComponent />
          {/*end sidebar wrapper */}
          {/*start header */}
          <header>
            <GuestNavbar />
          </header>
          {/*end header */}
          {/*start page wrapper */}
          <div className="page-wrapper">
            <div className="page-content">
              <div className="row row-cols-1 row-cols-md-2 row-cols-xl-2 row-cols-xxl-4">
                <div className="col">
                  <div className="card radius-10 bg-gradient-cosmic">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="me-auto">
                          <p className="mb-0 text-white">Today Users</p>
                          <h4 className="my-1 text-white">{totalUsers}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="card radius-10 bg-gradient-kyoto">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="me-auto">
                          <p className="mb-0 text-dark">Total Post</p>
                          <h4 className="my-1 text-dark">{totalPost}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*end row*/}
            </div>
          </div>
          {/*end page wrapper */}
          {/*start overlay*/}
          <div className="overlay toggle-icon" />

          <Link to="#" className="back-to-top">
            <i className="bx bxs-up-arrow-alt" />
          </Link>

          <Footer />
        </div>
        {/*end wrapper*/}
      </div>

      {/* END */}
    </div>
  );
};

export default Index;
