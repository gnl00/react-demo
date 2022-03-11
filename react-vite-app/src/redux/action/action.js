import {INCREMENT, DECREMENT} from "./actionTypes";

export const incrementAction = (payload) => ({
  type: INCREMENT,
  payload
})

export const decrementAction = (payload) => ({
  type: DECREMENT,
  payload
})
