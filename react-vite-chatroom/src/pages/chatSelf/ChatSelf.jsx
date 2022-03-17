import './ChatSelf.css'
import emitter from "../../util/EmitterUtils";
import SelfWS from "../../websocket/SelfWS";

// 消息样式
// const msgObj = {
//   from: '',
//   to: '',
//   date: '',
//   type: 'string',
//   body: '',
//   read: false,
// }

import {useEffect, useState} from "react";

export default function ChatSelf() {

  /* ================================================================ consts ================================================================ */
  const from = '111111'
  const to = '222222'
  const SELF_EMITTER_EVENT = 'self'

  /* ================================================================ states ================================================================ */
  const [currentId, setCurrentId] = useState()
  const [input, setInput] = useState();
  const [receive, setReceive] = useState()
  const [msgList, setMsgList] = useState([
    {
      from,
      to,
      date: new Date(),
      type: 'string',
      body: 'Hello ?',
      read: false
    },
    {
      from: to,
      to: from,
      date: new Date(),
      type: 'string',
      body: 'Hi ~',
      read: false
    }
  ])

  /* ================================================================ useEffects ================================================================ */
  useEffect(() => {
    setCurrentId(from)

    // 挂载的时候进行事件监听
    console.log('add emitter listeners')
    emitter.addListener(SELF_EMITTER_EVENT, message => onMessage(message))

    return () => {
      console.log('remove emitter listeners')
      emitter.removeListener(SELF_EMITTER_EVENT, message => {})
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
  const buildMsg = ({from, to, date = new Date(), type = 'string', body, read = false}) => {
    return {
      from,
      to,
      date,
      type,
      body,
      read,
    }
  }

  const onMessage = message => {
    setReceive(message)
  }

  /* ================================================================ mouse or keyboard events ================================================================ */
  const onInputChange = (evt) => {
    setInput(evt.target.value)
  }

  const sendClick = () => {
    if (input) {
      // 构建消息
      const finalMsg = buildMsg({from, to, body: input})
      setMsgList([
        ...msgList,
        finalMsg
      ])
      SelfWS.send(JSON.stringify(finalMsg))
    }
    // 发送完成 input 置空
    setInput('')
  }

  const closeClick = () => {
    SelfWS.close()
  }

  /* ================================================================ render ================================================================ */
  return (
    <div className={'h-auto p-4'}>


      <div className={'space-x-4 flex justify-center items-center m-4 rounded rounded-md'}>

        <input id={'sendInput'} type={'text'} className={'ring-gray-200 ring-2 rounded focus:outline-none focus:ring-3 focus:ring-blue-500 h-10'} value={input || ''} onChange={onInputChange} />

        <button type={'button'} className={'bg-blue-300 hover:bg-blue-400 rounded p-1'} onClick={sendClick}>send</button>

        <button type={'button'} className={'bg-red-300 hover:bg-red-400 rounded p-1'} onClick={closeClick}>close</button>
      </div>

      <div className={'bg-indigo-100 flex flex-row justify-around items-center p-2 rounded rounded-md'}>

        {/* SelfTalk */}
        <div className={'bg-gray-100 h-full flex flex-col w-96 rounded rounded-md overflow-auto'}>
          <Title title={'SelfTalk'} />

          <TimeSpan />
          {
            msgList.map((msg, index) => {
              return msg.from === currentId ?
                <SentBox key={index} msg={msg.body} /> :

                <ReceivedBox key={index} msg={msg.body} />
            })
          }

        </div>
      </div>
    </div>
  )
}

/* ================================================================ components ================================================================ */
function SentBox(props) {
  return (
    <div className={'flex m-2 justify-end items-center'}>
      <div className={'bg-green-300 p-2 rounded rounded-md shadow-xm'}>{props.msg}</div>
    </div>
  )
}

function ReceivedBox(props) {
  const {msg} = props
  return (
    <div className={'flex m-2 justify-start items-center'}>
      <div className={'bg-white p-2 rounded rounded-md shadow-xm'}>{msg}</div>
    </div>
  )
}

function Title(props) {
  return (
    <div className={'bg-gray-200 p-2 text-center text-lg font-semibold'}>{props.title}</div>
  )
}

function TimeSpan() {
  const computeTime = () => {
    const date = new Date();
    const time = date.toLocaleDateString()
    return time
  }
  return (
    <div className={'flex justify-center items-center p-2 text-gray-700 text-xs'}>{computeTime()}</div>
  )
}