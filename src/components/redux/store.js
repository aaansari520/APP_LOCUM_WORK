import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import shopReducer from "./shopReducer";

const store = createStore(shopReducer, composeWithDevTools());

export default store;
