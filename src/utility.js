import { ACTION_DELETE, ACTION_UPSERT } from "./Constants";

const getBidsAndAsks = (trades) => {
    const bids = [];
    const asks = [];
    for (const trade of trades) {
        if (trade[2] > 0) { // if amount is less than 0
            bids.push({ price: trade[0], count: trade[1], amount: trade[2], total: trade[1] * trade[2] });
        } else if (trade[2] < 0) {// if amount is greater than 0
            asks.push({ price: trade[0], count: trade[1], amount: trade[2], total: trade[1] * trade[2] });
        }
    }
    return { bids, asks };
}

const getTradeUpdate = (updatedTrade) => {
    const trade = {}

    if(updatedTrade && updatedTrade.length >= 2) {
        trade.price = updatedTrade[0];
        trade.count = updatedTrade[1];
        trade.amount = updatedTrade[2];
        trade.total = updatedTrade[1] * updatedTrade[2];
    }

    return trade;
}

export const initializeWebsocket = (props) => {
    let isSnapshot = false;

    // Create WebSocket connection.
    const socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

    // Connection opened
    socket.addEventListener('open', event => {
        socket.send(JSON.stringify({ event: "subscribe", channel: 'book', symbol: "tBTCUSD" }));
        // setTimeout(() => {
        //     socket.close();
        // }, 5000);
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
            } else if(isSnapshot && response.length >= 2 && Array.isArray(response[1])) { // updates
                const updatedTrade = getTradeUpdate(response[1]);
                if(updatedTrade.count > 0) {
                    if(updatedTrade.amount > 0) {
                        props.updateBids([{...updatedTrade, actionFlag: ACTION_UPSERT}]);
                    } else if (updatedTrade.amount < 0) {
                        props.updateAsks([{...updatedTrade, actionFlag: ACTION_UPSERT}]);
                    }
                } else if(updatedTrade.count === 0) {
                    if(updatedTrade.amount === 1) {
                        props.updateBids([{...updatedTrade, actionFlag: ACTION_DELETE}]);
                    } else if(updatedTrade.amount === -1) {
                        props.updateAsks([{...updatedTrade, actionFlag: ACTION_DELETE}]);
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

export const setLocalStorage = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val));
}

export const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
}