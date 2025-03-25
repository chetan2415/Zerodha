import React from 'react';
import {Link} from 'react-router-dom';

 function Hero() {
    return ( 
        <div className='container'>
        <div className='row p-5'>
            <div className='col text-center mt-4'>
                <h1>Charges</h1>
                <p className='text-muted mt-4'>List of all charges and taxes</p>
            </div>
            <div className='row mt-4 p-5 text-center'>
                <div className='col-4'>
                    <img style={{width:"50%"}}src='Media/02.svg'/>
                    <h2 className='mt-3'>Free equity delivery</h2>
                    <p className='mt-3  text-muted'>All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.</p>
                </div>
                <div className='col-4'>
                    <img style={{width:"50%"}}src='Media/images/20.svg'/>
                    <h2 className='mt-3'>Intraday and F&O trades</h2>
                    <p className='mt-3  text-muted'>Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, 
                        currency, and commodity trades. Flat ₹20 on all option trades.</p>
                </div>
                <div className='col-4'>
                    <img style={{width:"50%"}}src='Media/02.svg'/>
                    <h2 className='mt-3'>Free direct MF</h2>
                    <p className='mt-3  text-muted'>All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.</p>
                </div>
            </div>
            <div className='row mt-3 text-center '>
                <h2 className='mt-4 mb-2'>Open a Zerodha account</h2>
                <p className='mt-3 text-muted'>Modern platform and apps, &#8377;0 investements,and flat &#8377;20 intraday and F&O trades.</p>
                <Link to="/Signup" className="p-2 btn btn-primary mb-5 fs-5 mt-3"style={{width:"20%",margin:"0 auto",btn:"primary"}}>Sing up for free</Link>
            </div>

        </div>
    </div>
     );
 }
 
 export default Hero;