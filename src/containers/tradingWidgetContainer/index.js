import { connect } from "react-redux"
import TradingWidget from "../../components/tradingWidget"

const TradingWidgetContainer = (props) => {
    return <TradingWidget
        bids={props.bids} 
        asks={props.asks} />
}

const mapStateToProps = (state) => {
    return {
        bids: state.bids,
        asks: state.asks
    }
}

const mapDispatchToProps = (dispatch) => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(TradingWidgetContainer);