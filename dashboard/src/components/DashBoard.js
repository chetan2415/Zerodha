import React from "react";
import { Route, Routes } from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";

import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import Logout from "./logout";
import Sell from"./Sell";
import History from "./History";
import Account from "./Account";
import Withdraw from "./Withdraw";
import AddAmount from "./AddAmount";
import RemoveAccount from "./RemoveAccount";
import StockGraph from "./StockGraph";
import Search from "./Search";

import { GeneralContextProvider } from "./GeneralContext";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <GeneralContextProvider>
        <WatchList />
      </GeneralContextProvider>
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Summary />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/logout" element={<Logout/>} />
          <Route path='/Sell' element={<Sell/>} />
          <Route path='/History' element={<History/>} />
          <Route path='/Account' element={<Account/>} />
          <Route path='/Withdraw' element={<Withdraw/>} />
          <Route path="/AddAmount" element={<AddAmount/>} />
          <Route path="/RemoveAccount" element={<RemoveAccount/>} />
          <Route path="/graph/:stockName" element={<StockGraph />} />
          <Route path="/Search" element={<Search/>} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;