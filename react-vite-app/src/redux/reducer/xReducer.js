import {DECREMENT, INCREMENT} from "../action/actionTypes";

const objState = {
  id: '100000',
  val: 100,
  obj: true
}

const xReducer = (state = objState, action) => {
  switch (action.type) {
    case INCREMENT:

      // 同一个 action 可以影响到多个 reduer

      // 处理 state
      // 返回新的 state
      return {
        ...state,
        val: state.val + 5
      }
    case DECREMENT:
      return {
        ...state,
        val: state.val - 5
      }
    default:
      return state
  }
}

export default xReducer