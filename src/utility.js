function Trade(price, count, amount) {
    this.price = price;
    this.count = count;
    this.amount = amount;
    this.total = count * amount;
}


export const getBidsAndAsks = (trades) => {
    const bids = [];
    const asks = [];
    for (const trade of trades) {
        const [price, count, amount] = trade;
        const tr = new Trade(price, count, amount);
        if (amount > 0) {
            bids.push(tr);
        } else if (amount < 0) {
            asks.push(tr);
        }
    }
    return { bids, asks };
}

export const getTradeUpdate = (updatedTrade) => {
    let trade = {}

    if(updatedTrade && updatedTrade.length >= 2) {
        const [price, count, amount] = updatedTrade;
        trade = new Trade(price, count, amount);
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