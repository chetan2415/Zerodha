import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";

import "./SellActionWindow.css"; 

const SellActionWindow = ({ uid }) => {
  const { closeSellWindow } = useContext(GeneralContext); 
  const navigate = useNavigate();

  const [stockQuantity, setStockQuantity] = useState(1);

  const [stockPrice, setStockPrice] = useState(0.0);
  const [availableQty, setAvailableQty] = useState(0);
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

  useEffect(() => {
    const fetchAvailableStock = async () => {
      try {
        const res = await axios.get("http://localhost:5000/newOrders");
        const buyOrders = res.data.filter(order => order.name === uid && order.mode === "BUY");
        const sellOrders = res.data.filter(order => order.name === uid && order.mode === "SELL");

        const totalBuy = buyOrders.reduce((sum, order) => sum + order.qty, 0);
        const totalSell = sellOrders.reduce((sum, order) => sum + order.qty, 0);
        
        setAvailableQty(totalBuy - totalSell);
      } catch (error) {
        console.error("Error fetching available stock:", error);
      }
    };

    fetchAvailableStock();
  }, [uid]);

  const handleSellClick = async () => {
    // Fetch latest bank account status
    fetchBankAccountStatus();

    // Wait to ensure updated data is available
    setTimeout(async () => {
        if (!hasAccount) {
            alert("No bank account linked! Please add a bank account first.");
            return;
        }
        if (stockQuantity > availableQty) {
            alert(`You cannot sell more than ${availableQty} stocks`);
            return;
        }

        try {
            await axios.post("http://localhost:5000/newOrder", {
                name: uid,
                qty: stockQuantity,
                price: stockPrice,
                mode: "SELL",
            });
            alert("Stock sold successfully!");
            closeSellWindow();
        } catch (error) {
            console.error("Sell order Error:", error.response?.data || error.message);
            alert("Failed to process the sell order. Please try again.");
        }
    }, 500); // Small delay to ensure state update
};


  return (
    <div className="sell-container" id="sell-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty. (Available: {availableQty})</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              max={availableQty}
              onChange={(e) => setStockQuantity(Number(e.target.value))}
              value={stockQuantity}
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(Number(e.target.value))}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin received to sale ₹{(stockQuantity * stockPrice).toFixed(2)}</span>
        <div>
          <Link className="btn btn-red" onClick={handleSellClick}>Sell</Link>
          <Link to="" className="btn btn-grey" onClick={closeSellWindow}>Cancel</Link>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
