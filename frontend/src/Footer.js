import React from "react";

function Footer() {
  return (
    <footer style={{ backgroundColor: "rgb(250, 250, 250)" }}>
      <div className="container border-top mt-5">
        <div className="row mt-5">
          <div className="col">
            <img src="media/images/logo.svg" style={{ width: "50%" }} />
            <p className="mt-3 text-muted">
              &copy; 2010 - 2024, Not Zerodha Broking Ltd. <p className="mt-2 text-muted">All rights reserved.</p>
            </p>
          </div>
          <div className="col">
            <h2 className="fot">Company</h2>
            <a  className="textDec text-muted"href="">About</a>
            <br />
            <a className="textDec text-muted"href="">Products</a>
            <br />
            <a className="textDec text-muted" href="">Pricing</a>
            <br />
            <a className="textDec text-muted" href="">Referral programme</a>
            <br />
            <a className="textDec text-muted" href="">Careers</a>
            <br />
            <a className="textDec text-muted" href="">Zerodha.tech</a>
            <br />
            <a className="textDec text-muted" href="">Press & media</a>
            <br />
            <a className="textDec text-muted" href="">Zerodha cares (CSR)</a>
            <br />
          </div>
          <div className="col">
            <h2 className="fot">Support</h2>
            <a className="textDec text-muted" href="">Contact</a>
            <br />
            <a className="textDec text-muted" href="">Support portal</a>
            <br />
            <a className="textDec text-muted" href="">Z-Connect blog</a>
            <br />
            <a className="textDec text-muted" href="">List of charges</a>
            <br />
            <a className="textDec text-muted" href="">Downloads & resources</a>
            <br />
          </div>
          <div className="col">
            <h2 className="fot">Account</h2>
            <a className="textDec text-muted" href="">Open an account</a>
            <br />
            <a className="textDec text-muted" href="">Fund transfer</a>
            <br />
            <a className="textDec text-muted" href="">60 day challenge</a>
            <br />
          </div>
        </div>
        <div className="mt-5 text-muted" style={{ fontSize: "14px" }}>
          <p>
            Zerodha Broking Ltd.: Member of NSE​ &​ BSE – SEBI Registration no.:
            INZ000031633 CDSL: Depository services through Zerodha Securities
            Pvt. Ltd. – SEBI Registration no.: IN-DP-100-2015 Commodity Trading
            through Zerodha Commodities Pvt. Ltd. MCX: 46025 – SEBI Registration
            no.: INZ000038238 Registered Address: Zerodha Broking Ltd.,
            #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School,
            J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any
            complaints pertaining to securities broking please write to
            complaints@zerodha.com, for DP related to dp@zerodha.com. Please
            ensure you carefully read the Risk Disclosure Document as prescribed
            by SEBI | ICF
          </p>

          <p>
            Procedure to file a complaint on SEBI SCORES: Register on SCORES
            portal. Mandatory details for filing complaints on SCORES: Name,
            PAN, Address, Mobile Number, E-mail ID. Benefits: Effective
            Communication, Speedy redressal of the grievances
          </p>

         <a className="textDec" href="">Smart Online Dispute Resolution</a>&nbsp; |  &nbsp;<a className="textDec"href="">Grievances Redressal Mechanism</a>

          <p className="mt-2">
            Investments in securities market are subject to market risks; read
            all the related documents carefully before investing.
          </p>

          <p>Attention investors: 1) Stock brokers can accept securities as margins from clients only by way of pledge in the depository system w.e.f September 01, 2020. 2) Update your e-mail and phone number with your stock broker / depository participant and receive OTP directly from depository on your e-mail and/or mobile number to create pledge. 3) Check your securities / MF / bonds in the consolidated account statement issued by NSDL/CDSL every month.</p>
          <p>
            "Prevent unauthorised transactions in your account. Update your
            mobile numbers/email IDs with your stock brokers. Receive
            information of your transactions directly from Exchange on your
            mobile/email at the end of the day. Issued in the interest of
            investors. KYC is one time exercise while dealing in securities
            markets - once KYC is done through a SEBI registered intermediary
            (broker, DP, Mutual Fund etc.), you need not undergo the same
            process again when you approach another intermediary." Dear
            Investor, if you are subscribing to an IPO, there is no need to
            issue a cheque. Please write the Bank account number and sign the
            IPO application form to authorize your bank to make payment in case
            of allotment. In case of non allotment the funds will remain in your
            bank account. As a business we don't give stock tips, and have not
            authorized anyone to trade on behalf of others. If you find anyone
            claiming to be part of Zerodha and offering such services, please
            create a ticket here.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;