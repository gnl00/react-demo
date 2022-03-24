import './Chat.css'

import NotchCard from "../../components/notchCard/NotchCard";
import HeaderCard from "../../components/headerCard/HeaderCard";
import ContactCard from "../../components/contactCard/ContactCard";
import ChatCard from "../../components/chatCard/ChatCard";

import {openWebsocket} from "../../network/websocket/websocket";
import {buildMessage} from "../../util/messageUtils";

import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getContactList} from "../../network/request/user";

let webSocket = null
const getWebsocketInstance = () => import("@/network/websocket/websocket")

export default function Chat() {

  // console.log('load Chat page')

  /* ================================================= redux =========================================================*/
  const uid = useSelector(state => state.uid)

  /* ================================================= state =========================================================*/
  const [to, setTo] = useState(null)
  const [contacts, setContacts] = useState([])
  const [messages, setMessages] = useState([])

  /* ================================================= useEffect =========================================================*/
  useEffect(() => {
    // console.log(uid)

    // 开启 websocket 连接
    const websocketState = openWebsocket(uid)
    if (websocketState) {
      getWebsocketInstance().then(res => {
        if (res) {
          webSocket = res.ws
        }
      })
    }

    // 获取好友列表
    fetchContacts(uid)

  }, [])

  /* ================================================= function callback =========================================================*/
  const sendClickCb = (value) => {

    // console.log('send click callback')
    // console.log(value)

    if (!value) {
      return
    }

    const objMsg = buildMessage({
      from: uid,
      to: 'websocket-server',
      body: value,
      type: 'string',
      time: new Date().getTime()
    })

    setMessages([
      ...messages,
      objMsg
    ])

    const jsonMsg = JSON.stringify(objMsg)

    webSocket.send(jsonMsg)

  }

  const contactListClickCb = (toId) => {
    setTo(toId)
  }

  /* ================================================= function fetch =========================================================*/
  // fetch and set contacts
  const fetchContacts = (uid) => {
    const contactList = getContactList(uid)
    setContacts([
      ...contacts,
      ...contactList,
    ])
  }

  /* ================================================= render =========================================================*/
  return (
    <div className={'w-full min-h-screen'}>

      <NotchCard />

      <div className={'p-10 rounded'}>
        <div className={'bg-white w-full h-full shadow rounded'}>

          <HeaderCard uid={uid} />

          <div className={'grid grid-cols-12 w-full h-full'}>
            <div className={'col-span-3 w-full h-full'}>
              <ContactCard contacts={contacts} contactListClickCb={contactListClickCb} />
            </div>

            <div className={'col-span-9 p-2 bg-white w-full h-auto'}>
              {
                to ? <ChatCard uid={uid} title={to} sendClickCb={sendClickCb} messages={messages} /> :
                  <div className={'bg-white shadow-lg w-full h-full flex justify-center items-center text-gray-700'}>
                    Pick one and chat
                  </div>
              }
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}