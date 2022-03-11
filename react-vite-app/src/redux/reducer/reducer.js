import {DECREMENT, INCREMENT} from "../action/actionTypes";

const iniState = 0

// reducer 是一个纯函数，接收旧 state，和对 state 进行操作的 action，返回一个新的 state
// 由于 Reducer 是纯函数，就可以保证同样的 State，必定得到同样的 View。
// 但也正因为这一点，Reducer 函数里面不能改变 State，必须返回一个全新的对象
// 最好把 State 对象设成只读

const reducer = (state = iniState, action) => {
  switch (action.type) {
    case INCREMENT:

      // console.log('old state ', state)
      // 处理 state
      // console.log('new state ', state + action.payload)

      // 返回新的 state
      return state + action.payload
    case DECREMENT:
      return state - action.payload
    default:
      return state
  }
}

// State 是一个对象
function reducer1(state, action) {
  return Object.assign({}, state, { thingToChange });
  // 或者
  return { ...state, ...newState };
}

// State 是一个数组
function reducer2(state, action) {
  return [...state, newItem];
}

export {
  reducer
}