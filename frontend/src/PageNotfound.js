import React from 'react';
import {Link} from 'react-router-dom';

function PageNotfound() {
    return ( 
        <div className='container'>
            <div className='row'>
                <div className='col text-center mt-5 mb-4'>
                    <h2>404 page not found</h2>
                    <p>We couldn’t find the page you were looking for. Visit&nbsp;<Link class="navbar-brand" href="#" to={"/"}> Zerodha's Home page</Link></p>
                </div>
            </div>
        </div>
     );
}

export default PageNotfound;