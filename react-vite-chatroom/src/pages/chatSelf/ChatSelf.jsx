import './ChatSelf.css'
import SelfWS from "../../websocket/SelfWS";
import { buildMsg } from "../../util/MessageUtils";
import { useContext, useEffect, useState } from "react";
import { ChatBox, InputBox, ReceivedBox, SentBox, TimeSpan, Title } from "../../components/chat/Chat";
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

export default function ChatSelf() {

  /* ================================================================ consts ================================================================ */
  const to = 'websocket-server'

  /* ================================================================ context ================================================================ */

  const {uid, users, messages} = useContext(topContext);

  /* ================================================================ states ================================================================ */
  const [currentId, setCurrentId] = useState()
  const [input, setInput] = useState();
  const [receive, setReceive] = useState()
  const [msgList, setMsgList] = useState([
    {
      from: uid,
      to,
      date: new Date(),
      type: 'string',
      body: 'Hello ?',
      read: false
    },
    {
      from: to,
      to: uid,
      date: new Date(),
      type: 'string',
      body: 'Hi ~',
      read: false
    }
  ])

  /* ================================================================ useEffects ================================================================ */
  useEffect(() => {
    console.log(uid, users, messages)

    setCurrentId(uid)

    // 挂载的时候进行事件监听
    // console.log('add emitter listeners')
    // emitter.addListener(SELF_EMITTER_EVENT, message => onMessage(message))

    return () => {
      // console.log('remove emitter listeners')
      // emitter.removeListener(SELF_EMITTER_EVENT, message => {})
    }
  }, [])

  useEffect(() => {
    if (receive) {
      setMsgList([
        ...msgList,
        receive
      ])
    }
  }, [receive])

  /* ================================================================ functions ================================================================ */
  // const onMessage = message => {
  //   setReceive(message)
  // }

  const inputBoxCb = val => {
    setInput(val)
  }

  const sendClickCb = () => {
    if (input) {
      // 构建消息
      const finalMsg = buildMsg({from: currentId, to, body: input})
      setMsgList([
        ...msgList,
        finalMsg
      ])
      SelfWS.send(JSON.stringify(finalMsg))
    }
    // 发送完成 input 置空
    setInput('')
  }

  const closeClickCb = () => {
    SelfWS.close()
  }

  /* ================================================================ render ================================================================ */
  return (
    <div className={'h-auto p-4'}>

      <InputBox input={input} inputChange={inputBoxCb} sendClick={sendClickCb} closeClick={closeClickCb} />
      <ChatBox>
        <Title title={'SelfTalk'} />
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
  )
}