import './Chat.css'
import {useEffect} from "react";

export default function Chat() {

  console.log('auth success, load Chat page')

  useEffect(() => {
    openWebsocket().then(res => {
      console.log('opening websocket')
    }).catch(err => {
      console.log('open websocket error: ', err.message)
    })
  }, [])

  const openWebsocket = () => import('@/network/websocket/websocket')

  return (
    <div>
      <h1 className={'bg-blue-100 text-center'}>ChatPage</h1>
    </div>
  )
}