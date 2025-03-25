import React from 'react';

function Rightimage({ productName, description, learn, imageURL }) {
    return ( 
        <div className="container">
            <div className="row align-items-center p-5">
                <div className="col-lg-6 col-md-12 p-5 mt-3">
                    <h1>{productName}</h1>
                    <p className="text-muted mt-4">{description}</p>
                    <div>
                        <a className="textDec" href={learn}>Learn more →</a>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12 p-5 text-center">
                    <img style={{ width: "90%" }} src={imageURL} alt={productName} />
                </div>
            </div>
        </div>
    );
}

export default Rightimage;