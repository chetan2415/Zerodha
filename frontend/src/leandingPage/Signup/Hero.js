import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Hero() {
 
  const [isSignedUp, setIsSignUp] = useState(
    JSON.parse(localStorage.getItem("isSignedup")) || false
  );
  const [otpSent, setOtpSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); 
  const [otpVerified, setOtpVerified] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    repassword: "",
    otp: new Array(6).fill(""),
  });

  useEffect(() => {
    if (otpSent && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpSent, timeLeft]);

  useEffect(() => {
    localStorage.setItem("isSignedUp", JSON.stringify(isSignedUp));
  },[isSignedUp]);

  if (isSignedUp) {
    return (
      <div className="text-center mt-5">
        <h2>Welcome Back!</h2>
        <Link to="/login" className="btn btn-primary mt-3">Login</Link>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "repassword") {
      setPasswordMatch(value === formData.password);
    }
  };

  const handleGenerateOtp = async () => {
    if (!formData.email || !formData.mobile || !formData.username || !formData.password || !formData.repassword) {
      alert("Please enter all required fields.");
      return;
    }
  
    try {
      const response = await axios.post("https://zerodha-backend-4ntj.onrender.com/auth/signup-otp", {
        email: formData.email,
        mobile: formData.mobile,
        username: formData.username,
        password: formData.password, 
      });
  
      console.log("OTP Sent Response:", response.data);
      setOtpSent(true);
      setTimeLeft(45);
      
      if(response.data.otp){
        alert(`your OTP is : ${response.data.otp + " "}\n\n This OTP will diapper when u press ok\n\n make remeber`);
      }else{
        alert("failed to generated OTP.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error.response?.data || error.message);
      alert("Error sending OTP. Please try again.");
    }
  };
  

  const handleOtpInput = (e, index) => {
    if (isNaN(e.target.value)) return;  
  
    let newOtp = [...formData.otp];
    newOtp[index] = e.target.value.slice(-1);
  
    setFormData((prevData) => ({ ...prevData, otp: newOtp }));
  
    if (index < 5 && e.target.value) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
    if (!e.target.value && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };
  

  const handleResendOtp = async () => {
    try {
      // Capture the response from the axios POST request
      const response = await axios.post("https://zerodha-backend-4ntj.onrender.com/auth/resend-otp", {
        email: formData.email,
      });
  
      // Show success message and reset OTP form fields
      alert("OTP resent successfully!");
      setOtpVerified(true);
      setTimeLeft(45); // Reset the timer to 45 seconds
      setFormData({ ...formData, otp: new Array(6).fill("") });
  
      // Check if the OTP exists in the response and display it
      if (response.data.newOtp) {
        alert(
          `Your OTP is: ${response.data.newOtp}\n\nThis OTP will disappear when you press OK. Please remember it.`
        );
      } else {
        alert("Failed to generate OTP.");
      }
    } catch (error) {
      alert("Error resending OTP.");
      console.error(error); // Log error for debugging
    }
  };
  
  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post("https://zerodha-backend-4ntj.onrender.com/auth/verify-otp", {
        email: formData.email,
        otp: formData.otp.join(""),
      });

      alert("otp verified");
      setOtpVerified(true); 
    } catch (error) {
      console.error("Error verifying OTP:", error.response?.data || error.message);
      alert("Invalid or expired OTP. Please try again.");
    }
  };
  
  const handleSignup = async () => {
    if(!otpVerified){
      alert("verify you OTP before signin up");
      return;
    }
    try {
      const response = await axios.post("https://zerodha-backend-4ntj.onrender.com/auth/signup", {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        mobile: formData.mobile,
      });
  
      alert("signup succesful");
      window.location.href = "/login";
      
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      alert("Signup failed. Please try again.");
    }
  };
  
  const isFormValid = () => {
    return (
      formData.username &&
      formData.email &&
      formData.mobile &&
      formData.password &&
      formData.repassword &&
      otpVerified &&
      passwordMatch
    );
  };

  return (
    <div className="container">
      <div className="row p-5 mt-5">
        <div className="col-6 mx-auto">
          <form>
            {[
              { label: "Username:", name: "username", type: "text" },
              { label: "Email:", name: "email", type: "email" },
              { label: "Mobile:", name: "mobile", type: "number" },
              { label: "Password:", name: "password", type: "password" },
              { label: "Re-enter Password:", name: "repassword", type: "password" },
            ].map((field, index) => (
              <div className="mb-3 row align-items-center" key={index}>
                <label className="col-sm-4 col-form-label">{field.label}</label>
                <div className="col-sm-8">
                  <input
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    type={field.type}
                    className="form-control"
                    required
                  />
                </div>
              </div>
            ))}
            {!passwordMatch && <p className="text-danger">Passwords do not match.</p>}
            <div className="mb-3 row align-items-center">
              <div className="col-sm-4"></div>
              <div className="col-sm-4">
                <button
                  type="button"
                  onClick={otpSent && timeLeft === 0 ? handleResendOtp : handleGenerateOtp}
                  className="btn btn-light border-0"
                >
                  {otpSent && timeLeft === 0 ? "Re-generate OTP" : "Generate OTP"}
                </button>
              </div>
              <div className="col-sm-4 text-muted">
                {otpSent && <span>Resend in {timeLeft}s</span>}
              </div>
            </div>
            {otpSent && (
              <div className="mb-3 row align-items-center">
                <label className="col-sm-4 col-form-label">Enter OTP:</label>
                <div className="col-sm-6 d-flex gap-2">
                  {formData.otp.map((_, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      className="form-control text-center"
                      maxLength="1"
                      onChange={(e) => handleOtpInput(e, index)}
                      value={formData.otp[index]}
                    />
                  ))}
                </div>
                <div className="col-sm-2">
                  <button type="button" className="btn btn-primary" onClick={handleVerifyOtp}>
                    Verify OTP
                  </button>
                </div>
              </div>
            )}
            <div className="text-center mt-3">
              <button
                type="submit"
                className="btn btn-primary me-3 mt-3"
                disabled={!isFormValid()}
                onClick={handleSignup}
              >Signup</button>
              <Link to="/login" className="btn btn-primary mt-3">Login</Link>
              <p className="mt-5 text-center">If user already Signuped just Login</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Hero;
