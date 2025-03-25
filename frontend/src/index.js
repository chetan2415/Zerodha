import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {BrowserRouter , Routes, Route} from "react-router-dom";

import About from './leandingPage/About/AboutPage';
import Homepage from './leandingPage/Home/Homepage';
import Pricing from './leandingPage/Pricing/Pricingpage';
import Products from './leandingPage/Products/ProductsPage';
import Signup from "./leandingPage/Signup/SignupPage";
import Support from './leandingPage/Support/Supportpage';
import Login from './leandingPage/Signup/Login';
import ForgetPass from './leandingPage/Signup/ForgetPass';

import Navbar from './Navbar';
import Footer from './Footer';
import PageNotfound from './PageNotfound';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/About" element={<About />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Support" element={<Support />} />
        <Route path="/Pricing" element={<Pricing />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} /> 
        <Route path='/ForgetPass' element={<ForgetPass/>} />
        <Route path="*" element={<PageNotfound />} />
      </Routes>
    <Footer />
  </BrowserRouter>
);


