import {SET_AUTH, SET_USER_INFO} from "../../action/user/actionTypes";

const userInfo = {
  uid: null,
  isAuth: false,
};

const userReducer = (state = userInfo, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_AUTH:

      const userAuth = Object.assign({}, state)
      userAuth.isAuth = payload
      return userAuth

    case SET_USER_INFO:

      const {uid, isAuth} = payload
      const userInfo = Object.assign({}, state)
      userInfo.isAuth = isAuth
      userInfo.uid = uid
      return userInfo

    default:
      return state;
  }
}

export {
  userReducer
}