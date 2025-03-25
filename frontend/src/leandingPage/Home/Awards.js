import React from 'react';

function Awards() {
    return ( 
        <div>
            <div className='container mt-5 p-3'>
                <div className='row'>
                    <div className='col-6 mt-5'>
                        <img src='Media/images/largestBroker.svg'/>
                    </div>
                    
                    <div className='col-6 mt-5 p-3'>
                        <h1 className='text-center mb-2'>Largset stock Brocker in India</h1>
                        <p className=' text-center mt-3'>2+ millon Zerodha clintes contribute to over 15% of all retail order 
                            volumes in India daily by trading and investing in:</p>
                            <div className='row'>
                                <div className='col-6 mt-3'>
                                    <ul>
                                        <li><p>Futures and Options</p></li>
                                        <li><p>commodity derivatives</p></li>
                                        <li><p>Currency derivatives</p></li>
                                    </ul>
                                </div>
                                <div className='col-6 mt-3'>
                                    <ul>
                                        <li><p>stocks & IPOs</p></li>
                                        <li><p>Direct mutual funds</p></li>
                                        <li><p>Bonds and Govt.Secutrities</p></li>
                                    </ul>
                                </div>
                            </div>
                            <img src='Media/images/pressLogos.png' className='mt-5'style={{width:'90%'}}/>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Awards;