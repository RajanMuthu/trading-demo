import reducer from "../reducer";

const { createStore } = require("redux");

const store = createStore(reducer);

export default store;