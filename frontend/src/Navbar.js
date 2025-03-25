import React from "react";
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary border ">
            <div className="container">
                <Link className="navbar-brand" to={"/"}>
                    <img
                        className="mt-3 mb-2"
                        src="Media/images/logo.svg"
                        style={{ width: "25%", paddingLeft: "10px" }}
                    />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className={`collapse navbar-collapse`}
                    id="navbarNavAltMarkup"
                >
                    <div className="navbar-nav">
                        <Link className="nav-link" to={"/Signup"}>
                            Signup
                        </Link>
                        <Link className="nav-link" to={"/About"}>
                            About Us
                        </Link>
                        <Link className="nav-link" to={"/Products"}>
                            Products
                        </Link>
                        <Link className="nav-link" to={"/Pricing"}>
                            Pricing
                        </Link>
                        <Link className="nav-link" to={"/Support"}>
                            Support
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
