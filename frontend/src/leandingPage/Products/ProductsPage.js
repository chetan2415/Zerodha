import React from 'react';

import Hero from './Hero';
import Leftimage from './Leftimage';
import Rightimage from './Rightimage';
import Universe from './Universe';

function Pricingpage() {
    return ( 
        <>
        <Hero />
        
        <Leftimage 
            imageURL='Media/images/kite.png'
            productName='Kite'
            description='Our ultra-fast flagship trading platform with streaming market data, 
            advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices.'
            tryDemo=''
            learn=''
            google=''
            app=''/>
        <Rightimage 
            productName='Console'
            description='The central dashboard for your Zerodha account. 
            Gain insights into your trades and investments with in-depth reports and visualisations'
            learn=''
            imageURL='Media/images/console.png'/>
        <Leftimage 
            imageURL='Media/images/coin.png'
            productName='Coin'
            description='Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices.'
            tryDemo=''
            learn=''
            google=''
            app=''/>
        <Rightimage
            productName='Kite Connect API'
            description='Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. 
            If you are a startup, build your investment app and showcase it to our clientbase.'
            learn=''
            imageURL='Media/images/kiteconnect.png'/>
        <Leftimage 
            imageURL='Media/images/varsity.png'
            productName='Varsity mobile'
            description='An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations. 
            Content is broken down into bite-size cards to help you learn on the go'
            google=''
            app=''/>  

        <Universe/> 
        </>
     );
}

export default Pricingpage;