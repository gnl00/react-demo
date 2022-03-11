import {createStore} from "redux";

// 导入并组合所有的 reducer
import {combineReducers} from "redux";
import {reducer} from "./reducer/reducer";
import XReducer from "./reducer/xReducer";

const rootReducer = combineReducers({
  reducer,
  XReducer
})

const store = createStore(rootReducer);

export default store