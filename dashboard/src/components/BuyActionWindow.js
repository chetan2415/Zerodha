import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const { closeBuyWindow } = useContext(GeneralContext); 
  const navigate = useNavigate();

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [hasAccount, setHasAccount] = useState(null);
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

const handleBuyClick = async () => {
  // Fetch latest bank account status
  fetchBankAccountStatus();

  // Wait to ensure updated data is available
  setTimeout(async () => {
      if (!hasAccount) {
          alert("No bank account linked! Please add a bank account first.");
          return;
      }

      try {
          await axios.post("http://localhost:5000/newOrder", {
              name: uid,
              qty: stockQuantity,
              price: stockPrice,
              mode: "BUY",
          });
          alert("Stock purchase successful");
          closeBuyWindow();
      } catch (error) {
          console.error("Buy order Error:", error.response?.data || error.message);
          alert("Failed to process the buy order. Please try again.");
      }
  }, 500); // Small delay to ensure state update
};



  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input type="number" name="qty" id="qty" 
            onChange={(e) => setStockQuantity(e.target.value)} value={stockQuantity}/>
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            <input type="number" name="price" id="price" step="0.05" 
            onChange={(e) => setStockPrice(e.target.value)} value={stockPrice}/>
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹{(stockQuantity * stockPrice).toFixed(2)}</span>
        <div>
          <Link className="btn btn-blue" onClick={handleBuyClick}>Buy</Link>
          <Link to="" className="btn btn-grey" onClick={closeBuyWindow}>Cancel</Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;