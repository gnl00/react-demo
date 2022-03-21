import './ChatOne.css'
import ToOneWS from "../../websocket/ToOneWS";
import {ChatBox, InputBox, OnLineBox, ReceivedBox, SentBox, TimeSpan, Title} from "../../components/chat/Chat";
import {useContext, useEffect, useState} from "react";
import { buildMsg } from "../../util/MessageUtils";

import { topContext } from "../topLayout/TopLayout";

// 消息样式
// const msgObj = {
//   from: '',
//   to: '',
//   date: '',
//   bodyType: 'text',
//   body: '',
//   msgType: 'initial | update | contact',
//   read: false,
// }

export default function ChatOne() {

  /* ================================================================ consts ================================================================ */
  const defaultTo = 'websocket-server'

  /* ================================================================ states ================================================================ */
  const [title, setTitle] = useState('SelfTalk')

  const [currentId, setCurrentId] = useState(null)
  const [receiverId, setReceiverId] = useState(defaultTo)

  const [input, setInput] = useState()

  const [users, setUsers] = useState([])

  const [msgList, setMsgList] = useState([])

  /* ================================================================ context ================================================================ */
  const {uid, users: online, message} = useContext(topContext);

  /* ================================================================ useEffects ================================================================ */
  useEffect(() => {
    console.log(uid, online ,message)

    setCurrentId(uid)
    setUsers(online)

    if (message) {
      const from = message.from
      setTitle(from)
      setReceiverId(from)

      setMsgList([
        ...msgList,
        message
      ])
    }

  }, [uid, online, message])


  /* ================================================================ functions ================================================================ */
  const inputChange = val => {
    setInput(val)
  }

  const sendClickCb = () => {
    // console.log(receiverId)
    if (input) {
      // 构建消息
      const finalMsg = buildMsg({from: currentId, to: receiverId, body: input})
      setMsgList([
        ...msgList,
        finalMsg
      ])
      const jsonStr = JSON.stringify(finalMsg);
      ToOneWS.send(jsonStr)
    }

    // 发送完成 input 置空
    setInput('')
  }

  const closeClickCb= () => {
    ToOneWS.close()
  }

  const chatCb = uid => {
    // console.log('chat with ', uid)
    setTitle(uid)
    setReceiverId(uid)
    setMsgList([])
  }

  /* ================================================================ render ================================================================ */
  return (
    <div className={'h-auto p-4 flex'}>
      <div className={'flex-1'}>
        <OnLineBox users={users} chatCb={chatCb} />
      </div>

      <div className={'flex-1'}>
        <InputBox input={input} inputChange={inputChange} sendClick={sendClickCb} closeClick={closeClickCb} />

        <ChatBox>
          <Title title={title} />
          <TimeSpan />
          {
            msgList.map((msg, index) => {
              return msg.from === currentId ?
                <SentBox key={index} msg={msg.body} /> :

                <ReceivedBox key={index} msg={msg.body} />
            })
          }
        </ChatBox>
      </div>

    </div>
    )
}
