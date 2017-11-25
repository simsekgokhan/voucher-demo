
import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import appReducer from "./reducers/appReducer";
import vouchersReducer from "./reducers/vouchersReducer";

// Create store
const store = createStore(
    combineReducers({ app: appReducer, vouchers: vouchersReducer }),
    {}, // {}: initialState is optional 
    applyMiddleware(logger) 
);

export default store;