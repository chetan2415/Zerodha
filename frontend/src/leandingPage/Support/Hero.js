import React from 'react';

function Hero() {
    return ( 
        <div className="container-fluid border-bottom" id="back" style={{ backgroundColor: "#387ed1" }}>
            <div className="row p-4">
                {/* Left Column */}
                <div className="col-lg-8 col-md-12 mb-5" style={{ paddingLeft: "7rem" }}>
                    <h4 id="white" className="mt-4">Support Portal</h4>
                    <h5 id="white" className="mt-5">Search for an answer or browse help topics to create a ticket</h5>
                    <input 
                        id="inp" 
                        className="form-control mt-3" 
                        placeholder="Eg: how do I activate F&O, why is my order getting rejected..." 
                    />
                    <div className="mt-4">
                        <a id="a" href="">Track account opening</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <a id="a" href="">Track segment activation</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <a id="a" href="">Intraday margins</a>
                        <div className="mt-3">
                            <a className="mb-5" id="a" href="">Kite user manual</a>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="col-lg-4 col-md-12 mb-5">
                    <a id="white" href=""><h6 className="mt-4">Track Ticket</h6></a>
                    <h4 id="white" className="mt-5">Featured</h4>
                    <p id="white" className="mt-4">1. <a id="a" href="">Offer for sale (OFS) - January 2025</a></p>
                    <p id="white">2. <a id="a" href="">Current Takeovers and Delisting - January 2025</a></p>
                </div>
            </div>
        </div>
    );
}

export default Hero;
