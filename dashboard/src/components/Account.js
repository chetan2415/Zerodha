import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Account() {
  const [accountHolder, setAccountHolder] = useState("");
  const [mobile, setMobile] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [bankName, setBankName] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [receivedOtp, setReceivedOtp] = useState(null);
  const [showOtp, setShowOtp] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [otpSent, setOtpSent] = useState(false);
  const [accountAdded, setAccountAdded] = useState(
    JSON.parse(localStorage.getItem("accountAdded")) || false
  );

  useEffect(() => {
    let timer;
    if (otpSent && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setOtpSent(false);
    }
    return () => clearInterval(timer);
  }, [otpSent, timeLeft]);

  useEffect(() => {
    localStorage.setItem("accountAdded", JSON.stringify(accountAdded));
  }, [accountAdded]);

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return; 
    const updatedOtp = [...otp];
    updatedOtp[index] = element.value;
    setOtp(updatedOtp);

    if (element.value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleBackspace = (element, index) => {
    if (!element.value && element.previousSibling) {
      element.previousSibling.focus();
    }
  };

  const handleGenerateOtp = async () => {
    if (!mobile.match(/^\d{10}$/)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/accounts/generate-otp",
        { mobile }
      );

      if (response.data.otp) {
        setReceivedOtp(response.data.otp);
        setShowOtp(true);
        setOtpSent(true);
        setTimeLeft(60);
        alert(`OTP generated successfully! Your OTP: ${response.data.otp}`);
      } else {
        alert("Failed to generate OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error generating OTP:", error.response?.data || error.message);
      alert("Network error! Please check your connection.");
    }
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("");
    if (!enteredOtp) {
      alert("Please enter the OTP.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/accounts/verify-otp",
        { mobile, otp: enteredOtp }
      );

      if (response.data.message.includes("successfully")) {
        setIsOtpVerified(true);
        alert("OTP verified successfully! You can now add your account.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error.response?.data || error.message);
      alert("Invalid or expired OTP. Please try again.");
    }
  };

  const handleAddAccount = async (e) => {
    e.preventDefault();
    if (!isOtpVerified) {
      alert("Please verify OTP before adding an account.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/accounts/newAccount", {
        accountHolder,
        mobile,
        accountNumber,
        ifscCode,
        bankName,
      });
      if(res.data.message){
        localStorage.setItem("userMobile", mobile); 
      }
      alert("Bank account added successfully!");
      setAccountAdded(true);
    } catch (error) {
      console.error("Error adding account:", error);
      alert("Failed to add account. Please try again.");
    }
  };

  const handleRemoveAccount = () => {
    setAccountHolder("");
    setMobile("");
    setAccountNumber("");
    setIfscCode("");
    setBankName("");
    setOtp("");
    setReceivedOtp(null);
    setShowOtp(false);
    setIsOtpVerified(false);
    setTimeLeft(60);
    setOtpSent(false);
    setAccountAdded(false); // Reset to show the "Add your bank account" form again
  
    alert("Account removed successfully!");
  };
  
  return (
    <>
      {!accountAdded && <h2 className="heading">Add your Bank Account</h2>}
      <div id="Account">
        <div id="account" style={{ marginTop: "-5rem" }}>
          {!accountAdded ? (
            <form onSubmit={handleAddAccount} className="bank-form mt-4">
              <div className="form-group row">
                <label className="col-sm-4 col-form-label">Account Holder Name:</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    value={accountHolder}
                    onChange={(e) => setAccountHolder(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-4 col-form-label">Mobile Number:</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleGenerateOtp}
                className="btn btn-link mt-2"
                style={{
                  border: "none",
                  background: "none",
                  color: "blue",
                  marginLeft: "14rem",
                  fontSize: "16px",
                }}
              >
                
                {otpSent ? `Re-generate OTP (${timeLeft}s)` : "Generate OTP"}
              </button>

              {showOtp && (
                <>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">Enter OTP:</label>
                    <div className="col-sm-8">
                      <div style={{ display: "flex", justifyContent: "space-between"}}>
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            type="text"
                            maxLength="1"
                            className="form-control"
                            style={{ width: "2rem", textAlign: "center" }}
                            value={digit}
                            onChange={(e) => handleOtpChange(e.target, index)}
                            onKeyDown={(e) =>
                              e.key === "Backspace" && handleBackspace(e.target, index)
                            }
                            required
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="btn btn-success mt-2"
                    style={{
                      border: "none",
                      background: "none",
                      color: "blue",
                      marginLeft: "14rem",
                      fontSize: "16px",
                    }}
                  >
                    Verify OTP
                  </button>
                </>
              )}

              {isOtpVerified && (
                <>
                <div className="form-group row">
                    <label className="col-sm-4 col-form-label">Bank Name:</label>
                    <div className="col-sm-8">
                      <select
                        className="form-control"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        style={{height:"3rem"}}
                        required
                      >
                        <option value="">Select Bank</option>
                        <option value="State Bank of India">State Bank of India</option>
                        <option value="HDFC Bank">HDFC Bank</option>
                        <option value="ICICI Bank">ICICI Bank</option>
                        <option value="Axis Bank">Axis Bank</option>
                        <option value="Punjab National Bank">Punjab National Bank</option>
                        <option value="Bank of Baroda">Bank of Baroda</option>
                        <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                        <option value="IndusInd Bank">IndusInd Bank</option>
                        <option value="Canara Bank">Canara Bank</option>
                        <option value="Union Bank of India">Union Bank of India</option>
                        <option value="Yes Bank">Yes Bank</option>
                        <option value="IDFC First Bank">IDFC First Bank</option>
                      </select>
                    </div>
                  </div>
                  <br />

                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">Account Number:</label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <br />

                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">IFSC Code:</label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        value={ifscCode}
                        onChange={(e) => setIfscCode(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <br />

                  <button type="submit" className="btn btn-primary mt-3">
                    Add Account
                  </button>
                </>
              )}
            </form>
          ) : (
            <div style={{marginTop:"5rem"}}>
              <Link to="/RemoveAccount" className="btn btn-danger mt-3" onClick={handleRemoveAccount} style={{marginTop:"30rem"}}>Remove Account</Link>
              <p className="text mt-5" style={{marginTop:"3rem"}}>Your account has been successfully added. You can remove it if needed.</p>
            </div>
          )}
        </div>
        <p
          className="text"
          style={{
            paddingRight: "5rem",
            marginTop: "2rem",
          }}
        >
          Zerodha will not share your bank details with any third party, individual, or organization without your explicit consent.
          Your banking information is securely stored using industry-standard encryption and is used only for authorized transactions
          in compliance with SEBI and regulatory guidelines. Always be cautious of phishing attempts and never share your login credentials,
          OTPs, or sensitive banking details with anyone claiming to be from Zerodha.
        </p>
      </div>
    </>
  );
}

export default Account;