import { SET_AUTH } from "../action/actionTypes";

const defaultAuth = false;

const isAuthReducer = (state = defaultAuth, action) => {
  switch (action.type) {
    case SET_AUTH:
      return action.payload
    default:
      break;
  }
}

export {
  isAuthReducer
}