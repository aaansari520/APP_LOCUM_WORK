import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import shopReducer from "../Reducer/shopeReducer";

const store = createStore(shopReducer, composeWithDevTools());

export default store;
