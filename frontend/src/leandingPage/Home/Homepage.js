import React from 'react';

import Awards from './Awards';
import Hero from './Hero';
import Stats from './Stats';
import Education from './Eduction';
import Pricing from './Pricing';
import Opeanaccount from '../../Opeanaccount';



function Homepage() {
    return ( 
        <>
            <Hero/>
            <Awards/>
            <Stats />
            <Pricing/>
            <Education/>
            <Opeanaccount/>
        </>
     );
}

export default Homepage;