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
import {Outlet, useNavigate} from 'react-router-dom'

export default function Chat(props) {

  // console.log('load Chat page')

  /* ================================================= redux =========================================================*/
  const uid = useSelector(state => state.uid)

  /* ================================================= context =========================================================*/
  const { webSocket, message } = useContext(Context);

  /* ================================================= router =========================================================*/
  const navigate = useNavigate()

  /* ================================================= state =========================================================*/
  const [to, setTo] = useState(null)
  const [contacts, setContacts] = useState([])
  const [messages, setMessages] = useState([])

  /* ================================================= useEffect =========================================================*/
  useEffect(() => {
    // console.log(uid)

    // 获取好友列表
    fetchContacts(uid)

  }, [])

  // useLayoutEffect()

  useEffect(() => {
    if (message) {
      const msgObj = JSON.parse(message)
      console.log(msgObj)

      setMessages([
        ...messages,
        msgObj
      ])

      setTo(msgObj.from)

    }
  }, [message])

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
    // only refresh now
    console.log('refresh')
  }

  const contactListClickCb = (toId) => {
    setTo(toId)

    navigate('/chat/' + toId)
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
      ...contacts,
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
              <ContactCard contacts={contacts} functionClickCb={functionClickCb} contactListClickCb={contactListClickCb} />
            </div>

            <div className={'col-span-9 p-2 mt-2 bg-white w-full h-auto'}>
              <Outlet>
                {/*{*/}
                {/*  to ? <ChatCard uid={uid} title={to} sendClickCb={sendClickCb} messages={messages} /> :*/}
                {/*    <div className={'bg-white shadow-lg w-full h-full flex justify-center items-center text-gray-700'}>*/}
                {/*      Pick one and chat*/}
                {/*    </div>*/}
                {/*}*/}
              </Outlet>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}