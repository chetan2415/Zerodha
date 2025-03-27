import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://zerodha-backend-4ntj.onrender.com/auth/login", formData, {
        headers: { "Content-Type": "application/json" },
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      setFormData({ email: "", password: "" });
      console.log(formData);
      alert("login successful");
      window.location.href = "https://zerodha-dashboard-h1bz.onrender.com/";
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert("incorrect email or password");
    }
  };

  return (
    <div className="container">
      <div className="row p-5 mb-5">
        <h4 className="text-muted">Login to Zerodha</h4>
        <div className="col-7 mt-3" style={{ paddingLeft: "6px" }}>
          <img src="Media/images/kite.png" style={{ width: "75%" }} alt="Kite" />
        </div>
        <div className="col-5 mt-5">
          <form className="needs-validation" onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@gmail.com"
                type="email"
                className="form-control"
                id="email"
                name="email"
                required
              />
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                value={formData.password}
                onChange={handleInputChange}
                type="password"
                className="form-control"
                id="password"
                name="password"
                required
              />
            </div>
            <Link className="mt-4 text-muted textDec" to="/ForgetPass">Forgot email or password</Link>
            <div>
              <button type="submit" className="btn btn-primary mt-3" style={{ width: "15%", margin: "0 auto" }}>Login</button>
            </div>
          </form>
        </div>
        <div className="text-center text-muted mt-5 fs-9">
          <p>
            I authorise Zerodha to contact me even if my number is registered on DND. I authorise Zerodha to fetch my KYC information from the C-KYC registry with my PAN. Please visit this article to know more.
          </p>
          <p>
            By submitting your contact details, you authorize Zerodha to contact you even if you are registered on DND & conduct online KYC for trading & demat account opening as per KRA regulations and PMLA guidelines.
          </p>
          <p>
            If you are looking to open a HUF, Corporate, Partnership, or NRI account, you have to use the offline forms. For help, click here.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
