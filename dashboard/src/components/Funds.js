import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Funds = () => {
  const [hasAccount, setHasAccount] = useState(false);
  const [userMobile, setUserMobile] = useState("");
  const [loading, setLoading] = useState(true); // For handling data loading
  const navigate = useNavigate();

  useEffect(() => {
    const storedMobile = localStorage.getItem("userMobile");
    if (storedMobile) {
      setUserMobile(storedMobile);
      checkBankAccount(storedMobile); // Initial account status check
    }else{
      setLoading(false);
    }
  }, []);

  // Function to check bank account status
  const checkBankAccount = async (mobile) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/accounts/checkAccount?mobile=${mobile}`);
      setHasAccount(data.hasAccount);
    } catch (error) {
      console.error("Error checking account status:", error);
      alert("Failed to check account status. Please try again.");
    } finally {
      setLoading(false); // Set loading to false once the check completes
    }
  };

  // Handle navigation with account status check
  const handleNavigation = (path) => {
    if (!hasAccount) {
      alert("No bank account linked! Please add a bank account first.");
      navigate("/Account");
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI</p>

        {loading ? (
          <p>Checking account status...</p> // Loader when fetching data
        ) : (
          <>
            <button
              className="btn btn-green"
              onClick={() => handleNavigation("/AddAmount")}
              disabled={!hasAccount} // Disable button if no linked account
            >
              Add funds
            </button>

            <button
              className="btn btn-blue"
              onClick={() => handleNavigation("/Withdraw")}
              disabled={!hasAccount} // Disable button if no linked account
            >
              Withdraw
            </button>

            {!hasAccount && (
              <p className="alert-message">
                No linked bank account found. Please add your bank account.
              </p>
            )}
          </>
        )}
      </div>

      <div className="row">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">4,043.10</p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">3,757.30</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">4,043.10</p>
            </div>
            <hr />
            <div className="data">
              <p>Opening Balance</p>
              <p>4,043.10</p>
            </div>
            <div className="data">
              <p>Opening Balance</p>
              <p>3736.40</p>
            </div>
            <div className="data">
              <p>Payin</p>
              <p>4064.00</p>
            </div>
            <div className="data">
              <p>SPAN</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Delivery margin</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Exposure</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Options premium</p>
              <p>0.00</p>
            </div>
            <hr />
            <div className="data">
              <p>Collateral (Liquid funds)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Collateral (Equity)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Total Collateral</p>
              <p>0.00</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            <Link className="btn btn-blue" to={"/Account"}>Open Account</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;
