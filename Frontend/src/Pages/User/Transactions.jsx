import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
  FaSync,
  FaEye,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";
import API from "../../utils/API";
import { IoSyncSharp } from "react-icons/io5";
import { RiRefund2Fill } from "react-icons/ri";
import { HiOutlineReceiptRefund } from "react-icons/hi2";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await API.get("/payments/user");
      setTransactions(response.data.payments);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch transactions");
      toast.error(
        err.response?.data?.message || "Failed to fetch transactions"
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "SUCCESS":
        return <FaCheckCircle className="w-6 h-6 text-emerald-500" />;
      case "FAILED":
        return <FaTimesCircle className="w-6 h-6 text-red-500" />;
      case "PENDING":
        return <IoSyncSharp className="w-6 h-6 text-yellow-500" />;
      case "REFUNDED":
        return <HiOutlineReceiptRefund className="w-6 h-6 text-blue-500" />;
      default:
        return <FaExclamationCircle className="w-6 h-6 text-gray-500" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <FaExclamationCircle className="w-12 h-12 text-red-500" />
        <p className="text-lg text-gray-700">{error}</p>
        <button
          onClick={fetchTransactions}
          className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="bg-white rounded-lg">
        {/* Header */}
        <div className="border-b p-4 md:p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Transaction History
          </h1>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          {transactions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No transactions found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction._id}
                  className="border border-emerald-400 rounded-lg p-4 hover:shadow-md transition-shadow duration-500 bg-gray-50"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    {/* Left section */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 pt-1">
                        {getStatusIcon(transaction.status)}
                      </div>
                      <div className="space-y-1">
                        <p className="font-semibold text-gray-800">
                          Order #{transaction.orderId}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FaCalendarAlt className="w-4 h-4" />
                          {formatDate(transaction.createdAt)}
                          <FaClock className="w-4 h-4 ml-2" />
                          {formatTime(transaction.createdAt)}
                        </div>
                        <p className="text-sm text-gray-600">
                          Payment Method: {transaction.paymentMethod}
                        </p>
                      </div>
                    </div>

                    {/* Right section */}
                    <div className="flex flex-col md:items-end gap-2">
                      <p className="text-lg font-bold text-gray-800">
                        ₹{transaction.totalAmount.toFixed(2)}
                      </p>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${
                          transaction.status === "SUCCESS"
                            ? "bg-emerald-100 text-emerald-800"
                            : transaction.status === "FAILED"
                            ? "bg-red-100 text-red-800"
                            : transaction.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : transaction.status === "REFUNDED"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {transaction.status}
                      </span>
                      <button
                        onClick={() =>
                          navigate(`/order/${transaction.orderId}`)
                        }
                        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
                      >
                        <FaEye className="w-4 h-4 mr-1" />
                        View Order Details
                      </button>
                    </div>
                  </div>

                  {/* Items preview */}
                  <div className="mt-4 border-t pt-4">
                    <div className="flex flex-wrap gap-4">
                      {transaction.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 border p-2 rounded-md"
                        >
                          <img
                            src={
                              item.product.thumbnail || "/api/placeholder/60/60"
                            }
                            alt={item.product.name}
                            className="w-14 h-14 object-contain rounded-md border"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              {item.product.name}
                            </p>
                            <p className="text-xs text-gray-600">
                              Qty: {item.quantity} × ₹{item.itemPrice}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Show failure reason if payment failed */}
                  {transaction.status === "FAILED" &&
                    transaction.failureReason && (
                      <div className="mt-2 text-sm text-red-600">
                        Failure Reason: {transaction.failureReason}
                      </div>
                    )}

                  {/* Show refund info if payment was refunded */}
                  {transaction.status === "REFUNDED" && transaction.refund && (
                    <div className="mt-2 text-sm text-blue-600">
                      Refund ID: {transaction.refund.id}
                      <br />
                      Reason: {transaction.refund.reason}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
