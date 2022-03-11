import './Analyse.css'
import store from "../../redux/store";
import {incrementAction, decrementAction} from "../../redux/action/action";
import {useEffect, useState } from "react";

import {connect} from "react-redux";

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

const AppConn = connect(mapStateToProps, null)(Analyse)

function Analyse(props) {
  const [state, setState] = useState(0)

  console.log(props.reducer)

  useEffect(() => {

    // store.subscribe(() => {
    //   console.log('states were changed')
    // })

  }, [])

  const increase = () => {
    console.log('before increase ', store.getState())

    // store.dispatch 接受一个 Action 对象作为参数，将它发送出去
    store.dispatch(incrementAction(1))

    setState(store.getState().reducer)

    console.log('after increase ', store.getState())

  }

  const decrease = () => {
    store.dispatch(decrementAction(1))
    setState(store.getState().reducer)
  }

  return (
    <div className='Analyse w-full'>
      <div>
        <h1 className='text-xl'>Analyse page</h1>
        <div className={'space-x-4 m-2 text-xl w-full'}>
          <button className={'bg-gray-200 p-2 w-14 rounded'} type='button' onClick={increase}>+ 1</button>
          <span>{state}</span>
          <button className={'bg-gray-200 p-2 w-14 rounded'} type='button' onClick={decrease}>- 1</button>
        </div>
      </div>
    </div>
  )
}

export {
  Analyse,
  AppConn
}
