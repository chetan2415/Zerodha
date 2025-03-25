import React from "react";
import { useParams } from "react-router-dom";
import { watchlist } from "../data/data";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Dummy data for Sensex & Nifty
const marketData = [
  { date: "Jan", Sensex: 52000, Nifty: 15400 },
  { date: "Feb", Sensex: 53000, Nifty: 15700 },
  { date: "Mar", Sensex: 51000, Nifty: 15200 },
  { date: "Apr", Sensex: 54000, Nifty: 16000 },
  { date: "May", Sensex: 55000, Nifty: 16250 },
];

// Profit & Loss Data (9 Stocks)
const stockPL = [
  { name: "INFY", price: 1555.45, percent: -1.6 },
  { name: "TCS", price: 3194.8, percent: -0.25 },
  { name: "WIPRO", price: 577.75, percent: 0.32 },
  { name: "RELIANCE", price: 2112.4, percent: 1.44 },
  { name: "HUL", price: 512.4, percent: 1.04 },
  { name: "HDFC", price: 2890.15, percent: -0.45 },
  { name: "ICICI", price: 789.65, percent: 0.75 },
  { name: "SBIN", price: 601.2, percent: -0.89 },
  { name: "AXIS", price: 812.4, percent: 1.12 },
];

const StockGraph = () => {
  const { stockName } = useParams(); // Get stock name from URL
  const stock = watchlist.find((item) => item.name === stockName);

  // Dummy data for stock price over a week
  const data = [
    { day: "Mon", price: stock ? stock.price - Math.random() * 20 : 0 },
    { day: "Tue", price: stock ? stock.price - Math.random() * 10 : 0 },
    { day: "Wed", price: stock ? stock.price : 0 },
    { day: "Thu", price: stock ? stock.price + Math.random() * 10 : 0 },
    { day: "Fri", price: stock ? stock.price + Math.random() * 20 : 0 },
  ];

  if (!stock) {
    return <p>Stock not found!</p>;
  }

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      {/* Stock-Specific Graph */}
      <h2 style={{fontSize:"14.4px", marginBottom:"4rem", marginTop:"2rem"}}>{stock.name} Stock Analysis</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <defs>
            <linearGradient id="shadow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={stock.isDown ? "red" : "green"} stopOpacity={0.4} />
              <stop offset="80%" stopColor={stock.isDown ? "red" : "green"} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="price"
            stroke={stock.isDown ? "red" : "green"}
            strokeWidth={2}
            fill="url(#shadow)"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Sensex & Nifty Graph */}
      <h2 style={{fontSize:"14.4px", marginBottom:"4rem", marginTop:"4rem"}}>Sensex & Nifty Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={marketData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Sensex" stroke="blue" strokeWidth={2} />
          <Line type="monotone" dataKey="Nifty" stroke="green" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>

      {/* Profit & Loss Table */}
      <h2 style={{fontSize:"14.4px", marginBottom:"4rem", marginTop:"4rem"}}>Profit & Loss Table</h2>
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
            marginTop: "20px",
            border: "1px solid black", // Single border around table
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f4f4f4", fontWeight: "bold" }}>
              <th style={{ padding: "10px" }}>Stock Name</th>
              <th style={{ padding: "10px" }}>Current Price</th>
              <th style={{ padding: "10px" }}>Change (%)</th>
            </tr>
          </thead>
          <tbody>
            {stockPL.map((stock, index) => (
              <tr
                key={index}
                style={{
                  color: stock.percent < 0 ? "red" : "green",
                  borderBottom: index !== stockPL.length - 1 ? "1px solid #ddd" : "none", // Bottom border except last row
                }}
              >
                <td style={{ padding: "10px" }}>{stock.name}</td>
                <td style={{ padding: "10px" }}>{stock.price}</td>
                <td style={{ padding: "10px" }}>{stock.percent}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockGraph;
