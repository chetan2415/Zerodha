import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Account() {
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const { data } = await axios.get("https://zerodha-backend-4ntj.onrender.com/accounts/checkAccount");
        if (data?.hasAccount) {
          setAccount(data.account);
        } else {
          setAccount(null);
        }
      } catch (error) {
        console.error("Error fetching account:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, []);

  // Handle Add Account navigation
  const handleAddAccount = () => {
    navigate("/addAccount");
  };

  // Handle Account Removal
  const handleRemoveAccount = async () => {
    if (!account) return;

    if (!window.confirm("Are you sure you want to remove this account?")) return;

    try {
      await axios.delete("https://zerodha-backend-4ntj.onrender.com/accounts/removeAccount", {
        data: { mobile: account.mobile },
      });

      alert("Account removed successfully!");
      setAccount(null);
    } catch (error) {
      console.error("Error removing account:", error);
      alert("Failed to remove account. Please try again.");
    }
  };

  return (
    <div id="account-management" style={{ marginTop: "5rem" }}>
      <h3 className="heading">Bank Account Management</h3>

      {loading ? (
        <p>Loading...</p>
      ) : account ? (
        <div>
          <p><strong>Account Holder:</strong> {account.accountHolder}</p>
          <p><strong>Account Number:</strong> {account.accountNumber}</p>
          <p><strong>IFSC Code:</strong> {account.ifscCode}</p>
          <p><strong>Bank Name:</strong> {account.bankName}</p>
          <button onClick={handleRemoveAccount} className="btn btn-danger mt-3">
            Remove Account
          </button>
        </div>
      ) : (
        <Link to="/Account" onClick={handleAddAccount} className="btn btn-primary mt-3">
          Add Account
        </Link>
      )}

      <p className="text mt-5">
        Zerodha will not share your bank details with any third party...
      </p>
    </div>
  );
}

export default Account;
