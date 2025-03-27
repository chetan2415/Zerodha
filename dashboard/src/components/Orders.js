import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

  // Fetch Orders from Database
  const fetchOrders = async () => {
    try {
      const res = await axios.get("https://zerodha-backend-4ntj.onrender.com/newOrders");
      //console.log("Fetched Orders:", res.data);
      setAllOrders(res.data);
    } catch (err) {
      console.error("Axios error:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  },[]);

  return (
    <>
      <h3 className="title">Orders ({allOrders.length})</h3>

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
            {allOrders.map((stock, index) => (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td>{stock.mode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;
