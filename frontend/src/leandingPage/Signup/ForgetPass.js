import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgetPass() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const [receivedOtp, setReceivedOtp] = useState(null);
  const [showOtp, setShowOtp] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleOtpInput = (e, index) => {
    if (!/^\d$/.test(e.target.value) && e.target.value !== "") return;
  
    let newOtp = [...otp];
    newOtp[index] = e.target.value.slice(-1);
    setOtp(newOtp);
  
    if (index < 5 && e.target.value) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    } else if (!e.target.value && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  
    console.log("OTP State:", newOtp.join("")); 
  };
  

  const handleSendOtp = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }
    try {
      const response = await axios.post("https://zerodha-backend-4ntj.onrender.com/auth/forgot-password", { email });
      alert("OTP generated!");
      
      if(response.data.otp){
        setReceivedOtp(response.data.otp);
        setShowOtp(true);
        setTimeLeft(20); 
        setStep(2);

        alert(`your OTP is : ${response.data.otp + " "} \n\n this OTP will disapper when u press ok \n\n make remeber`)
        }else{
            alert("failed to generate otp.");
        }
    } catch (error) {
      alert("Error sending OTP. Try again.");
    }
  };

  const handleResendOtp = async () => {
    await handleSendOtp();
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("");
    console.log("Entered OTP:", enteredOtp);
  
    if (enteredOtp.length !== 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }
  
    try {
      await axios.post("https://zerodha-backend-4ntj.onrender.com/auth/verify-otp", { email, otp: enteredOtp });
      alert("OTP verified. You can reset your password now.");
      setStep(3);
    } catch (error) {
      alert("Invalid or expired OTP.");
    }
  };
  

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }
    try {
      await axios.post("https://zerodha-backend-4ntj.onrender.com/auth/reset-password", { email, newPassword });
      alert("Password reset successful! Please log in.");
      navigate("/Login");
    } catch (error) {
      alert("Error resetting password.");
    }
  };

  return (
    <div className="container">
      <h5 className="text-start text-muted mt-5">Forgot Password</h5>
      <div className="row p-5 mt-3">
        <div className="col-6 mx-auto">
          <form>
            {step === 1 && (
              <>
                <div className="mb-3 row align-items-center">
                  <label className="col-sm-4 col-form-label">Email:</label>
                  <div className="col-sm-8">
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="text-center">
                  <button type="button" className="btn btn-primary" onClick={handleSendOtp}>
                    Generate OTP
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="mb-3 row align-items-center">
                  <label className="col-sm-4 col-form-label">Enter OTP:</label>
                  <div className="col-sm-6 d-flex gap-2">
                    {otp.map((_, index) => (
                      <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      className="form-control text-center"
                      maxLength="1"
                      pattern="[0-9]*"
                      inputMode="numeric"
                      onChange={(e) => handleOtpInput(e, index)}
                      value={otp[index]}
                    />
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleVerifyOtp}
                    disabled={timeLeft === 0}
                  >
                    Verify OTP ({timeLeft}s)
                  </button>
                </div>
                {timeLeft === 0 && (
                  <div className="text-center mt-3">
                    <button type="button" className="btn btn-secondary" onClick={handleResendOtp}>
                      Resend OTP
                    </button>
                  </div>
                )}
              </>
            )}

            {step === 3 && (
              <>
                {["New Password:", "Re-enter Password:"].map((label, index) => (
                  <div className="mb-3 row align-items-center" key={index}>
                    <label className="col-sm-4 col-form-label">{label}</label>
                    <div className="col-sm-8">
                      <input
                        type="password"
                        className="form-control"
                        value={index === 0 ? newPassword : confirmPassword}
                        onChange={(e) => {
                          if (index === 0) setNewPassword(e.target.value);
                          else {
                            setConfirmPassword(e.target.value);
                            setPasswordMatch(e.target.value === newPassword);
                          }
                        }}
                        required
                      />
                    </div>
                  </div>
                ))}
                {!passwordMatch && <p className="text-danger text-center">Passwords do not match.</p>}
                <div className="text-center">
                  <button type="button" className="btn btn-primary" onClick={handleResetPassword}>
                    Reset Password
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgetPass;
