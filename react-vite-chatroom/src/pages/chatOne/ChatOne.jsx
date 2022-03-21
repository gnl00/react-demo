import './ChatOne.css'
import ToOneWS from "../../websocket/ToOneWS";
import emitter from "../../util/EmitterUtils";
import {ChatBox, InputBox, ReceivedBox, SentBox, TimeSpan, Title} from "../../components/chat/Chat";
import { useEffect, useState } from "react";
import { buildMsg } from "../../util/MessageUtils";

export default function ChatOne() {
  /* ================================================================ consts ================================================================ */
  const EMITTER_EVENT = 'toOne'

  /* ================================================================ states ================================================================ */
  const [initialState, setInitialState] = useState(true)
  const [currentId, setCurrentId] = useState(null)
  const [receiverId, setReceiverId] = useState(null)
  const [title, setTitle] = useState('ToOne')
  const [input, setInput] = useState()
  const [msgList, setMsgList] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([])
  const [receive, setReceive] = useState()

  /* ================================================================ useEffects ================================================================ */
  useEffect(() => {
    console.log('toOne addListener')
    emitter.addListener(EMITTER_EVENT, message => onMessage(message))

    // emitter.prependListener()

    return () => {
      console.log('toOne removeListener')
      emitter.removeListener(EMITTER_EVENT, message => {})
    }
  }, [])

  useEffect(() =>{
    if (initialState) {
      // console.log('Update initial state')
      setInitialState(prevState => {
        // console.log('prevState: ', prevState)
        // console.log('afterState: ', !initialState)
        return !initialState
      })
    }
  }, [currentId])

  useEffect(() => {
    if (receive) {
      setMsgList([
        ...msgList,
        receive
      ])
    }
  }, [receive])

  /* ================================================================ functions ================================================================ */
  const inputChange = val => {
    setInput(val)
  }

  const sendClickCb = () => {
    // console.log(receiverId)
    if (!receiverId) {
      alert('please chose a receiver first')
    } else if (input) {
      // 构建消息
      const finalMsg = buildMsg({from: currentId, to: receiverId, body: input})
      setMsgList([
        ...msgList,
        finalMsg
      ])
      const jsonStr = JSON.stringify(finalMsg);
      console.log(jsonStr)
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
  }

  let initial = initialState
  const onMessage = message => {
    console.log('messages ', message)

    if (initial) {
      // 第一条消息，主要接收一些初始化信息
      const {uid, online} = message;
      setCurrentId(uid)
      setOnlineUsers(online)
      initial = !initial
      // 初始化完成，直接 return
      return
    }

    if (!receiverId) {
      setTitle(message.from)
      setReceiverId(message.from)
    }
    // console.log(receiverId)
    setReceive(message)

  }

  /* ================================================================ render ================================================================ */
  return (
    <div className={'h-auto p-4 flex'}>
      <div className={'flex-1'}>
        <OnLineBox onlineUsers={onlineUsers} chatCb={chatCb} currentId={currentId} />
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

function OnLineBox(props) {
  const {onlineUsers, chatCb, currentId} = props
  return (
    <div className={'space-y-4 m-2 p-4'}>
      <div className={'h-full w-full bg-yellow-200 p-2 flex justify-center items-center rounded'}>
        <div className={'bg-blue-300 m-4 p-8 text-3xl font-mono font-bold rounded'}>{currentId}</div>
        <div className={'w-80 h-auto bg-gray-100'}>
          <div className={'bg-gray-200 p-2 text-lg font-semibold text-center'}>Online Users ({onlineUsers ? onlineUsers.length : 0})</div>
          {
            onlineUsers ?
              onlineUsers.map((item, index) => {
                return (
                  <UserCard userId={item} chatCb={chatCb} key={index} />
                )
              }) : <></>
          }
        </div>
      </div>
    </div>
  )
}

function UserCard(props) {
  const {userId, chatCb} = props

  const chatClick = () => {
    chatCb(userId)
  }

  return (
    <div className={'bg-white m-2 p-1 rounded flex items-center'}>
      <div className={'bg-indigo-200 p-2 m-2 w-auto rounded'}>{userId}</div>
      <div className={'flex-1 flex justify-end'}>
        <div className={'bg-green-200 p-3 rounded hover:bg-green-300'} onClick={chatClick}>Chat</div>
      </div>
    </div>
  )
}

function MessageBox(props) {
  return (
    <div></div>
  )
}