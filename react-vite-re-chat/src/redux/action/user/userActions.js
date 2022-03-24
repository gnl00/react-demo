import { SET_AUTH, SET_USER_INFO } from "./actionTypes";

export const setAuthAction = (payload) => ({
  type: SET_AUTH,
  payload
})

export const setUserInfoAction = (payload) => ({
  type: SET_USER_INFO,
  payload
})