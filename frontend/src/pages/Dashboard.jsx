// src/pages/Index.js
import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axios from "/config/axiosConfig";
import GuestNavbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import Header from "../components/GuestNavbar";
import AuthUser from "../components/AuthUser";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // already imported from 'react-router-dom'
  const rawToken = sessionStorage.getItem("token");
  const token = rawToken?.replace(/^"(.*)"$/, "$1");
  const [roomData, setRoomData] = useState([]);
  const [data, setName] = useState({});
  const fetchGlobalData = async () => {
    try {
      const response = await axios.get(`/public/getGlobalData`);
      setName(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  // Correctly closed useEffect hook
  useEffect(() => {
    fetchGlobalData();
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      {/* Start */}
      <div className="bg-white p-0">
        <Header />

        {/* Page Header (Optional Section if needed) */}
        <div className="space30" />

        {/* About Section */}
        <div className="miision1">
          <div className="container-fluid">
            <div className="row align-items-center mt-5">
              <div className="container mt-5">
                {/* Top Cards */}
                <div className="row g-4 mb-4">
                  <div className="col-md-4">
                    <div className="card text-white bg-primary h-100 shadow-sm">
                      <div className="card-body text-center">
                        <i className="fa-solid fa-user-gear fa-2x mb-3"></i>
                        <h5 className="card-title">Update Profile</h5>
                        <span className="card-text">
                          Keep your personal details current.<br/>
                        </span>
                        <Link
                          to="/user/profile"
                          className="btn btn-light btn-sm"
                        >
                          Edit Profile
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="card text-white bg-warning h-100 shadow-sm">
                      <div className="card-body text-center">
                        <i className="fa-solid fa-lock fa-2x mb-3"></i>
                        <h5 className="card-title">Change Password</h5>
                        <span className="card-text">Keep your account secure.</span><br/>
                        <Link
                          to="/user/change-password"
                          className="btn btn-dark btn-sm"
                        >
                          Change Password
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="card text-white bg-success h-100 shadow-sm">
                      <div className="card-body text-center">
                        <i className="fa-solid fa-list-ol fa-2x mb-3"></i>
                        <h5 className="card-title">Installment List</h5>
                        <span className="card-text">
                          View your payment installments.<br/>
                        </span>
                        <Link
                          to="/user/installments"
                          className="btn btn-light btn-sm"
                        >
                          View Installments
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Welcome Card */}
                <div className="card shadow-sm border-0 bg-light">
                  <div className="card-body">
                    <h4 className="card-title mb-3 text-primary">
                      Welcome to Concrete Holdings Ltd.
                    </h4>
                    <span className="card-text" style={{ textAlign: "justify" }}>
                      {loading ? (
                        
                          <div style={{ textAlign: "center", padding: "50px 0" }}>
                            <div className="loader"></div>
                          </div>
                        
                      ) : (
                        data?.customer_message && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: data.customer_message.replace(
                                /\n/g,
                                "<br />"
                              ),
                            }}
                          />
                        )
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space30" />

        {/* Footer */}
        <Footer />
      </div>
      {/* End */}
    </div>
  );
};

export default Index;
