import React from 'react';

function Hero() {
    return ( 
        <div className='container border-top'>
            <div className='row mt-3 p-5'>
                <div className='col-6'>
                    <h3 className='text-center'><a className="textDec"href=''>Brokerage Calculator</a></h3>
                    <ul className='text-muted mt-4'>
                        <li className='mt-2'>call & Trade and RMS auto-squareoff: Additional changes of ₹50 + GST per order.</li>
                        <li className='mt-2'>Digital contract nodes will be sent via e-mail.</li>
                        <li className='mt-2'>physical copies of contract notes, if required, shall be changed ₹20 per contract note. Courier cahnges apply</li>
                        <li className='mt-2'>for NRI account (non-PIS), 0.5% or ₹100 per executed order for equlity.</li>
                        <li className='mt-2'>for NRI account (PIS), 0.5% or ₹200 per executed order for equlity.</li>
                        <li className='mt-2'>If the account is in debit balance, any order placed will be changed ₹40 per executed order insted of ₹20 per executed order.</li>
                    </ul>
                </div>
                <div className='col-6 text-center'>
                    <h3><a className="textDec"href=''>List of changes</a></h3>
                </div>
            </div>
        </div>
     );
}

export default Hero;