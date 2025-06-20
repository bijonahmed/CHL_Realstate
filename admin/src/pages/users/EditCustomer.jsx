import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../../components/Navbar";
import { Link, useParams, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import LeftSideBarComponent from "../../components/LeftSideBarComponent";
import axios from "/config/axiosConfig";
import Swal from "sweetalert2";



const EditCustomer = () => {

  const [errors, setErrors] = useState({});
  const [name, setName] = useState("");
  const [status, setStatus] = useState(1);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [buying_amt, setBuyingAmt] = useState("");
  const [username, setUsername] = useState("");
  const [rule_id, setRuleId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPassword] = useState("");
  const [roles, setRuleData] = useState([]);
  const token = JSON.parse(sessionStorage.getItem("token"));
  const { id } = useParams();

  const apiUrl = "/user/getUserRow";

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

  const defaultFetch = async () => {
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { userId: id },  // or simply { userId } using shorthand
      });
      const userData = response.data.data;
      
        setName(userData.name || "");
        setEmail(userData.email || "");
        setPhone(userData.phone || "");
        setBuyingAmt(userData.buying_amt || "");
        setUsername(userData.username || "");
        setRuleId(userData.role_id || "");
        setStatus(userData.status === 1 || userData.status === 0 ? userData.status : "");

    } catch (error) {
      console.error("Error fetching user data:", error);
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
  const handleConfigAmt = (e) => {
    setBuyingAmt(e.target.value);
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
  const handleConfigStatus = (e) => {
    setStatus(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("buying_amt", buying_amt);
      formData.append("username", username);
      formData.append("rule_id", rule_id);
      formData.append("password", password);
      // formData.append("confirmPass", confirmPass);
      formData.append("status", status);

      const response = await axios.post("/user/updateCustomer", formData, {
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

      // Reset form fields and errors
      setName("");
      setStatus("");
      setErrors({});
      //console.log(response.data.message);
      navigate("/user/customer-list");
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
    navigate('/user/merchant-list');
  };

  useEffect(() => {
    defaultFetch();
    fetchRuleData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Edit Customer</title>
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
                <div className="breadcrumb-title pe-3">Edit Customer</div>
                <div className="ps-3">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0 p-0">
                      <li className="breadcrumb-item">
                        <Link to="/dashboard"><i className="bx bx-home-alt" /></Link>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">Edit</li>
                    </ol>
                  </nav>
                </div>
                <div className="ms-auto">
                  {/* <button type="button" className="btn btn-black" onClick={handleAddNewClick}>Back</button> */}
                </div>
              </div>

              <div className="card radius-10">

                {/* Start */}
                <div className="card-body p-4">
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <label htmlFor="input42" className="col-sm-3 col-form-label">Name</label>
                      <div className="col-sm-9">
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control"
                            id="input42"
                            placeholder="Enter Name"
                            value={name}
                            onChange={handleConfigName}
                          />
                          {errors.name && (<div style={{ color: "red" }}>{errors.name[0]}</div>)}
                        </div>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="input42" className="col-sm-3 col-form-label">Email</label>
                      <div className="col-sm-9">
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control"
                            id="input42"
                            placeholder="Enter Email"
                            value={email}
                            onChange={handleConfigEmail}
                          />
                          {errors.email && (<div style={{ color: "red" }}>{errors.email[0]}</div>)}
                        </div>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="input42" className="col-sm-3 col-form-label">Phone</label>
                      <div className="col-sm-9">
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control"
                            id="input42"
                            placeholder="Enter Phone"
                            value={phone}
                            onChange={handleConfigPhone}
                          />
                          {errors.phone && (<div style={{ color: "red" }}>{errors.phone[0]}</div>)}
                        </div>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="input42" className="col-sm-3 col-form-label">Buying Amount</label>
                      <div className="col-sm-9">
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control"
                            id="input42"
                            placeholder="Buying Amount"
                            value={buying_amt}
                            onChange={handleConfigAmt}
                          />
                          {errors.buying_amt && (<div style={{ color: "red" }}>{errors.buying_amt[0]}</div>)}
                        </div>
                      </div>
                    </div>


                    <div className="row mb-3 d-none">
                      <label htmlFor="input46" className="col-sm-3 col-form-label">User Rule</label>
                      <div className="col-sm-9">
                        <select
                          className="form-select"
                          id="input46"
                          disabled
                          value={rule_id}
                          onChange={handleConfigRuleId}>
                          <option value="">Select Role</option>
                          {roles.map((role) => (
                            <option key={role.id} value={role.id}>{role.name}</option>
                          ))}
                        </select>
                        {errors.rule_id && (<div style={{ color: "red" }}>{errors.rule_id[0]}</div>)}
                      </div>
                    </div>



                    <div className="row mb-3">
                      <label htmlFor="input42" className="col-sm-3 col-form-label">Username</label>
                      <div className="col-sm-9">
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control"
                            id="input42"
                            placeholder="Username"
                            value={username}
                            onChange={handleConfigUsername}
                          />
                          {errors.username && (<div style={{ color: "red" }}>{errors.username[0]}</div>)}
                        </div>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="input42" className="col-sm-3 col-form-label">Password</label>
                      <div className="col-sm-9">
                        <div className="position-relative">
                          <input
                            type="password"
                            className="form-control"
                            id="input42"
                            placeholder="Enter Password"
                            value={password}
                            onChange={handleConfigPassword}
                          />
                          {errors.password && (<div style={{ color: "red" }}>{errors.password[0]}</div>)}
                        </div>
                      </div>
                    </div>

                    <div className="row mb-3 d-none">
                      <label htmlFor="input42" className="col-sm-3 col-form-label">Confirm Password</label>
                      <div className="col-sm-9">
                        <div className="position-relative">
                          <input
                            type="password"
                            className="form-control"
                            id="input42"
                            placeholder="Enter Confirm Password"
                            value={confirmPass}
                            onChange={handleConfirmPassword}
                          />
                          {errors.password_confirmation && (<div style={{ color: "red" }}>{errors.password_confirmation[0]}</div>)}
                        </div>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="input46" className="col-sm-3 col-form-label">Status</label>
                      <div className="col-sm-9">
                        <select
                          className="form-select"
                          id="input46"
                          value={status}
                          onChange={handleConfigStatus}>
                          <option value="">Select Status</option>
                          <option value={1}>Active</option>
                          <option value={0}>Inactive</option>
                        </select>
                        {errors.status && (<div style={{ color: "red" }}>{errors.status[0]}</div>)}
                      </div>
                    </div>

                    <div className="row">
                      <label className="col-sm-3 col-form-label" />
                      <div className="col-sm-9">
                        <div className="d-md-flex d-grid align-items-center gap-3">
                          <button type="submit" className="btn btn-primary px-4">Submit</button>

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
          <Link to="#" className="back-to-top"><i className="bx bxs-up-arrow-alt" /></Link>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default EditCustomer;