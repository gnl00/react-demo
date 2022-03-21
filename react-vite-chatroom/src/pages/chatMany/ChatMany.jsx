import './ChatMany.css'

import { topContext } from "../topLayout/TopLayout";
import {useContext, useEffect, useState} from "react";
import {TimeSpan} from "../../components/chat/Chat";

import ToManyWS from "../../websocket/ToManyWS";
import {buildMsg} from "../../util/MessageUtils";

export default function ChatMany() {

  /* ================================================================ context ================================================================ */
  const {uid, users: online, message} = useContext(topContext);

  /* ================================================================ states ================================================================ */
  const [inputVal, setInputVal] = useState()

  const [title, setTitle] = useState('DefaultGroup')
  const [currentId, setCurrentId] = useState()

  const [messages, setMessages] = useState([
    {
      from: '1',
      body: 'hey',
    },
    {
      from: 'websocket-server',
      body: 'hi'
    },
  ])

  const [groups, setGroups] = useState(['a', 'b'])

  /* ================================================================ useEffects ================================================================ */
  useEffect(() => {
    // console.log(uid, online ,message)
    setCurrentId(uid)

    if (message) {
      console.log(message)
      setMessages([
        ...messages,
        message
      ])
    }

  }, [uid, message])

  /* ================================================================ functions ================================================================ */
  const chatCb = groupName => {
    // console.log('chat with ', uid)
    setTitle(groupName)
  }

  const inputChangeCb = value => {
    setInputVal(value)
  }

  const sendClickCb = () => {
    if (inputVal) {
      console.log(inputVal)

      const msgObj = buildMsg({from: currentId, to: 'groupId', body: inputVal})

      ToManyWS.send(JSON.stringify(msgObj))
    }
  }

  /* ================================================================ render ================================================================ */
  return (
    <div className={'h-auto p-4 flex flex-col rounded space-x-4 font-mono'}>
      <div className={'flex justify-around items-center'}>
        <div></div>
        <InputBox inputVal={inputVal} inputChangeCb={inputChangeCb} sendClick={sendClickCb} />
      </div>
      <div className={'flex space-x-4'}>
        <GroupBox groups={groups} chatCb={chatCb}  />
        <ChatBox title={title} currentId={currentId} messages={messages} />
      </div>
    </div>
  )
}

/* ================================================================ components ================================================================ */

function InputBox(props) {
  const {inputVal, inputChangeCb, sendClick} = props

  const inputChange = (evt) => {
    inputChangeCb(evt.target.value)
  }

  const onSendClick = () => {
    sendClick()
  }

  return (
    <div className={'m-4 flex justify-center items-center space-x-4 font-mono font-bold text-lg'}>
      <input className={'h-8 outline-none rounded ring-outer ring-2 focus:ring-yellow-300 focus:ring-4'} value={inputVal || ''} onChange={inputChange} />
      <div className={'bg-red-200 p-2 rounded hover:bg-red-300'} onClick={onSendClick}>send</div>
    </div>
  )
}

function ChatBox(props) {
  const {title, currentId, messages} = props

  return (
    <div className={'flex-1 w-full flex flex-col justify-center items-center bg-indigo-100 h-auto rounded p-2 w-96'}>

      <div className={'bg-gray-100 w-96 rounded h-auto w-full'}>
        <ChatTitle title={title} />
        <TimeSpan />

        <MessageBox currentId={currentId} messages={messages} />
      </div>
    </div>
  )
}

function MessageBox(props) {
  const {currentId, messages} = props

  return (
    <div className={'pl-2 w-full'}>
      {
        messages.map((message, index) => {
          return message.from === currentId ?
            <SentBox uid={message.from} message={message.body} key={index} /> : <ReceivedBox uid={message.from} message={message.body} key={index} />
        })
      }
    </div>
  )
}

function SentBox(props) {
  const {uid, message} = props

  return (
    <div className={'flex h-auto w-full justify-end items-center pr-2 mb-2'}>
      <div className={'bg-green-400 rounded flex justify-center items-center mr-2 p-3'}>{message}</div>
      <div className={'bg-gray-200 rounded h-10 w-10 overflow-hidden flex justify-center items-center'}>{uid}</div>
    </div>
  )
}

function ReceivedBox(props) {
  const { uid, message } = props
  return (
    <div className={'h-auto w-full flex justify-start items-center mb-2'}>
      <div className={'bg-gray-200 rounded w-10 h-10 flex justify-center items-center overflow-hidden'}>{uid}</div>
      <div className={'flex justify-center items-center bg-white p-3 ml-2 mr-16 rounded'}>
        <span>{message}</span>
      </div>
    </div>
  )
}

function GroupBox(props) {
  const {groups, chatCb} = props

  return (
    <div className={'flex-1 flex justify-center items-center bg-yellow-100 h-auto rounded p-2'}>
      <div className={'bg-gray-100 w-96 rounded h-auto'}>
        <ChatTitle title={'Groups('+ groups.length +')'} />
        {
          groups.map((gp, index) => {
            return (
              <GroupCard groupId={gp} key={index} chatCb={chatCb} />
            )
          })
        }
      </div>
    </div>
  )
}

function GroupCard(props) {
  const {groupId, chatCb} = props

  const chatCbClick = () => {
    chatCb(groupId)
  }

  return (
    <div className={'m-2 rounded p-1 bg-white flex justify-around items-center h-14'}>
      <div className={'bg-purple-100 p-3 rounded w-20 text-center'}>{groupId}</div>
      <div className={'p-3 bg-green-100 rounded hover:bg-green-300 text-center'} onClick={chatCbClick}>Chat</div>
    </div>
  )
}

function ChatTitle(props) {
  const {title} = props
  return (
    <div className={'bg-gray-200 text-center p-2 text-xl font-bold'}>{title}</div>
  )
}