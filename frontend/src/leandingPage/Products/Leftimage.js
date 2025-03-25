import React from 'react';

function Leftimage({ imageURL, productName, description, tryDemo, learn, google, app }) {
    return ( 
        <div className="container">
            <div className="row align-items-center p-5">
                <div className="col-lg-6 col-md-12 p-5 text-center">
                    <img style={{ width: "85%" }} src={imageURL} alt={productName} />
                </div>
                <div className="col-lg-6 col-md-12 p-4">
                    <h1>{productName}</h1>
                    <p className="text-muted mt-4">{description}</p>
                    <div>
                        <a className="textDec me-4" href={tryDemo}>Try Demo →</a>
                        <a className="textDec" href={learn}>Learn more →</a>
                    </div>
                    <div className="mt-4">
                        <a href={google}>
                            <img className="me-3" src="Media/images/appstoreBadge.svg" alt="App Store" />
                        </a>
                        <a href={app}>
                            <img src="Media/images/googlePlayBadge.svg" alt="Google Play" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Leftimage;
