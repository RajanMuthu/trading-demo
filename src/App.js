import { useEffect } from 'react';
import { connect } from 'react-redux';
import './App.scss';
import { SET_ASKS, SET_BIDS, SET_CHANNEL_ID, UPDATE_ASKS, UPDATE_BIDS } from './Constants';
import TradingWidgetContainer from './containers/tradingWidgetContainer';
import { initializeWebsocket } from './utility';

function App(props) {

  useEffect(() => {
    const ws = initializeWebsocket(props);

    return () => {
      ws && ws.close();
    }
  }, []);

  return (
    <div className="App">
      <TradingWidgetContainer key={props.channelId}/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {channelId: state.channelId}
}

const mapDispatchToProps = (dispatch) => {
  return {
    setBidsSnapshot: bids => dispatch({type: SET_BIDS, payload: bids}),
    setAsksSnapshot: asks => dispatch({type: SET_ASKS, payload: asks}),
    updateBids: (bids, actionFlag) => dispatch({type: UPDATE_BIDS, payload: bids, actionFlag}),
    updateAsks: (asks, actionFlag) => dispatch({type: UPDATE_ASKS, payload: asks, actionFlag}),
    setChannelId: (channelId) => dispatch({type: SET_CHANNEL_ID, payload: channelId}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
