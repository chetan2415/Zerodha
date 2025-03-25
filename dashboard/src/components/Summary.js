import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

const Summary = () => {
  const [username, setUsername] = useState("User");

  const [goldPrice] = useState(175890);
  const [silverPrice] = useState(2000);
  const [platinumPrice] = useState(96000);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const metalPriceData = [
    { date: "Day 1", gold: 174500, silver: 1950, platinum: 95000 },
    { date: "Day 2", gold: 174800, silver: 1975, platinum: 95250 },
    { date: "Day 3", gold: 175200, silver: 1980, platinum: 95500 },
    { date: "Day 4", gold: 175500, silver: 1990, platinum: 95800 },
    { date: "Day 5", gold: 175700, silver: 2005, platinum: 96050 },
    { date: "Day 6", gold: 175900, silver: 2010, platinum: 96100 },
    { date: "Today", gold: 175890, silver: 2000, platinum: 96000 }
  ];

  return (
    <>
      <div className="username">
        <h6>Hi, {username}!</h6>
        <hr className="divider" />
      </div>

      {/* Equity Section */}
      <div className="section">
        <span><p>Equity</p></span>
        <div className="data">
          <div className="first">
            <h3>3.74k</h3>
            <p>Margin available</p>
          </div>
          <hr />
          <div className="second">
            <p>Margins used <span>0</span></p>
            <p>Opening balance <span>3.74k</span></p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      {/* Holdings Section */}
      <div className="section">
        <span><p>Holdings (13)</p></span>
        <div className="data">
          <div className="first">
            <h3 className="profit">
              1.55k <small>+5.20%</small>
            </h3>
            <p>P&L</p>
          </div>
          <hr />
          <div className="second">
            <p>Current Value <span>31.43k</span></p>
            <p>Investment <span>29.88k</span></p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      {/* Metal Prices (Single Row) */}
      <div className="section">
        <span><p>Metal Prices</p></span>
        <div className="data" style={{ display: "flex", justifyContent: "space-around", textAlign: "center", padding: "10px" }}>
          <div className="first" style={{ flex: 1, margin: "0 10px" }}>
            <h4 style={{ fontSize: "14.4px", marginBottom: "5px", opacity:"0.6" }}>Gold: ₹{goldPrice.toLocaleString("en-IN")}</h4>
            <p style={{ fontSize: "14.4px", color: "#666" }}>Per 10g</p>
          </div>
          <div className="first" style={{ flex: 1, margin: "0 10px" }}>
            <h4 style={{ fontSize: "14.4px", marginBottom: "5px",opacity:"0.6" }}>Silver: ₹{silverPrice.toLocaleString("en-IN")}</h4>
            <p style={{ fontSize: "14.4px", color: "#666" }}>Per 10g</p>
          </div>
          <div className="first" style={{ flex: 1, margin: "0 10px" }}>
            <h4 style={{ fontSize: "14.4px", marginBottom: "5px",opacity:"0.6" }}>Platinum: ₹{platinumPrice.toLocaleString("en-IN")}</h4>
            <p style={{ fontSize: "14.4px", color: "#666" }}>Per 10g</p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      {/* Combined Metal Price Trend Graph */}
      <div className="section">
        <span><p>Metal Price Trend (Last 7 Days)</p></span>
        <div className="chart-container" style={{ width: "100%", height: 300, padding: "10px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={metalPriceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Line type="monotone" dataKey="gold" stroke="#FFD700" strokeWidth={2} name="Gold" />
              <Line type="monotone" dataKey="silver" stroke="#C0C0C0" strokeWidth={2} name="Silver" />
              <Line type="monotone" dataKey="platinum" stroke="#E5E4E2" strokeWidth={2} name="Platinum" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
