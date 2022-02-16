import { combineReducers } from "redux";
import { ASKS, BIDS, SET_ASKS, SET_BIDS, SET_CHANNEL_ID, UPDATE_ASKS, UPDATE_BIDS } from "../Constants";
import { getLocalStorage, setLocalStorage } from "../utility";

const setChannelId = (state = null, action) => {
    if (action.type === SET_CHANNEL_ID) {
        return action.payload;
    }
    return state;
}

const bidsReducer = (state = getLocalStorage(BIDS), action) => {
    if (action.type === SET_BIDS) {
        setLocalStorage(BIDS, action.payload);
        return action.payload;
    } else if (action.type === UPDATE_BIDS) {
        return null;
    }
    return state;
}

const asksReducer = (state = getLocalStorage(ASKS), action) => {
    if (action.type === SET_ASKS) {
        setLocalStorage(ASKS, action.payload);
        return action.payload;
    } else if (action.type === UPDATE_ASKS) {
        return null;
    }
    return state;
}

const reducer = combineReducers({
    bids: bidsReducer,
    asks: asksReducer,
    channelId: setChannelId
});

export default reducer;