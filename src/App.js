import { useEffect } from 'react';
import { connect } from 'react-redux';
import './App.scss';
import { SET_ASKS, SET_BIDS, SET_CHANNEL_ID, UPDATE_ASKS, UPDATE_BIDS, ACTION_DELETE, ACTION_UPSERT } from './Constants';
import TradingWidgetContainer from './containers/tradingWidgetContainer';
import { getBidsAndAsks, getTradeUpdate } from './utility';

function App(props) {

  const initializeWebsocket = () => {
    let isSnapshot = false;

    // Create WebSocket connection.
    const socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

    // Connection opened
    socket.addEventListener('open', event => {
      socket.send(JSON.stringify({ event: "subscribe", channel: 'book', symbol: "tBTCUSD" }));
    });

    // Listen for messages
    socket.addEventListener('message', event => {
      // console.log('Message from server ', event.data);
      const response = JSON.parse(event.data);
      if (response && Array.isArray(response)) {
        if (!isSnapshot && response.length >= 2 && Array.isArray(response[1])) { // snapshot
          isSnapshot = true;
          props.setChannelId(response[0]);
          const bidsAndAsks = getBidsAndAsks(response[1]);
          props.setBidsSnapshot(bidsAndAsks.bids);
          props.setAsksSnapshot(bidsAndAsks.asks);
        } else if (isSnapshot && response.length >= 2 && Array.isArray(response[1])) { // updates
          const updatedTrade = getTradeUpdate(response[1]);
          if (updatedTrade.count > 0) {
            if (updatedTrade.amount > 0) {
              props.updateBids([{ ...updatedTrade, actionFlag: ACTION_UPSERT }]);
            } else if (updatedTrade.amount < 0) {
              props.updateAsks([{ ...updatedTrade, actionFlag: ACTION_UPSERT }]);
            }
          } else if (updatedTrade.count === 0) {
            if (updatedTrade.amount === 1) {
              props.updateBids([{ ...updatedTrade, actionFlag: ACTION_DELETE }]);
            } else if (updatedTrade.amount === -1) {
              props.updateAsks([{ ...updatedTrade, actionFlag: ACTION_DELETE }]);
            }
          }
        }
      }
    });

    socket.addEventListener('close', () => {
      console.log('websocket closed');
    })

    return socket;
  }

  useEffect(() => {
    const ws = initializeWebsocket();
    return () => {
      ws && ws.close();
    }
  }, []);

  return (
    <div className="App">
      <TradingWidgetContainer key={props.channelId} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return { channelId: state.channelId }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setBidsSnapshot: bids => dispatch({ type: SET_BIDS, payload: bids }),
    setAsksSnapshot: asks => dispatch({ type: SET_ASKS, payload: asks }),
    updateBids: (bids, actionFlag) => dispatch({ type: UPDATE_BIDS, payload: bids, actionFlag }),
    updateAsks: (asks, actionFlag) => dispatch({ type: UPDATE_ASKS, payload: asks, actionFlag }),
    setChannelId: (channelId) => dispatch({ type: SET_CHANNEL_ID, payload: channelId }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
