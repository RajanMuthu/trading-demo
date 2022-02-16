import { useEffect } from 'react';
import { connect } from 'react-redux';
import './App.scss';
import { SET_ASKS, SET_BIDS, SET_CHANNEL_ID } from './Constants';
import TradingWidgetContainer from './containers/tradingWidgetContainer';
import { initializeWebsocket } from './utility';

function App(props) {

  useEffect(() => {
    initializeWebsocket(props);
  }, []);

  return (
    <div className="App">
      <TradingWidgetContainer />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setBidsSnapshot: bids => dispatch({type: SET_BIDS, payload: bids}),
    setAsksSnapshot: asks => dispatch({type: SET_ASKS, payload: asks}),
    setChannelId: (channelId) => dispatch({type: SET_CHANNEL_ID, payload: channelId})
  };
}

export default connect(null, mapDispatchToProps)(App);
