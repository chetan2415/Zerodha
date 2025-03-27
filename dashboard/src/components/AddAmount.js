import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddAmount() {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [userMobile, setUserMobile] = useState("");

  useEffect(() => {
    const storedMobile = localStorage.getItem("userMobile");
    if (storedMobile) {
      setUserMobile(storedMobile);
      checkBankAccount(storedMobile); // Initial account check on component load
    }
  }, []);

  // Function to fetch bank account status
  const checkBankAccount = async (mobile) => {
    try {
      const { data } = await axios.get(`https://zerodha-backend-4ntj.onrender.com/accounts/checkAccount?mobile=${mobile}`);
      console.log("Bank account status response:", data);
      setHasAccount(data.hasAccount);
    } catch (error) {
      console.error("Error checking account status:", error);
      alert("Failed to check account status. Please try again.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Re-check bank account status before proceeding
      const { data } = await axios.get(`https://zerodha-backend-4ntj.onrender.com/accounts/checkAccount?mobile=${userMobile}`);
      if (!data.hasAccount) {
        alert("No bank account linked! Please add a bank account first.");
        navigate("/Account");
        return;
      }

      // Proceed to add funds if account is present
      await axios.post("https://zerodha-backend-4ntj.onrender.com/addFunds", { amount: Number(amount) });
      alert("Amount added successfully!");
      setAmount("");
    } catch (error) {
      console.error("Error adding funds:", error);
      alert("Failed to add amount. Please try again.");
    }
  };

  return (
    <div className="amount">
      <div className="row">
        <div className="col">
          <h3 className="heading">Add Funds</h3><br />

          <form className="add" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="label">Enter Amount (₹):</label>
              <input
                type="number"
                className="form-control"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div><br />

            <button className="pay-button" disabled={!amount}>
              Pay
            </button><br />

            <div className="payment-options">
              <button className="pay-btn">UPI</button>
              <button className="pay-btn">Net Banking</button>
              <button className="pay-btn">Credit Card</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddAmount;
