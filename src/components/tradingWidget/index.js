
 const TradingWidget = (props) => {
    return <div>
        Bids: {JSON.stringify(props.bids)} <br/>
        Asks: {JSON.stringify(props.asks)}
    </div>;
}

export default TradingWidget;