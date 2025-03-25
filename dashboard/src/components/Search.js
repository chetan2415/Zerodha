import React, { useState } from "react";
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

function Search() {
  const [query, setQuery] = useState("");
  const [selectedStock, setSelectedStock] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    console.log("Searching for:", query);
    const stock = watchlist.find((item) => item.name.toUpperCase() === query.toUpperCase());

    if (stock) {
      console.log("Stock found:", stock);
      setSelectedStock(stock);
      setNotFound(false);
    } else {
      console.log("Stock found:", stock);
      setSelectedStock(null);
      setNotFound(true);
    }

    setQuery(""); // Clear input after search
  };

  // Generate dummy data for stock price over a week
  const generateStockData = (stock) => [
    { day: "Mon", price: stock.price - Math.random() * 20 },
    { day: "Tue", price: stock.price - Math.random() * 10 },
    { day: "Wed", price: stock.price },
    { day: "Thu", price: stock.price + Math.random() * 10 },
    { day: "Fri", price: stock.price + Math.random() * 20 },
  ];

  // Filter banking stocks for peer comparison
 // Adjust bankPeers filtering logic to match real stock symbols
const bankPeers = watchlist.filter((stock) =>
  ["ICICI", "HDFC", "AXIS", "SBIN", "SBI"].some(bank => stock.name.toUpperCase().includes(bank))
);


  return (
    <>
      {!selectedStock && (
        <div className="search-container-1">
          <div className="search-box-1">
            <input
              className="search-input-1"
              type="text"
              placeholder="Enter Stock.."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="search-button-1" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      )}

      {notFound && <p style={{ textAlign: "center", color: "red" , marginTop:"-25rem"}}>Stock not found!</p>}

      {selectedStock && (
        <div style={{ width: "100%", padding: "20px" }}>
          {/* Stock-Specific Graph */}
          <h2 style={{ fontSize: "16px", marginBottom: "20px" }}>
            {selectedStock.name} Stock Analysis
          </h2>

           {/* High, Low, CAGR */}
           <div className="metrics-container2">
            <p className="p">Low: ₹{(selectedStock.price * 0.95).toFixed(2)}</p>
            <p className="p">High: ₹{(selectedStock.price * 1.05).toFixed(2)}</p>
            <p className="p">CAGR: {selectedStock.isDown ? "-2.5%" : "3.2%"}</p>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={generateStockData(selectedStock)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="price"
                stroke={selectedStock.isDown ? "red" : "green"}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>


          {/* Performance, Risk, Cost, Composition */}
          <div style={{ marginTop: "20px" }}>
            <h3 className="s">Performance</h3>
            <p className="p">Stock has shown {selectedStock.isDown ? "negative" : "positive"} growth.</p>
     
            <h3 className="s">Risk</h3>
            <p className="p">Moderate risk based on volatility.</p>
       
            <h3 className="s">Cost</h3>
            <p className="p">Transaction fees apply as per the broker.</p>
          
            <h3 className="s">Composition</h3>
            <p className="p">Sector: IT, Banking, FMCG, etc.</p>
          </div>

          {/* Key Metrics */}
          <div style={{ marginTop: "20px" }}>
              <h3 className="s">Key Metrics</h3>
              <div className="metrics-container">
                <p className="p1">Expense Ratio: 0.75%</p>
                <p className="p1">PE Ratio: 21.5</p>
              </div>
              <div className="metrics-container">
                <p className="p1">Sharpe Ratio: 1.12</p>
                <p className="p1">Category Expense Ratio: 0.82%</p>
              </div>
              <div className="metrics-container">
                <p className="p1">Category PE Ratio: 20.8</p>
                <p className="p1">Category Sharpe Ratio: 1.05</p>
              </div>
          </div>


          {/* Peers Comparison */}
          {bankPeers.length > 0 && (
            <div style={{ marginTop: "20px" }}>
              <h3 className="s">Peers (Banking Stocks)</h3>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "center",
                  marginTop: "10px",
                  border: "1px solid black",
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#f4f4f4", fontWeight: "bold" }}>
                    <th style={{ padding: "10px" }}>Bank Name</th>
                    <th style={{ padding: "10px" }}>Stock Price</th>
                    <th style={{ padding: "10px" }}>Price Difference</th>
                  </tr>
                </thead>
                <tbody>
                  {bankPeers.map((peer) => (
                    <tr
                      key={peer.name}
                      style={{
                        color: peer.price < selectedStock.price ? "red" : "green",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      <td style={{ padding: "10px" }}>{peer.name}</td>
                      <td style={{ padding: "10px" }}>₹{peer.price}</td>
                      <td style={{ padding: "10px" }}>
                        ₹{(peer.price - selectedStock.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tax Implications */}
          <div style={{ marginTop: "20px" }}>
            <h3 className="s">Tax Implications</h3>
            <p className="p">Long-term capital gains (LTCG) tax of 10% on gains above ₹1 lakh.</p>
            <p className="p">Short-term capital gains (STCG) tax of 15% if held for less than a year.</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Search;
