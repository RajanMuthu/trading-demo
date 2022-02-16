import reducer from "../reducer";
import thunkMiddleware from "redux-thunk";

const { createStore, applyMiddleware } = require("redux");

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;