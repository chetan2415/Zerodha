import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import StockGraph from "./StockGraph";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (selectedStock) {
      console.log("Selected Stock:", selectedStock);
    }
  }, [selectedStock]);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // Close dropdowns if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  const stockGraph = useMemo(() => {
    return selectedStock ? <StockGraph stockSymbol={selectedStock} /> : null;
  }, [selectedStock]);

  return (
    <>
      <div className="menu-container">
        <img src="/media/logo.png" style={{ width: "40px" }} alt="logo" />
        <div className="menus">
          <ul>
            <li>
              <Link to="/" style={{ textDecoration: "none" }} onClick={() => handleMenuClick(0)}>
                <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>Dashboard</p>
              </Link>
            </li>
            <li>
              <Link to="/orders" style={{ textDecoration: "none" }} onClick={() => handleMenuClick(1)}>
                <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>Orders</p>
              </Link>
            </li>
            <li>
              <Link to="/holdings" style={{ textDecoration: "none" }} onClick={() => handleMenuClick(2)}>
                <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>Holdings</p>
              </Link>
            </li>
            <li>
              <Link to="/positions" style={{ textDecoration: "none" }} onClick={() => handleMenuClick(3)}>
                <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>Positions</p>
              </Link>
            </li>
            <li>
              <Link to="/funds" style={{ textDecoration: "none" }} onClick={() => handleMenuClick(4)}>
                <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>Funds</p>
              </Link>
            </li>
            <li>
              <Link to="/apps" style={{ textDecoration: "none" }} onClick={() => handleMenuClick(6)}>
                <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>Apps</p>
              </Link>
            </li>

            {/* Search Icon (Without Functionality) */}
            <li>
              <Link to="/Search"
                className="search-icon"
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  color: "black",
                  fontSize: "14.4px",
                  opacity: "0.6",
                }}
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </Link>
            </li>
          </ul>
          <hr />

          {/* Profile with Dropdown */}
          <div className="profile-dropdown-container" ref={dropdownRef}>
            <div className="profile" onClick={toggleProfileDropdown}>
              <div className="avatar">ZU</div>
              <p className="username">USERID</p>
            </div>

            {/* Dropdown Menu */}
            {isProfileDropdownOpen && (
              <div className="dropdown-menu show">
                <Link className="dropdown-item" to="/logout">
                  Logout
                </Link>
                <Link className="dropdown-item" to="/Sell">
                  Sell
                </Link>
                <Link className="dropdown-item" to="/History">
                  History
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stock Graph Below Menu */}
      <div className="content-wrapper">
        {selectedStock && (
          <div className="stock-display">
            <h3>{selectedStock} Stock Price</h3>
            <StockGraph stockSymbol={selectedStock} />
          </div>
        )}
      </div>
    </>
  );
};

export default Menu;
