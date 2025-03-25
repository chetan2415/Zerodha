import React from 'react';

function Pricing() {
    return ( 
        <div className='container p-5'>
            <div className='row'>
                <div className='col-5'>
                    <h2 className='mt-4'>Unbeatable pricing</h2>
                    <p className='text-muted mt-3'>We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.</p>
                    <a style={{textDecoration:"none"}}href=''>See Pricing</a>
                </div>
                <div className='col-2'></div>
                <div className='col-5'>
                    <div className='row'>
                        <div className='col text-center mt-3'>
                            <img style={{width:"40%"}}src='Media/02.svg'/>
                            <p>Free account opening and Free equity delivery and Direct mutual funds</p>
                        </div>
                        <div className='col text-center mt-3'>
                            <img style={{width:"40%"}}src='Media/images/20.svg'/>
                            <p>Interday and F&O</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
     );
}

export default Pricing;