import './Chat.css'

import NotchCard from "../../components/notchCard/NotchCard";
import HeaderCard from "../../components/headerCard/HeaderCard";
import ContactCard from "../../components/contactCard/ContactCard";
import ChatCard from "../../components/chatCard/ChatCard";

import {buildMessage} from "../../util/messageUtils";
import {getContactList} from "../../network/request/user";

import {Context} from "../../layout/handler/WSHandler";

import {useContext, useEffect, useState} from "react";
import {useSelector} from "react-redux";

export default function Chat() {

  // console.log('load Chat page')

  /* ================================================= redux =========================================================*/
  const uid = useSelector(state => state.uid)

  /* ================================================= context =========================================================*/
  const { webSocket, message } = useContext(Context);

  /* ================================================= state =========================================================*/
  const [to, setTo] = useState(null)
  const [contacts, setContacts] = useState([])
  const [messages, setMessages] = useState([])
  const [showChatInterface, setShowChatInterface] = useState(false)

  const [unreadMessages, setUnReadMessages] = useState()

  /* ================================================= useEffect =========================================================*/
  useEffect(() => {

    // console.log(uid)

    // load messages from local
    const localMsg = localStorage.getItem(uid)
    if (localMsg) {
      setMessages([
        ...messages,
        ...JSON.parse(localMsg)
      ])
    }

    // 获取好友列表
    fetchContacts(uid)

  }, [])

  useEffect(() => {
    if (message) {
      const msgObj = JSON.parse(message)
      // console.log(msgObj)

      setMessages([
        ...messages,
        msgObj
      ])

      // setTo(msgObj.from)

      // 接收到消息
      // 当前聊天窗口对象和消息发送对象不一致才存入未读消息
      if (to != msgObj.from) {
        setUnReadMessages(prevState => {

          let key = msgObj.from
          let count = 0

          // 已经存在 key
          if (prevState && Object.keys(prevState).indexOf(key) !== -1) {
            // 获取 unread count
            count = prevState[key].count
          }

          count = count + 1

          // 未存在 key，根据 key 创建对象
          let obj = {
            [key]: {
              count
            }
          }

          let nextState = null

          if (prevState) {
            nextState = {
              ...prevState,
              ...obj,
            }
          } else {
            nextState = {
              ...obj
            }
          }

          // console.log(nextState)

          return nextState
        })
      }

    }
  }, [message])

  useEffect(() => {

    // remove local messages
    localStorage.removeItem(uid)

    // save message to local
    localStorage.setItem(uid, JSON.stringify(messages))
  }, [messages])

  /* ================================================= function callback =========================================================*/
  const sendClickCb = (value) => {

    // console.log('send click callback')
    // console.log(value)

    if (!value) {
      return
    }

    const objMsg = buildMessage({
      from: uid,
      to,
      body: value,
      type: 'string',
      date: new Date().getTime()
    })

    setMessages([
      ...messages,
      objMsg
    ])

    const jsonMsg = JSON.stringify(objMsg)
    webSocket.send(jsonMsg)
  }

  const functionClickCb = () => {
    // only for refresh now
    console.log('refresh')

    // 获取好友列表
    fetchContacts(uid)
  }

  const contactListClickCb = (toId) => {
    setTo(toId)

    setShowChatInterface(true)

    setUnReadMessages(prevState => {

      let nextState = null

      // 存在未读消息
      if (prevState && Object.keys(prevState).indexOf(toId) != -1) {
        // 打开聊天框的时候清空
        nextState = Object.assign({}, prevState)
        nextState[toId] = null
      }
    })
  }

  /* ================================================= function fetch =========================================================*/
  // fetch and set contacts
  const fetchContacts = async (uid) => {

    const list = await getContactList(uid).then(res => {
      return res.filter((item) => item.uid != uid)
    }).catch(err => {
      console.log(err)
    })

    setContacts([
      ...list
    ])

  }

  /* ================================================= render =========================================================*/
  return (
    <div className={'w-full min-h-screen bg-gray-100'}>

      <NotchCard />

      <div className={'p-10 rounded'}>
        <div className={'bg-white w-full h-full shadow rounded'}>

          <HeaderCard uid={uid} />

          <div className={'grid grid-cols-12 w-full h-full'}>
            <div className={'col-span-3 w-full h-full mt-2'}>
              <ContactCard contacts={contacts} unreadMessages={unreadMessages} functionClickCb={functionClickCb} contactListClickCb={contactListClickCb} />
            </div>

            <div className={'col-span-9 p-2 mt-2 bg-white w-full h-auto'}>
              {
                showChatInterface ?
                  <ChatCard uid={uid} title={to} sendClickCb={sendClickCb} messages={messages} setShowChatInterface={setShowChatInterface}  /> :
                  <div className={['bg-white shadow-lg w-full h-full flex justify-center items-center text-gray-700', !showChatInterface ? '' : 'hidden'].join(' ')}>
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