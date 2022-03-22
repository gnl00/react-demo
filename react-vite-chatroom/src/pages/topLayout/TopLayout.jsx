import './TopLayout.css'
import emitter from "../../util/EmitterUtils";
import { useEffect, useState, createContext } from "react";

export const topContext = createContext(null)

export default function TopLayout(props) {

  /* ================================================================ consts ================================================================ */
  const self_events = 'self'
  const toOne_events = 'toOne'
  const toMany_events = 'toMany'

  /* ================================================================ states ================================================================ */
  const [uid, setUid] =  useState()
  const [users, setUsers] = useState([])
  const [msg, setMsg] = useState();

  const [onlineTips, setOnlineTips] = useState([])

  /* ================================================================ useEffects ================================================================ */
  useEffect(() => {

    // mount 进行事件监听
    console.log('TopLayout add listener')
    emitter.addListener(self_events, message => onMessage(message))
    emitter.addListener(toOne_events, message => onMessage(message))
    emitter.addListener(toMany_events, message => onMessage(message))

    return () => {

      // willUnmount 移除监听
      console.log('TopLayout remove listener')
      emitter.removeListener(self_events, message => {})
      emitter.removeListener(toOne_events, message => {})
      emitter.removeListener(toMany_events, message => {})
    }

  }, [])

  /* ================================================================ functions ================================================================ */
  const onMessage = message => {
    // console.log(message)

    const {uid, online} = message
    if (message.msgType === 'init') {
      // console.log('initial')

      setUid(uid)
      setUsers(online)

    } else if (message.msgType === 'update') {
      // console.log('update')
      setUsers(online)

    } else {
      // console.log('msg content')
      setMsg(message)
    }
  }

  /* ================================================================ render ================================================================ */
  return (
    <topContext.Provider value={
      {
        uid,
        users,
        message: msg,
      }
    }>
      <div className={'bg-gray-100 p-3 flex justify-center items-center space-x-4'}>
        <p className={'bg-white rounded p-4 w-20 font-mono font-bold text-2xl ring-outer ring-4 text-center'}>{uid}</p>
      </div>
      {props.children}
    </topContext.Provider>
  )
}