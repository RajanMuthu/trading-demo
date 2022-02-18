import React from 'react';
import AsksGrid from './AsksGrid';
import BidsGrid from './BidsGrid';
import './style.scss';

const TradingWidget = (props) => {
    return <div className="tradeWidget">
        <label>ORDER BOOK BTC/USD</label>
        <div className='wrapper'>
            <BidsGrid bids={props.bids}/>
            <hr />
            <AsksGrid asks={props.asks}/>
        </div>
    </div>;
}

export default React.memo(TradingWidget);