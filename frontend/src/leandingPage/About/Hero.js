import React from 'react';

function Hero() {
    return ( 
        <div className='container'>
            <div className='row'>
                <div className='col mt-5 mb-5 text-center'>
                    <h3>We pioneered the discount broking model in India.</h3>
                    <h3>Now, we are breaking ground with our technology.</h3>
                </div>
                <div className='row p-5 bor
                der-top' style={{lineHeight:"1.8",fontSize:"1.2"}}>
                    
                        <div className='col-6 mt-4 pl-4 text-muted'>
                        <p>We kick-started operations on the 15th of August, 2010 with the goal of breaking all barriers that traders and investors face in India in terms of cost, support, and technology. We named the company Zerodha, a combination of Zero and "Rodha", the Sanskrit word for barrier</p>
                        <p>Today, our disruptive pricing models and in-house technology have made us the biggest stock broker in India</p>
                        <p>Over 1+ Crore clients place millions of orders every day through our powerful ecosystem of investment platforms, contributing over 15% of all Indian retail trading volumes.</p>
                    </div>
                    <div className='col-6 mt-4 ml-5 pr-4 text-muted'>
                        <p>In addition, we run a number of popular open online educational and community initiatives to empower retail traders and investors.</p>
                        <p><a  style={{textDecoration:"none"}}href=''>Rainmatter</a>, our fintech fund and incubator, has invested in several fintech startups with the goal of growing the Indian capital markets.</p>
                        <p>And yet, we are always up to something new every day. Catch up on the latest updates on our blog or see what the media is <a style={{textDecoration:"none"}}href=''>saying about us.</a></p>
                    </div>
                    
                </div>
            </div>
        </div>
     );
}

export default Hero;