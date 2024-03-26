import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import reducer from "./reducer";
import { thunk } from "redux-thunk";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, applyMiddleware(thunk));

export default store;