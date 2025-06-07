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

const MyProfile = () => {
  const navigate = useNavigate();
  const { getToken, token, logout } = AuthUser();
  const [errors, setErrors] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [username, setUsername] = useState("");
  const [rule_id, setRuleId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPassword] = useState("");
  const [roles, setRuleData] = useState([]);

  const fetchRuleData = async () => {
    try {
      if (!token) {
        throw new Error("Token not found in sessionStorage");
      }
      const response = await axios.get(`/user/getRoles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.data) {
        setRuleData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // Fetch user data from the API and update state user/getUserRow
  const defaultFetch = async () => {
    try {
      const response = await axios.get(`booking/getUserRow`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = response.data.data;
      console.log("API response data:", userData.name); // Debugging: Check API response

      // Update state with fetched user data
      setName(userData.name || "");
      setEmail(userData.email || "");
      setPhone(userData.phone || "");
      setCompany(userData.company_name || "");
      setUsername(userData.username || "");
      setRuleId(userData.role_id || "");
      //setStatus(userData.status === 1 || userData.status === 0 ? userData.status : "");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      //formData.append("id", user.id);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("company", company);
      formData.append("username", username);
      formData.append("rule_id", rule_id);
      formData.append("password", password);
      formData.append("status", 1);

      const response = await axios.post("/user/updateBookingUser", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
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
        title: "Your data has been successfully saved.",
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

  const handleConfigName = (e) => {
    setName(e.target.value);
  };
  const handleConfigEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleConfigPhone = (e) => {
    setPhone(e.target.value);
  };
  const handleConfigCompany = (e) => {
    setCompany(e.target.value);
  };
  const handleConfigUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleConfigRuleId = (e) => {
    setRuleId(e.target.value);
  };
  const handleConfigPassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  useEffect(() => {
    defaultFetch();
    fetchRuleData();
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Helmet>
        <title>Profile</title>
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
                    Profile
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
                    <h5 className="mb-0">Update Profile</h5>
                  </div>

                  <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                      <div className="row mb-3">
                        <label
                          htmlFor="inputName"
                          className="col-sm-3 col-form-label fw-semibold"
                        >
                          Full Name
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className={`form-control ${
                              errors.name ? "is-invalid" : ""
                            }`}
                            id="inputName"
                            placeholder="Enter full name"
                            value={name}
                            onChange={handleConfigName}
                          />
                          {errors.name && (
                            <div className="invalid-feedback">
                              {errors.name[0]}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          htmlFor="inputEmail"
                          className="col-sm-3 col-form-label fw-semibold"
                        >
                          Email Address
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="email"
                            className={`form-control ${
                              errors.email ? "is-invalid" : ""
                            }`}
                            id="inputEmail"
                            placeholder="Enter email"
                            value={email}
                            onChange={handleConfigEmail}
                          />
                          {errors.email && (
                            <div className="invalid-feedback">
                              {errors.email[0]}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          htmlFor="inputPhone"
                          className="col-sm-3 col-form-label fw-semibold"
                        >
                          Phone Number
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className={`form-control ${
                              errors.phone ? "is-invalid" : ""
                            }`}
                            id="inputPhone"
                            placeholder="Enter phone"
                            value={phone}
                            onChange={handleConfigPhone}
                          />
                          {errors.phone && (
                            <div className="invalid-feedback">
                              {errors.phone[0]}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="row mb-4">
                        <label
                          htmlFor="inputUsername"
                          className="col-sm-3 col-form-label fw-semibold"
                        >
                          Username
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className={`form-control ${
                              errors.username ? "is-invalid" : ""
                            }`}
                            id="inputUsername"
                            placeholder="Enter username"
                            value={username}
                            onChange={handleConfigUsername}
                          />
                          {errors.username && (
                            <div className="invalid-feedback">
                              {errors.username[0]}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="row">
                        <div className="offset-sm-3 col-sm-9">
                          <button
                            type="submit"
                            className="btn btn-primary px-5"
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
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

export default MyProfile;
