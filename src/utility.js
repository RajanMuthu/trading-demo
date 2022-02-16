const getBidsAndAsks = (trades) => {
    const bids = [];
    const asks = [];
    for (const trade of trades) {
        if (trade[2] > 0) { // if amount is less than 0
            bids.push({ price: trade[0], count: trade[1], amount: trade[2], total: trade[1] * trade[2] });
        } else if (trade[2] < 0) {
            asks.push({ price: trade[0], count: trade[1], amount: trade[2] * -1, total: trade[1] * trade[2] * -1 });
        }
    }
    return { bids, asks };
}

export const initializeWebsocket = (props) => {
    let isSnapshot = false;

    // Create WebSocket connection.
    const socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

    // Connection opened
    socket.addEventListener('open', event => {
        socket.send(JSON.stringify({ event: "subscribe", channel: 'book', symbol: "tBTCUSD" }));
        setTimeout(() => {
            socket.close();
        }, 5000);
    });

    // Listen for messages
    socket.addEventListener('message', event => {
        console.log('Message from server ', event.data);
        const response = JSON.parse(event.data);
        if (response && Array.isArray(response)) {
            if (!isSnapshot && response.length >= 2 && Array.isArray(response[1])) {
                isSnapshot = true;
                props.setChannelId(response[0]);
                const bidsAndAsks = getBidsAndAsks(response[1]);
                props.setBidsSnapshot(bidsAndAsks.bids);
                props.setAsksSnapshot(bidsAndAsks.asks);
            }
        }
    });

    socket.addEventListener('close', () => {
        console.log('websocket closed');
    })

    return () => {
        socket.close();
    }
}

export const setLocalStorage = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val));
}

export const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
}