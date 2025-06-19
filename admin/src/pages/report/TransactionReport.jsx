import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import LeftSideBarComponent from "../../components/LeftSideBarComponent";
import Pagination from "../../components/Pagination";
import axios from "/config/axiosConfig";

import "../../components/css/RoleList.css";

const TransactionReport = () => {
  const [merchantdata, setMerchantData] = useState([]);
  const [data, setData] = useState([]);
  const [customerId, setCusId] = useState("");
  const [customer_id, setCustomer] = useState("");
  const [buy_amount, setBuyingAmount] = useState();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);

  const rawToken = sessionStorage.getItem("token");
  const token = rawToken?.replace(/^"(.*)"$/, "$1");
  const apiUrl = "/report/filterByReport";

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
      if (response.data.data) {
        setMerchantData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      if (!token) {
        throw new Error("Token not found in sessionStorage");
      }
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          fromDate,
          toDate,
          customer_id,
        },
      });

      if (response.data) {
        setData(response.data.rdata);
        setBuyingAmount(response.data.buying_amount);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate the total deposit amount
  const totalDepositAmount = data.reduce(
    (sum, item) => sum + parseFloat(item.deposit_amount || 0),
    0
  );

  useEffect(() => {
    const today = new Date();
    const priorDate = new Date();
    priorDate.setDate(today.getDate() - 20);

    // Format: YYYY-MM-DD
    const formatDate = (date) => {
      return date.toISOString().split("T")[0];
    };

    setToDate(formatDate(today));
    setFromDate(formatDate(priorDate));
  }, []);

  const totalPaidAmount = data.reduce(
    (sum, item) => sum + Number(item.total_paid),
    0
  );

  const remainingBalance = Number(buy_amount) - totalPaidAmount;

  const handlePrint = () => {
    // Get the div content
    const printContent = document.getElementById("printSection").innerHTML;

    // Open a new window
    const printWindow = window.open("", "", "width=900,height=650");
    // Write the content including bootstrap CSS for styling
    printWindow.document.write(`
    <html>
      <head>
        <title>Print Report</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <style>
          body {
            padding: 20px;
            font-family: Arial, sans-serif;
            background: white;
            color: black;
          }
          table, th, td {
            border: 1px solid #ccc;
            border-collapse: collapse;
          }
          th, td {
            padding: 8px 12px;
          }
          table {
            width: 100%;
          }
          /* Avoid breaking table rows */
          tr, td, th {
            page-break-inside: avoid;
          }
        </style>
      </head>
      <body>
        ${printContent}
      </body>
    </html>
  `);

    printWindow.document.close();

    // Wait for content to load then print and close
    printWindow.focus();
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  };
  // Correctly closed useEffect hook
  useEffect(() => {
    fetchData();
    fetchCustomerData();
  }, [customer_id, fromDate, toDate]);

  return (
    <>
      <Helmet>
        <title>Transaction Report</title>
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
                <div className="breadcrumb-title pe-3">Transaction</div>
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
                        Report
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>

              <div className="card radius-10">
                <div className="card-body">
                  <div className="container-fluid">
                    <div className="search-pagination-container">
                      <div className="row align-items-center mb-3">
                        <div className="col-12 col-md-2 mb-2 mb-md-0 d-none">
                          <div className="searchbar">
                            <input
                              type="text"
                              placeholder="Installment ID..."
                              className="form-control"
                              value={customerId}
                              onChange={(e) => setCusId(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-12 col-md-3 mb-3 mb-md-0">
                          <select
                            style={{ height: "46px" }}
                            className="form-select"
                            value={customer_id}
                            onChange={(e) => setCustomer(e.target.value)} // ✅ This line is important
                            id="input46"
                          >
                            <option value="">All Customer</option>
                            {merchantdata.map((user) => (
                              <option key={user.id} value={user.id}>
                                {user.name} | {user.phone}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* From Date */}
                        <div className="col-12 col-md-2 mb-2 mb-md-0">
                          <div className="searchbar">
                            <input
                              type="date"
                              className="form-control"
                              value={fromDate}
                              onChange={(e) => setFromDate(e.target.value)}
                            />
                          </div>
                        </div>

                        {/* To Date */}
                        <div className="col-12 col-md-2 mb-2 mb-md-0">
                          <div className="searchbar">
                            <input
                              type="date"
                              className="form-control"
                              value={toDate}
                              onChange={(e) => setToDate(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-12 col-md-3 mb-2 mb-md-0">
                          <div className="searchbar">
                            <button
                              type="button"
                              className="btn btn-primary w-100"
                              onClick={fetchData}
                            >
                             <i className="fas fa-filter"></i>  Filter
                            </button>

                             
                          </div>
                        </div>

                         <div className="col-12 col-md-2 mb-2 mb-md-0">
                          <div className="searchbar">
                            
                            <button
                              className="btn btn-primary mb-3 mt-2"
                              onClick={handlePrint}
                            >
                              🖨️ Print
                            </button>
                          </div>
                        </div>
                      </div>

                      {loading ? (
                        <div className="d-flex justify-content-center mt-3">
                          <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      ) : (
                        <div className="div_print" id="printSection">
                          <div className="table-responsive">
                            <table className="table align-middle mb-0 table-hover">
                              <thead className="table-light">
                                <tr>
                                  <th className="text-left">Installment ID</th>
                                  <th className="text-left">Customer Name</th>
                                  <th className="text-left">Payment Date</th>
                                  <th className="text-left">Paid Amount</th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.length > 0 ? (
                                  data.map((item) => (
                                    <tr key={item.id}>
                                      <td>{item.id}</td>
                                      <td className="text-left">
                                        {item.customername}
                                      </td>
                                      <td className="text-left">
                                        {item.payment_date}
                                      </td>
                                      <td className="text-left">
                                        {item.total_paid}
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan="9" className="text-center">
                                      No data found
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>

                          <div className="bg-light p-3 rounded shadow-sm mt-3 text-end">
                            {customer_id && (
                              <p className="fw-bold mb-2">
                                Buying Amount: {buy_amount}
                              </p>
                            )}
                            <p className="fw-bold mb-0">
                              Total Paid Amount:{" "}
                              {totalPaidAmount.toLocaleString()} BDT
                            </p>
                            {customer_id && (
                              <p className="fw-bold mb-2">
                                Remaining Balance:{" "}
                                {remainingBalance.toLocaleString()} BDT
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
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

export default TransactionReport;
