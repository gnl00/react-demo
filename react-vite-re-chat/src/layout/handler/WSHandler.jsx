import {openWebsocket} from "../../network/websocket/websocket";

import {createContext, useEffect, useState} from "react";
import {useSelector} from "react-redux";

const getWebsocketInstance = () => import("@/network/websocket/websocket")

export const Context = createContext(null)

export default function WSHandler(props) {

  /* ================================================= redux =========================================================*/
  const uid = useSelector(state => state.uid)

  /* ================================================= state =========================================================*/
  const [webSocket, setWebSocket] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {

    // 开启 websocket 连接
    const websocketState = openWebsocket(uid)
    if (websocketState) {
      getWebsocketInstance().then(res => {
        if (res) {
          setWebSocket(prevState => {

            const nextState = res.ws
            nextState.onmessage = onMessage

            return nextState
          })
        }
      })
    }

  }, []);

  /* ================================================= function =========================================================*/
  const onMessage = (res) => {
    setMessage(res.data)
  }

  /* ================================================= render =========================================================*/
  return (
    <Context.Provider value={{webSocket, message}}>
      { props.children }
    </Context.Provider>
  )
}