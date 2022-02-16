import { Asks_Grid_Header_Config, Bids_Grid_Header_Config } from '../../configs';
import GridHeader from '../GridHeader';
import GridRow from '../GridRow';
import './style.scss';

const TradingWidget = (props) => {
    props.bids.sort((a, b) => a.total - b.total);
    props.asks.sort((a, b) => a.total - b.total);

    return <div className="tradeWidget">
        <div className="bidsGrid">
            <GridHeader headerConfig={Bids_Grid_Header_Config} />
            {props.bids.map(bid => {
                return <GridRow rowData={bid} headerConfig={Bids_Grid_Header_Config} key={bid.price}/>
            })}
        </div>
        <div className="asksGrid">
            <GridHeader headerConfig={Asks_Grid_Header_Config} />
            {props.asks.map(ask => {
                return <GridRow rowData={ask} headerConfig={Asks_Grid_Header_Config} key={ask.price} />
            })}
        </div>
    </div>;
}

export default TradingWidget;