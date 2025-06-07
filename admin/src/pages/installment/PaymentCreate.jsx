import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import LeftSideBarComponent from "../../components/LeftSideBarComponent";
import axios from "/config/axiosConfig";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PaymentCreate = () => {
  const [errors, setErrors] = useState({});
  const [customerId, setCustomerId] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const token = JSON.parse(sessionStorage.getItem("token"));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setImage(null);
      setPreviewImage(null);
      alert("Only image files are allowed!");
    }
  };

  const handleCustomerChange = (e) => {
    setCustomerId(e.target.value);
  };

  const fetchCustomerData = async () => {
    try {
      if (!token) {
        throw new Error("Token not found in sessionStorage");
      }
      const response = await axios.get(`/user/getCustomerData`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        // console.log("Customer Data:" + response.data);
        setCustomerList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("customer_id", customerId);
      formData.append("amount", amount);
      formData.append("payment_date", paymentDate);
      formData.append("payment_method", paymentMethod);
      formData.append("notes", notes);
      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post(
        "/installment/createPayment",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
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

         setErrors({});
      //console.log(response.data.message);
      navigate("/installment/pyament-list");
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

  const navigate = useNavigate();
  const handleAddNewClick = () => {
    navigate("/installment/pyament-list");
  };

  useEffect(() => {
    fetchCustomerData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Payment Create</title>
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
                <div className="breadcrumb-title pe-3">Payment Create</div>
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
                    {/* Customer Selection */}
                    <div className="row mb-3">
                      <label
                        htmlFor="customer_id"
                        className="col-sm-3 col-form-label"
                      >
                        Customer
                      </label>
                      <div className="col-sm-9">
                        <select
                          className="form-select"
                          id="customer_id"
                          value={customerId}
                          onChange={handleCustomerChange}
                        >
                          <option value="">Select a customer</option>
                          {Array.isArray(customerList) &&
                            customerList.map((customer) => (
                              <option key={customer.id} value={customer.id}>
                                {customer.name} | {customer.phone} |{" "}
                                {customer.email}
                              </option>
                            ))}
                        </select>
                        {errors.customer_id && (
                          <div className="text-danger mt-1">
                            {errors.customer_id[0]}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Email */}

                    {/* Phone */}

                    {/* Amount */}
                    <div className="row mb-3">
                      <label
                        htmlFor="amount"
                        className="col-sm-3 col-form-label"
                      >
                        Amount (৳)
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="number"
                          className="form-control"
                          id="amount"
                          placeholder="Enter installment amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                        {errors.amount && (
                          <div className="text-danger mt-1">
                            {errors.amount[0]}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Payment Date */}
                    <div className="row mb-3">
                      <label
                        htmlFor="payment_date"
                        className="col-sm-3 col-form-label"
                      >
                        Payment Date
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="date"
                          className="form-control"
                          id="payment_date"
                          value={paymentDate}
                          onChange={(e) => setPaymentDate(e.target.value)}
                        />
                        {errors.payment_date && (
                          <div className="text-danger mt-1">
                            {errors.payment_date[0]}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="row mb-3">
                      <label
                        htmlFor="payment_method"
                        className="col-sm-3 col-form-label"
                      >
                        Payment Method
                      </label>
                      <div className="col-sm-9">
                        <select
                          className="form-select"
                          id="payment_method"
                          value={paymentMethod}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                          <option value="">Select method</option>
                          <option value="cash">Cash</option>
                          <option value="bank">Bank</option>
                          <option value="mobile">Mobile Payment</option>
                          <option value="check">Check</option>
                        </select>
                        {errors.payment_method && (
                          <div className="text-danger mt-1">
                            {errors.payment_method[0]}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Upload Proof Image */}
                    <div className="row mb-3">
                      <label
                        htmlFor="image"
                        className="col-sm-3 col-form-label"
                      >
                        Upload Image
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="file"
                          className="form-control"
                          id="image"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                        {errors.image && (
                          <div className="text-danger mt-1">
                            {errors.image[0]}
                          </div>
                        )}
                        {previewImage && (
                          <div className="mt-2">
                            <img
                              src={previewImage}
                              alt="Preview"
                              style={{ maxWidth: "200px", borderRadius: "6px" }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Notes */}
                    <div className="row mb-3">
                      <label
                        htmlFor="notes"
                        className="col-sm-3 col-form-label"
                      >
                        Notes
                      </label>
                      <div className="col-sm-9">
                        <textarea
                          className="form-control"
                          id="notes"
                          placeholder="Optional notes about this payment"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          rows="3"
                        ></textarea>
                      </div>
                    </div>

                    {/* Submit */}
                    <div className="row">
                      <label className="col-sm-3 col-form-label" />
                      <div className="col-sm-9">
                        <div className="d-md-flex d-grid align-items-center gap-3">
                          <button
                            type="submit"
                            className="btn btn-success px-4"
                          >
                            Submit Installment
                          </button>
                        </div>
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

export default PaymentCreate;
