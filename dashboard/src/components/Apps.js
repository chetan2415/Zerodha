import React from 'react';

function Apps() {
    return ( 
        <div className='app'>
            <div className='imp'>
                    <h3 className='k'>Kite</h3>
                    <p className='text-muted border-bottom'><b>Kite</b> is Zerodha's flagship trading platform, designed for seamless trading and investing across equities, commodities, currencies, and derivatives. It is available both as a web-based platform and a mobile app. Kite features an intuitive and minimalistic interface, advanced charting with over 100 technical indicators, multiple watchlists, and integration with TradingView and ChartIQ for technical analysis. It supports fast order placements, historical data access, and provides real-time updates, making it ideal for both beginners and advanced traders.</p>
                    
                    <b>URL:</b>&nbsp;&nbsp;<a className="a" href=''>https://kite.zerodha.com/</a>

                    <h3>Coin</h3>
                    <p className='text-muted border-bottom'><b>Coin</b> is Zerodha's platform for investing in direct mutual funds, bonds, and government securities. It enables investors to invest directly without paying commissions, which helps maximize returns over the long term. Coin simplifies mutual fund tracking, SIP management, and redemption processes. It also integrates seamlessly with Zerodha’s demat account, ensuring all investments are stored securely.</p>

                    <b>URL:</b>&nbsp;&nbsp;<a className="a" href=''>https://coin.zerodha.com/</a>

                    <h3>Varsity</h3>
                    <p className='text-muted border-bottom'><b>Varsity</b> is Zerodha's educational platform, offering in-depth and easy-to-understand modules on stock markets, trading, investing, technical analysis, derivatives, and personal finance. It caters to users of all skill levels, from beginners to experts. Varsity is freely accessible and is a great resource for anyone looking to build a strong foundation in financial markets</p>

                    <b>URL:</b>&nbsp;&nbsp;<a className="a" href=''>https://zerodha.com/varsity/</a>

                    <h3>Console</h3>
                    <p className='text-muted'><b>Console</b> is Zerodha’s back-office platform that provides detailed insights into your trades and investments. It serves as a financial dashboard, offering access to P&L reports, tax statements, portfolio analytics, trade history, and holding summaries. Console also enables IPO applications through UPI and supports easy tracking of dividends and corporate actions.</p>

                    <b>URL:</b>&nbsp;&nbsp;<a className="a" href=''>https://console.zerodha.com/</a>
                </div>
        </div>
     );
}

export default Apps;