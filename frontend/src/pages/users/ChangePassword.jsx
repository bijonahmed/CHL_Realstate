// src/pages/Index.js
import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axios from "/config/axiosConfig";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/GuestNavbar";
import AuthUser from "../../components/AuthUser";
import Swal from "sweetalert2";

const ChangePassword = () => {
  const [old_password, setOldPasswordName] = useState("");
  const [new_password, setNewPasswordName] = useState("");
  const [new_password_confirmation, setConfirmPasswordName] = useState("");
  const [errors, setErrors] = useState({});
  const { getToken, token, logout } = AuthUser();





  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const formData = new FormData();
      formData.append("old_password", old_password);
      formData.append("new_password", new_password);
      formData.append("new_password_confirmation", new_password_confirmation);
      const response = await axios.post("/auth/updatePassword", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Has been successfully update",
      });
      //console.log(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        Swal.fire({
          icon: "error",
          title: "Validation Errors",
          html: Object.values(error.response.data.errors)
            .map((err) => `<div>${err.join("<br>")}</div>`)
            .join(""),
        });
        console.error("Validation errors:", error.response.data.errors);
        setErrors(error.response.data.errors);
      } else {
        console.error("Error updating user:", error);
      }
    }
  };

  const handleOldPasswordChange = (e) => {
    setOldPasswordName(e.target.value);
  };
  const handleNewPasswordChange = (e) => {
    setNewPasswordName(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPasswordName(e.target.value);
  };

  useEffect(() => {}, []);

  useEffect(() => {}, []);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Helmet>
        <title>Change Password</title>
      </Helmet>
      {/* Start */}

      <div>
        <div className="bg-white p-0">
          <Header />
          {/* Page Header */}
          <div
            className="container-fluid page-header mb-5 p-0"
            style={{ backgroundColor: "rgb(228, 177, 141)" }} // You can use any color like "#f8f9fa", "#007bff", etc.
          >
            <div className="container-fluid page-header-inner py-5">
              <div className="container text-center mt-5">
                <br /> <br />
                <div
                  className="d-flex align-items-center justify-content-between mb-4 animated slideInDown"
                  style={{
                    borderBottom: "2px solid #e4b18d",
                    paddingBottom: "0.75rem",
                  }}
                >
                  <h1
                    className="fw-bold mb-0 text-dark"
                    style={{ letterSpacing: "1px" }}
                  >
                    Change Password
                  </h1>
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    onClick={() => window.history.back()}
                    style={{ transition: "background-color 0.3s, color 0.3s" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#e4b18d";
                      e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "";
                      e.currentTarget.style.color = "";
                    }}
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* start */}
          {/* Room Start */}
          <div className="container-xxl py-1">
            <div className="container">
              <div className="card radius-10">
                {/* Start */}
                <div className="card shadow-sm border-0">
                  <div
                    className="card-header text-white"
                    style={{ backgroundColor: "rgb(228, 177, 141)" }}
                  >
                    <h5 className="mb-0">Change Password</h5>
                  </div>

                  <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group mb-2">
                        <label htmlFor="password">Password</label>
                        <div className="input_group">
                          <input
                            type="password"
                            className="form-control"
                            onChange={handleOldPasswordChange}
                          />
                          {errors.old_password && (
                            <div className="error" style={{ color: "red" }}>
                              {errors.old_password[0]}{" "}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="form-group mb-2">
                        <label htmlFor="confirmPassword">New Password</label>
                        <div className="input_group">
                          <input
                            type="password"
                            className="form-control"
                            onChange={handleNewPasswordChange}
                          />
                          {errors.new_password && (
                            <div className="error" style={{ color: "red" }}>
                              {errors.new_password[0]}{" "}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="form-group mb-2">
                        <label htmlFor="confirmPassword">
                          Confirm Password
                        </label>
                        <div className="input_group">
                          <input
                            type="password"
                            className="form-control"
                            onChange={handleConfirmPasswordChange}
                          />
                          {errors.new_password_confirmation && (
                            <div className="error" style={{ color: "red" }}>
                              {errors.new_password_confirmation[0]}{" "}
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-primary--login"
                      >
                        Update
                      </button>
                    </form>
                  </div>
                </div>

                {/* END */}
              </div>
            </div>
          </div>
          <br />
          <Footer />
        </div>
      </div>

      {/* END */}
    </div>
  );
};

export default ChangePassword;
