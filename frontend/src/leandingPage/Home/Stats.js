import React from 'react';

function Stats() {
    return ( 
       <div className='container mt-5 p-5'>
        <div className='row'>
            <div className='col-6 mt-3'>
                <h2 className='mt-5 '>Trust with confidence</h2>
                <h4 className='mt-5'>Customer-first always</h4>
                <p className='mt-2.8 text-muted'>That's why 1.5+ crore customers trust Zerodha with ₹4.5+ lakh crores of equity investments and contribute to 15% of daily retail exchange volumes in India.</p>
                
                <h4 className='mt-5'>No spam or gimmicks</h4>
                <p className='mt-2.8 text-muted'>No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like.</p>
                
                
                <h4 className='mt-5'>The Zerodha universe</h4>
                <p className='mt-2.8 text-muted'>Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.</p>
                
                <h4 className='mt-5'>Do better with money</h4>
                <p className='mt-2.8 text-muted'>With initiatives like <a style={{textDecoration:"none"}}href=''>Nudge</a> and <a style={{textDecoration:"none"}} href=''>Kill Switch</a>, we don't just facilitate transactions, but actively help you do better with your money.</p>
                
            </div>
           
            <div className='col-6'>
                <img className="ml-5 mb-2"src='Media/images/ecosystem.png' style={{width:"93%",margin:"0 auto"}}/>
                <div className=' p-5 text-center'>
                    <a  style={{textDecoration:"none"}}href=''>Explore our Products →</a>
                    <a className="p-5" style={{textDecoration:"none"}}href=''>Try Kite demo →</a>
                </div>
            </div>
        <img className="mt-2 text-center p-5" style={{width:"70%",margin:"auto"}}src='Media/images/pressLogos.png'/>
        </div>
       </div>
     );
}

export default Stats;