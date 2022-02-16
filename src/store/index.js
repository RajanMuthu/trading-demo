import reducer from "../reducer";
// import thunkMiddleware from "redux-thunk";

const { createStore } = require("redux");

const store = createStore(reducer);

export default store;