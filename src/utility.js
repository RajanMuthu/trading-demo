
export const getBidsAndAsks = (trades) => {
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

export const getTradeUpdate = (updatedTrade) => {
    const trade = {}

    if(updatedTrade && updatedTrade.length >= 2) {
        trade.price = updatedTrade[0];
        trade.count = updatedTrade[1];
        trade.amount = updatedTrade[2];
        trade.total = updatedTrade[1] * updatedTrade[2];
    }

    return trade;
}

export const setLocalStorage = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val));
}

export const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

export const sort = (arr, sortCompareFunc) => {
    arr.sort(sortCompareFunc);
}