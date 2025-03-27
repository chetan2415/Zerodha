import React, { useState, useEffect } from "react";
import axios from "axios";

const Sell = () => {
  const [allsell, setAllSell] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("https://zerodha-backend-4ntj.onrender.com/newOrders");
      const sellOrders = res.data.filter(order => order.mode === "SELL");
      setAllSell(sellOrders);
    } catch (err) {
      console.error("Axios error:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <h3 className="title">Sells ({allsell.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Mode</th>
            </tr>
          </thead>
          <tbody>
            {allsell.map((stock, index) => (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{parseFloat(stock.price).toFixed(2)}</td>
                <td>{stock.mode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Sell;
