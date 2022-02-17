import React from 'react';
import { Asks_Grid_Header_Config, Bids_Grid_Header_Config } from '../../configs';
import GridHeader from '../GridHeader';
import GridRow from '../GridRow';
import './style.scss';

const TradingWidget = (props) => {
    return <div className="tradeWidget">
        <label>ORDER BOOK BTC/USD</label>
        <div className='wrapper'>
            <div className="bidsGrid">
                <GridHeader headerConfig={Bids_Grid_Header_Config} />
                {props.bids && props.bids.map(bid => {
                    return <GridRow rowData={bid} headerConfig={Bids_Grid_Header_Config} key={bid.price} />
                })}
            </div>
            <hr />
            <div className="asksGrid">
                <GridHeader headerConfig={Asks_Grid_Header_Config} />
                {props.asks && props.asks.map(ask => {
                    return <GridRow rowData={ask}
                        headerConfig={Asks_Grid_Header_Config}
                        key={ask.price}/>
                })}
            </div>
        </div>
    </div>;
}

export default React.memo(TradingWidget);