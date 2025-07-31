import React, { useRef, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import LeftSideBarComponent from "../../components/LeftSideBarComponent";
import EditorComponent from "../../components/EditorComponent";
import axios from "/config/axiosConfig";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PostAdd = () => {
  const [errors, setErrors] = useState({});
  const [name, setName] = useState("");
  const [post_category_id, setPostCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(1);
  const [categoryData, setCategoryData] = useState([]);
  const token = JSON.parse(sessionStorage.getItem("token"));
  const id = "";
  const [bannerImage, setBannerImage] = useState(null);
  const [preview, setPreview] = useState(null);
  //const [description, setNameDescription] = useState("");
  const handleRemoveImage = (indexToRemove) => {
    setPreview(preview.filter((_, index) => index !== indexToRemove));
    setBannerImage(bannerImage.filter((_, index) => index !== indexToRemove));
  };
  const defaultFetch = async () => {
    try {
      const response = await axios.get(`/category/getPostCategory`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //const userData = response.data;
      if (response.data) {
        setCategoryData(response.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        id,
        name,
        post_category_id,
        bannerImage,
        description,
        status,
      };
      const response = await axios.post("/post/postInsert", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      //console.log(response.data);
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

      // Reset form fields and errors
      setName("");
      setStatus("");
      setErrors({});
      //console.log(response.data.message);
      navigate("/post/post-list");
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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const maxSize = 2 * 1024 * 1024; // 2MB

    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        alert(`"${file.name}" is not a valid image file.`);
        return false;
      }
      if (file.size > maxSize) {
        alert(`"${file.name}" exceeds 2MB size limit.`);
        return false;
      }
      return true;
    });

    setBannerImage(validFiles);

    const previewPromises = validFiles.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(previewPromises).then((results) => {
      setPreview(results);
    });
  };

  const navigate = useNavigate();
  const handleAddNewClick = () => {
    navigate("/post/post-list");
  };

  useEffect(() => {
    defaultFetch();
  }, []);

  return (
    <>
      <Helmet>
        <title>Add Post</title>
      </Helmet>

      <div>
        <div className="wrapper">
          <LeftSideBarComponent />
          <header>
            <GuestNavbar />
          </header>

          <div className="page-wrapper">
            <div className="page-content">
              <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                <div className="breadcrumb-title pe-3">Post</div>
                <div className="ps-3">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0 p-0">
                      <li className="breadcrumb-item">
                        <Link to="/dashboard">
                          <i className="bx bx-home-alt" />
                        </Link>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Add New
                      </li>
                    </ol>
                  </nav>
                </div>
                <div className="ms-auto">
                  <button
                    type="button"
                    className="btn btn-black"
                    onClick={handleAddNewClick}
                  >
                    Back
                  </button>
                </div>
              </div>

              <div className="card radius-10">
                {/* Start */}
                <div className="card-body p-4">
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <label
                        htmlFor="input42"
                        className="col-sm-3 col-form-label"
                      >
                        Post Title
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          id="input42"
                          placeholder="Enter Title"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && (
                          <div style={{ color: "red" }}>{errors.name[0]}</div>
                        )}
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="input46"
                        className="col-sm-3 col-form-label"
                      >
                        Post Category
                      </label>
                      <div className="col-sm-9">
                        <select
                          className="form-select"
                          id="input46"
                          value={post_category_id}
                          onChange={(e) => setPostCategoryId(e.target.value)}
                        >
                          <option value="">Select Post Category</option>
                          {categoryData.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                        {errors.post_category_id && (
                          <div style={{ color: "red" }}>
                            {errors.post_category_id[0]}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="input42"
                        className="col-sm-3 col-form-label"
                      >
                        Description
                      </label>
                      <div className="col-sm-9">
                        <EditorComponent
                          className="form-control"
                          value={description}
                          onChange={setDescription} // The onChange prop will call setDescription to update the state
                        />
                        {/* <textarea
                                                    className="form-control"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    placeholder="Enter Description"/> */}
                        {errors.description && (
                          <div style={{ color: "red" }}>
                            {errors.description[0]}
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
                          multiple
                          accept="image/*"
                          className="form-control"
                          onChange={handleImageChange}
                        />
                        {Array.isArray(preview) && preview.length > 0 && (
                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                              flexWrap: "wrap",
                              marginTop: "10px",
                            }}
                          >
                            {preview.map((src, index) => (
                              <div
                                key={index}
                                style={{
                                  position: "relative",
                                  display: "inline-block",
                                }}
                              >
                                <img
                                  src={src}
                                  alt={`preview-${index}`}
                                  style={{
                                    maxWidth: "150px",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImage(index)}
                                  style={{
                                    position: "absolute",
                                    top: "5px",
                                    right: "5px",
                                    background: "red",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "50%",
                                    width: "25px",
                                    height: "25px",
                                    cursor: "pointer",
                                  }}
                                >
                                  &times;
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="input46"
                        className="col-sm-3 col-form-label"
                      >
                        Status
                      </label>
                      <div className="col-sm-9">
                        <select
                          className="form-select"
                          id="input46"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="">Select Status</option>
                          <option value={1}>Active</option>
                          <option value={0}>Inactive</option>
                        </select>
                        {errors.status && (
                          <div style={{ color: "red" }}>{errors.status[0]}</div>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <label className="col-sm-3 col-form-label" />
                      <div className="col-sm-9">
                        <button type="submit" className="btn btn-primary px-4">
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                {/* END */}
              </div>
            </div>
          </div>

          <div className="overlay toggle-icon" />
          <Link to="#" className="back-to-top">
            <i className="bx bxs-up-arrow-alt" />
          </Link>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default PostAdd;
