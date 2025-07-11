import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import LeftSideBarComponent from "../../components/LeftSideBarComponent";
import axios from "/config/axiosConfig";
import Swal from "sweetalert2";

const GlobalSetting = () => {
  const [errors, setErrors] = useState({});
  const [name, setName] = useState("");
  const [slugan, setSugan] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [fblink, setFacebookPagesLink] = useState("");
  const [youtubelink, setYoutubeChaneelLink] = useState("");
  const [about_us, setAboutus] = useState("");
  const [customer_message, setCustomerMessage] = useState("");
  const [bannerImage, setBannerImage] = useState(null);
  const [ongoingImage, setOngoingImage] = useState(null);
  const [completeImage, setCompleteImage] = useState(null);
  const [futureImage, setFutureImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [ongoingpreview, setOngoingPreview] = useState(null);
  const [completepreview, setCompletePreview] = useState(null);
  const [futurepreview, setFuturePreview] = useState(null);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file.");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size must be less than 2MB.");
        return;
      }
      setBannerImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleOngoingImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file.");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size must be less than 2MB.");
        return;
      }
      setOngoingImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setOngoingPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCompleteImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file.");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size must be less than 2MB.");
        return;
      }
      setCompleteImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setCompletePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFutureImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file.");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size must be less than 2MB.");
        return;
      }
      setFutureImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setFuturePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const defaultFetch = async () => {
    try {
      const response = await axios.get(`/setting/settingrowSystem`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = response.data.data;
      const bannerimage = response.data.banner_image;
      const ongoing_image = response.data.ongoing_image;
      const complete_image = response.data.complete_image;
      const future_image = response.data.future_image;

      setName(userData.name || "");
      setSugan(userData.slugan || "");
      setEmail(userData.email || "");
      setAddress(userData.address || "");
      setWhatsApp(userData.whatsApp || "");
      setFacebookPagesLink(userData.fblink || "");
      setYoutubeChaneelLink(userData.youtubelink || "");
      setAboutus(userData.about_us || "");
      setCustomerMessage(userData.customer_message || "");

      setPreview(bannerimage || "");
      setOngoingPreview(ongoing_image || "");
      setCompletePreview(complete_image || "");
      setFuturePreview(future_image || "");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("slugan", slugan);
      formData.append("email", email);
      formData.append("address", address);
      formData.append("about_us", about_us);
      formData.append("whatsApp", whatsApp);
      formData.append("fblink", fblink);
      formData.append("youtubelink", youtubelink);
      formData.append("customer_message", customer_message);

      if (bannerImage) {
        formData.append("banner_image", bannerImage);
      }

      if (ongoingImage) {
        formData.append("ongoing_image", ongoingImage);
      }

      if (completeImage) {
        formData.append("complete_image", completeImage);
      }

      if (futureImage) {
        formData.append("future_image", futureImage);
      }

      await axios.post("/setting/saveSetting", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Your data has been successfully saved.",
      });

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
        setErrors(error.response.data.errors);
      } else {
        console.error("Submission error:", error);
      }
    }
  };

  useEffect(() => {
    defaultFetch();
  }, []);

  return (
    <>
      <Helmet>
        <title>Add Global Setting</title>
      </Helmet>
      <div className="wrapper">
        <LeftSideBarComponent />
        <header>
          <GuestNavbar />
        </header>

        <div className="page-wrapper">
          <div className="page-content">
            <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
              <div className="breadcrumb-title pe-3">Global Setting</div>
              <div className="ps-3">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0 p-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">
                        <i className="bx bx-home-alt" />
                      </Link>
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="ms-auto">
                <button
                  type="button"
                  className="btn btn-black"
                  onClick={() => navigate("/wallet/global-wallet-address-list")}
                >
                  Back
                </button>
              </div>
            </div>

            <div className="card radius-10">
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  {[
                    {
                      label: "Company Name",
                      value: name,
                      setter: setName,
                      key: "name",
                    },
                    {
                      label: "Footer Top Title",
                      value: slugan,
                      setter: setSugan,
                      key: "slugan",
                    },
                    {
                      label: "WhatsApp Number",
                      value: whatsApp,
                      setter: setWhatsApp,
                      key: "whatsApp",
                    },
                    {
                      label: "Email",
                      value: email,
                      setter: setEmail,
                      key: "email",
                    },
                    {
                      label: "Address",
                      value: address,
                      setter: setAddress,
                      key: "address",
                    },
                    {
                      label: "Facebook Page Link",
                      value: fblink,
                      setter: setFacebookPagesLink,
                      key: "fblink",
                    },
                    {
                      label: "Youtube Channel Link",
                      value: youtubelink,
                      setter: setYoutubeChaneelLink,
                      key: "youtubelink",
                    },
                  ].map((field) => (
                    <div className="row mb-3" key={field.key}>
                      <label className="col-sm-3 col-form-label">
                        {field.label}
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          placeholder={field.label}
                          value={field.value}
                          onChange={(e) => field.setter(e.target.value)}
                        />
                        {errors[field.key] && (
                          <div style={{ color: "red" }}>
                            {errors[field.key][0]}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="row mb-3">
                    <label className="col-sm-3 col-form-label">About Us</label>
                    <div className="col-sm-9">
                      <textarea
                        className="form-control"
                        placeholder="About Us"
                        value={about_us}
                        rows={6}
                        onChange={(e) => setAboutus(e.target.value)}
                      ></textarea>
                      {errors.about_us && (
                        <div style={{ color: "red" }}>{errors.about_us[0]}</div>
                      )}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-3 col-form-label">
                      Customer Message
                    </label>
                    <div className="col-sm-9">
                      <textarea
                        className="form-control"
                        placeholder="About Us"
                        value={customer_message}
                        rows={10}
                        onChange={(e) => setCustomerMessage(e.target.value)}
                      ></textarea>
                      {errors.customer_message && (
                        <div style={{ color: "red" }}>
                          {errors.customer_message[0]}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-3 col-form-label">
                      Banner Image
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={handleImageChange}
                      />
                      {preview && (
                        <img
                          src={preview}
                          alt="Preview"
                          style={{ marginTop: "10px", maxWidth: "200px" }}
                        />
                      )}
                    </div>
                  </div>
                  Our service
                  <hr />
                  <div className="row">
                    {/* Ongoing Project */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label" style={{ color: 'green'}}>Complete Project</label>
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={handleOngoingImageChange}
                      />
                      {ongoingpreview && (
                        <img
                          src={ongoingpreview}
                          alt="Preview"
                          style={{
                            marginTop: "10px",
                            height: "500px",
                            maxWidth: "100%",
                          }}
                        />
                      )}
                    </div>

                    {/* Complete Project */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label" style={{ color: 'green'}}>Ongoing Project</label>
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={handleCompleteImageChange}
                      />
                      {completepreview && (
                        <img
                          src={completepreview}
                          alt="Preview"
                          style={{
                            marginTop: "10px",
                            height: "500px",
                            maxWidth: "100%",
                          }}
                        />
                      )}
                    </div>

                    {/* Future Project */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label" style={{ color: 'green'}}>Upcoming Project</label>
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={handleFutureImageChange}
                      />
                      {futurepreview && (
                        <img
                          src={futurepreview}
                          alt="Preview"
                          style={{
                            marginTop: "10px",
                            height: "500px",
                            maxWidth: "100%",
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Save Settings
                  </button>
                </form>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default GlobalSetting;
