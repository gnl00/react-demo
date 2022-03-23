import { combineReducers, createStore } from "redux";
import {userReducer} from "./reducer/user/userReducer";

// const rootReducer = combineReducers(userReducer)

const store = createStore(userReducer)

export default store