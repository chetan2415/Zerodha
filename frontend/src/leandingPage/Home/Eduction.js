import React from 'react';

function Education() {
    return ( 
       <div className='conatiner mt-4 p-5'>
          <div className='row'>
            <div className='col-6 pl-5'>
              <img className="ml-5 pl-3 mb-4"style={{width:'70%',margin:"0 auto",marginLeft:"20px",paddingLeft:"2rem"}} src='Media/images/education.svg'/>
            </div>
            <div className='col-6 p-4'>
                <h1>Free and open market education</h1>
                <p className='text-muted mt-4,pr-3'>Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
                <a style={{textDecoration:"none"}}href=''>Varsity</a>
                <p className='text-muted mt-4 pr-3'>TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
                <a style={{textDecoration:"none"}}href=''>Trading Q&A</a>
            </div>
          </div>
       </div>
     );
}

export default Education;