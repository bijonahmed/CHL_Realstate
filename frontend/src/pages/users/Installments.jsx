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

const Installments = () => {
  const navigate = useNavigate();
  const { getToken, token, logout } = AuthUser();
  const [installments, setInstallments] = useState([]);
  const [rembalance, setRembalance] = useState();
  const [buyAmt, setbuyAmt] = useState();

  const defaultFetch = async () => {
    try {
      if (!token) {
        throw new Error("Token not found in sessionStorage");
      }
      const response = await axios.get(`/installment/installmentUserData`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        setInstallments(response.data.installment);
        setRembalance(response.data.rembalance);
        setbuyAmt(response.data.buyAmt);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const totalAmount = installments.reduce(
    (sum, item) => sum + parseFloat(item.amount || 0),
    0
  );
  useEffect(() => {
    defaultFetch();

    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Helmet>
        <title>Installment</title>
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
                    Installment List
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
                    <h5 className="mb-0">Installment List</h5>
                  </div>

                  <div className="card-body p-4">
                    <div className="overflow-x-auto">
                      <table className="table table-bordered table-sm w-100">
                        <thead className="table-light">
                          <tr>
                            <th>ID</th>
                            <th>Payment Date</th>
                            <th className="text-center">Amount</th>
                            <th className="text-center">Payment Method</th>
                            <th className="text-center">Image</th>
                          </tr>
                        </thead>
                        <tbody>
                          {installments.map((item, index) => (
                            <tr key={index}>
                              <td style={{ backgroundColor: "#ffffff" }}>
                                {item.id}
                              </td>
                              <td style={{ backgroundColor: "#f8f9fa" }}>
                                {item.payment_date}
                              </td>
                              <td
                                className="text-end"
                                style={{ backgroundColor: "#e7f1ff" }}
                              >
                                {item.amount}
                              </td>
                              <td
                                className="text-center"
                                style={{ backgroundColor: "#d4edda" }}
                              >
                                {item.payment_method}
                              </td>
                              <td
                                className="text-center"
                                style={{ backgroundColor: "#fff3cd" }}
                              >
                                <img
                                  src={item.image}
                                  alt="Payment"
                                  style={{ maxHeight: "150px" }}
                                  className="img-thumbnail"
                                />
                              </td>
                            </tr>
                          ))}

                          {/* Summary Rows */}
                          <tr style={{ backgroundColor: "#e2e3e5" }}>
                            <th></th>
                            <th>Buying Amount:</th>
                            <th className="text-end">Tk. {buyAmt}</th>
                            <th></th>
                            <th></th>
                          </tr>
                          <tr style={{ backgroundColor: "#d1ecf1" }}>
                            <th></th>
                            <th>Total Paid Amount:</th>
                            <th className="text-end">
                              Tk. {totalAmount.toFixed(2)}
                            </th>
                            <th></th>
                            <th></th>
                          </tr>
                          <tr style={{ backgroundColor: "#f8d7da" }}>
                            <th></th>
                            <th>Remaining Balance:</th>
                            <th className="text-end">Tk. {rembalance}</th>
                            <th></th>
                            <th></th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
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

export default Installments;
