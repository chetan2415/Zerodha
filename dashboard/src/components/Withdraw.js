import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Withdraw() {
  const navigate = useNavigate();

  const [balance, setBalance] = useState(10000); 
  const [profit, setProfit] = useState(2500); 
  const [loss, setLoss] = useState(500); 
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [userMobile, setUserMobile] = useState(""); 

  useEffect(() => {
    const storedMobile = localStorage.getItem("userMobile");
    if (storedMobile) {
        setUserMobile(storedMobile);
    }
}, []);

// Function to fetch bank account status
const fetchBankAccountStatus = () => {
    if (userMobile) {
        axios.get(`http://localhost:5000/accounts/checkAccount?mobile=${userMobile}`)
            .then((res) => {
                console.log("Bank account status response:", res.data);
                setHasAccount(res.data.hasAccount);
            })
            .catch((error) => console.error("Error checking account:", error));
    }
};

// Fetch account status when userMobile changes
useEffect(() => {
    fetchBankAccountStatus();
}, [userMobile]);

  const handleWithdraw = async (e) => {
    e.preventDefault();

    // Fetch latest bank account status
    fetchBankAccountStatus();

    // Wait to ensure updated data is available
    setTimeout(async () => {
        if (!hasAccount) {
            alert("No bank account linked! Please add a bank account first.");
            navigate("/Account");
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/Withdraw", { withdrawAmount: Number(withdrawAmount) });
            alert("Withdrawal successful!");
            setWithdrawAmount("");
        } catch (error) {
            console.error("Error processing withdrawal:", error);
            alert("Failed to process withdrawal. Please try again.");
        }
    }, 500); // Small delay to ensure state update
};


  return (
    <div className="withdraw-container">
      <h3>Withdraw Funds</h3>

      <div className="balance-info">
        <p className="with"><strong>Balance:</strong> ₹{balance.toFixed(2)}</p>
        <p className="with"><strong>Profit:</strong> ₹{profit.toFixed(2)}</p>
        <p className="with"><strong>Loss:</strong> ₹{loss.toFixed(2)}</p>
      </div><br/><br/>

      <form onSubmit={handleWithdraw} className="withdraw-form">
        <label className="With">Enter Withdrawal Amount:</label>
        <br/>
        <input
          type="number"
          className="form-control"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
          placeholder="Enter amount"
          required
        />&nbsp;&nbsp;&nbsp;
        <button type="submit" className="btn btn-primary mt-3">Withdraw</button>
      </form><br/>
      
      <div className="acc">
        <p>
        You can withdraw an amount up to your available balance. Please ensure that the withdrawal amount does not exceed your current balance. Any withdrawal request will be processed securely, and the amount will be deducted from your account accordingly. Withdrawals may be subject to processing times depending on your bank. Additionally, ensure that your bank details are correctly linked to avoid any delays. For security reasons, Zerodha does not request sensitive information such as OTPs or passwords for withdrawals. Always verify withdrawal transactions through your registered email or mobile number. If you face any issues, contact support immediately.
        </p>
      </div>
    </div>
  );
}

export default Withdraw;
