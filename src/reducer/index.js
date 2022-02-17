import _ from "lodash";
import { combineReducers } from "redux";
import { ACTION_DELETE, ASKS, BIDS, CHANNEL_ID, SET_ASKS, SET_BIDS, SET_CHANNEL_ID, UPDATE_ASKS, UPDATE_BIDS } from "../Constants";
import { getLocalStorage, setLocalStorage, sort } from "../utility";

const setChannelId = (state = getLocalStorage(CHANNEL_ID), action) => {
    if (action.type === SET_CHANNEL_ID) {
        setLocalStorage(CHANNEL_ID, action.payload);
        return action.payload;
    }
    return state;
}

const bidsReducer = (state = getLocalStorage(BIDS), action) => {
    if (action.type === SET_BIDS) {
        sort(action.payload, (a, b) => a.total - b.total);
        setLocalStorage(BIDS, action.payload);
        return action.payload;
    } else if (action.type === UPDATE_BIDS) {
        const updates = action.payload;
        const mergedUpdates = _.unionBy(updates, state, 'price');
        const filteredUpdates = mergedUpdates.filter(trade => trade.actionFlag !== ACTION_DELETE);
        sort(filteredUpdates, (a, b) => a.total - b.total);
        setLocalStorage(BIDS, filteredUpdates);
        return filteredUpdates;
    }
    return state;
}

const asksReducer = (state = getLocalStorage(ASKS), action) => {
    if (action.type === SET_ASKS) {
        sort(action.payload, (a, b) => b.total - a.total);
        setLocalStorage(ASKS, action.payload);
        return action.payload;
    } else if (action.type === UPDATE_ASKS) {
        const updates = action.payload;
        const mergedUpdates = _.unionBy(updates, state, 'price');
        const filteredUpdates = mergedUpdates.filter(trade => trade.actionFlag !== ACTION_DELETE);
        sort(filteredUpdates, (a, b) => b.total - a.total);
        setLocalStorage(ASKS, filteredUpdates);
        return filteredUpdates;
    }
    return state;
}

const reducer = combineReducers({
    bids: bidsReducer,
    asks: asksReducer,
    channelId: setChannelId
});

export default reducer;