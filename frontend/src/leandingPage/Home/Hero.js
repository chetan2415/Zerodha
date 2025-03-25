import React from 'react';
import {Link} from 'react-router-dom';

function Hero() {
    return ( 
    <div className='container p-3'>
        <div className='row mt-3 text-center '>
            <img src="Media/images/homeHero.png" alt="heroHome image" className='m-8 pl-4 pr-4'/>
            <h2 className='mt-4 mb-2'>Invest in everything</h2>
            <p className='mt-3'>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</p>
            <Link to="/Signup"className="p-2 btn btn-primary mb-5 fs-5 mt-3"style={{width:"20%",margin:"0 auto",btn:"primary"}}>Sing up for free</Link>
        </div>
    </div>
    );
}

export default Hero;