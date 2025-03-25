import React from 'react';

const Section = ({ title, links }) => (
  <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
    <h4>{title}</h4>
    {links.map((link, index) => (
      <div key={index}>
        <a
          className="textDec"
          href={link.href || "#"}
          style={{ lineHeight: "2.5" }}
        >
          {link.text}
        </a>
      </div>
    ))}
  </div>
);

function CreateTicket() {
  const sections = [
    {
      title: "Account Opening",
      links: [
        { text: "Getting started" },
        { text: "Online" },
        { text: "Offline" },
        { text: "Charges" },
        { text: "Company, Partnership and HUF" },
        { text: "Non Resident Indian (NRI)" },
      ],
    },
    {
      title: "Your Zerodha Account",
      links: [
        { text: "Login credentials" },
        { text: "Your profile" },
        { text: "Account modification" },
        { text: "CMR & DP ID" },
        { text: "Nomination" },
        { text: "Transfer and conversion of shares" },
      ],
    },
    {
      title: "Trading and Markets",
      links: [
        { text: "Trading FAQs" },
        { text: "Kite" },
        { text: "Margins" },
        { text: "Product and order types" },
        { text: "Corporate actions" },
        { text: "Kite features" },
      ],
    },
    {
      title: "Funds",
      links: [
        { text: "Fund withdrawal" },
        { text: "Adding funds" },
        { text: "Adding bank accounts" },
        { text: "eMandates" },
      ],
    },
    {
      title: "Console",
      links: [
        { text: "IPO" },
        { text: "Portfolio" },
        { text: "Funds statement" },
        { text: "Profile" },
        { text: "Reports" },
        { text: "Referral program" },
      ],
    },
    {
      title: "Coin",
      links: [
        { text: "Understanding mutual funds and Coin" },
        { text: "Coin app" },
        { text: "Coin web" },
        { text: "Transactions and reports" },
        { text: "National Pension Scheme (NPS)" },
      ],
    },
  ];

  return (
    <div className="container">
      <div className="row p-4">
        {sections.slice(0, 3).map((section, index) => (
          <Section key={index} title={section.title} links={section.links} />
        ))}
      </div>
      <div className="row p-4">
        {sections.slice(3, 6).map((section, index) => (
          <Section key={index} title={section.title} links={section.links} />
        ))}
      </div>
    </div>
  );
}

export default CreateTicket;
