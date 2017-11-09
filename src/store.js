
import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import vouchersReducer from "./reducers/vouchersReducer";

// 1. Create store
const store = createStore(
    combineReducers({ vouchers: vouchersReducer }),
    {}, // {}: initialState is optional 
    applyMiddleware(logger) 
);

export default store;