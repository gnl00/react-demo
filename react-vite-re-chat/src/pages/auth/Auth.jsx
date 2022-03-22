import {createContext, useState} from "react";

export default function Auth(props) {

  const Context = createContext(null)

  const [isAuth, setIsAuth] = useState(false);
  const [webSocket, setWebSocket] = useState(null)

  console.log('auth load')

  if (isAuth) {
    const ws = "@/network/websocket/websocket";
    setWebSocket(ws)
  }

  return (
    <Context.Provider value={webSocket}>
      {
        isAuth ? props.children : <></>
      }
    </Context.Provider>
  )
}