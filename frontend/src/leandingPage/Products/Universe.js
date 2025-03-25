import React from 'react';
import {Link} from 'react-router-dom';

function Universe() {
    return ( 
        <div className="container">
            <div className="row">
                <div className="col text-center">
                    <h5 className="text-muted mt-3">
                        Want to know more about our technology stack? Check out the 
                        <a className="textDec" href=""> Zerodha.tech</a> blog.
                    </h5>
                    <h4 className="mt-5">The Zerodha Universe</h4>
                    <p className="mt-4 text-muted">
                        Extend your trading and investment experience even further with our partner platforms
                    </p>
                    
                    <div className="row mt-5 p-4">
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                            <img style={{ width: "40%" }} src="Media/images/smallcaseLogo.png" alt="Smallcase Logo" />
                            <p className="mt-4">
                                Thematic investing platform that helps you invest in diversified baskets of stocks or ETFs.
                            </p>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                            <img style={{ width: "25%" }} src="Media/images/dittoLogo.png" alt="Ditto Logo" />
                            <p className="mt-4">
                                Personalized advice on life and health insurance. No spam and no mis-selling.
                            </p>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                            <img style={{ width: "45%" }} src="Media/images/sensibullLogo.svg" alt="Sensibull Logo" />
                            <p className="mt-4">
                                Options trading platform that lets you create strategies, analyze positions, and examine data points like open interest, FII/DII, and more.
                            </p>
                        </div>
                    </div>

                    <div className="row mt-3 p-4">
                        <div className="col-lg-2 col-md-1 d-none d-md-block"></div>
                        <div className="col-lg-3 col-md-5 col-sm-12 mb-4">
                            <img style={{ width: "60%" }} src="Media/images/zerodhaFundhouse.png" alt="Zerodha Fundhouse Logo" />
                            <p className="mt-4">
                                Our asset management venture that is creating simple and transparent index funds to help you save for your goals.
                            </p>
                        </div>
                        <div className="col-lg-2 col-md-1 d-none d-md-block"></div>
                        <div className="col-lg-4 col-md-5 col-sm-12 mb-4">
                            <img style={{ width: "45%" }} src="Media/images/streakLogo.png" alt="Streak Logo" />
                            <p className="mt-4">
                                Systematic trading platform that allows you to create and backtest strategies without coding.
                            </p>
                        </div>
                    </div>
                    
                    <Link 
                        to="/Signup"
                        className="p-2 btn btn-primary mb-5 fs-5 mt-3" 
                        style={{ width: "20%", margin: "0 auto" }}>
                        Sign up for free
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Universe;
