import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "/config/axiosConfig";
import Footer from "../components/Footer";
import Header from "../components/GuestNavbar";
import { Helmet } from "react-helmet";

const Download = () => {
  const [captchaQuestion, setCaptchaQuestion] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [userCaptchaInput, setUserCaptchaInput] = useState("");

  const [data, setName] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [showModal, setShowModal] = useState(false);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    setCaptchaQuestion(`${num1} + ${num2}`);
    setCaptchaAnswer((num1 + num2).toString());
  };

  const fetchGlobalData = async () => {
    try {
      const response = await axios.get(`/public/getGlobalData`);
      setName(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchGlobalData();
    generateCaptcha();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [globalData, setGlobalData] = useState({});
  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const response = await axios.get(`/public/getGlobalData`);
        setGlobalData(response.data);
      } catch (error) {
        console.error("Error fetching global data:", error);
      }
    };

    fetchGlobalData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userCaptchaInput.trim() !== captchaAnswer) {
      alert("CAPTCHA answer is incorrect!");
      generateCaptcha(); // regenerate captcha on error
      return;
    }

    try {
      const response = await axios.post(`/public/sendContact`, formData);
      if (response.status === 200) {
        setShowModal(true);
        setFormData({
          name: "",
          phone: "",
          email: "",
          service: "",
          message: "",
        });
        setUserCaptchaInput(""); // reset captcha input
        generateCaptcha(); // regenerate captcha on success
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Submission failed. Try again.");
    }
  };

  const closeModal = () => setShowModal(false);

  return (
    <div>
      <Helmet>
        <title>Download</title>
      </Helmet>
      <Header />

      <div>
        {/*===== HERO AREA ENDS =======*/}
        <div className="space100" />
        {/*===== CONTACT AREA STARTS =======*/}
        <div className="contact-inner">
          <div className="container-fluid">
            <div
              style={{
                padding: "20px",
                backgroundColor: "#ffffff",
                border: "1px solid #ced4da", // Lighter but more visible gray
                borderRadius: "8px",
                margin: "0 0 30px 0", // Ensure no side margins block the border
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)", // Soft shadow for lift
              }}
            >
              <nav aria-label="breadcrumb">
                <ol
                  style={{
                    margin: 0,
                    padding: 0,
                    listStyle: "none",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#495057",
                  }}
                >
                  <li style={{ marginRight: "8px" }}>
                    <Link
                      to="/"
                      style={{
                        textDecoration: "none",
                        color: "#0d6efd",
                        transition: "color 0.2s ease",
                      }}
                      onMouseOver={(e) => (e.target.style.color = "#0a58ca")}
                      onMouseOut={(e) => (e.target.style.color = "#0d6efd")}
                    >
                      Home
                    </Link>
                  </li>
                  <li style={{ marginRight: "8px", color: "#adb5bd" }}>/</li>
                  <li style={{ color: "#6c757d" }}>Download</li>
                </ol>
              </nav>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="text-center">
                  <div className="bg-light border rounded shadow-sm p-3">
                    <h5 className="mb-3 text-primary">
                      Scan to Download the App
                    </h5>
                    <img
                      src="/img/CHL-1024.jpeg"
                      alt="QR code to download the app"
                      className="img-fluid"
                      style={{ maxWidth: "200px" }}
                    />
                    <p className="mt-3 text-success fw-semibold">
                      Available for Android Devices
                    </p>
                    <p className="text-muted">iOS version is coming soon.</p>
                    <p className="text-secondary small">
                      Point your camera at the QR code to download.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space30" />

        {/*===== FAQ AREA ENDS =======*/}
        <div className="space30" />
      </div>
      <Footer />
    </div>
  );
};

export default Download;
