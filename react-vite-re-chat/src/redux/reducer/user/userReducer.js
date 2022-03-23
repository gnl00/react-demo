import { SET_AUTH } from "../../action/user/actionTypes";

const userInfo = {
  uid: null,
  isAuth: false,
};

const userReducer = (state = userInfo, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_AUTH:
      const nextState = Object.assign({}, state)
      nextState.isAuth = payload
      return nextState
    default:
      return state;
  }
}

export {
  userReducer
}