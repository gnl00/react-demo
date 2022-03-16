import './Chat.css'
import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import ws from "./websoket";

export default function Chat() {

  const from = '111111'
  const to = '222222'

  const msgObj = {
    from: '',
    to: '',
    date: '',
    type: '',
    body: '',
    read: false
  }

  const [currentId, setCurrentId] = useState()
  const [input, setInput] = useState();
  const [msgList, setMsgList] = useState([
    {
      from: '111111',
      to: '222222',
      date: new Date(),
      type: 'string',
      body: 'Hello~ R U there?',
      read: false
    },
    {
      from: '222222',
      to: '111111',
      date: new Date(),
      type: 'string',
      body: 'Hi~ I\' here!',
      read: false
    }
  ])

  useEffect(() => {
    setCurrentId(from)
  }, [])

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
      console.log(finalMsg)
    }
    // ws.send(msg)


    // 发送完成 input 置空
    setInput('')
  }

  const closeClick = () => {
    // ws.close()
  }

  const buildMsg = ({from, to, date = new Date(), type = 'string', body, read = false}) => {
    console.log(body)
    return {
      from,
      to,
      date,
      type,
      body,
      read,
    }
  }

  // useEffect(() => {
  //   if (input) {
  //     console.log(input)
  //   }
  // }, [input])

  const onMessage = () => {
    ws.onmessage = res => {
      console.log('收到消息 ', res.data)

      // const receive = React.createElement(ReceiveBox, {msg: res.data, className: 'text-red-500'}, '', '')
      // ReactDOM.render(
      //   receive,
      //   document.getElementById('receiveBox')
      // )

      // setReceiveMsg([
      //   ...receiveMsg,
      //   res.data
      // ])

    }
  }

  // useEffect(() => {
  //   console.log('sendMsg ', sendMsg)
  //
  // }, [sendMsg])
  //
  // useEffect(() => {
  //   console.log('receiveMsg ', receiveMsg)
  // }, [receiveMsg])



  return (
    <div className={'h-screen p-4'}>
      <h1 className={'text-center text-3xl mb-4'}>ChatRoom</h1>
      <p className={'text-gray-500 text-center'}>Welcome</p>

      <div className={'space-x-4 flex justify-center items-center m-4 rounded rounded-md'}>

        <input id={'sendInput'} type={'text'} className={'ring-gray-200 ring-2 rounded focus:outline-none focus:ring-3 focus:ring-blue-500 h-10'} value={input || ''} onChange={onInputChange} />

        <button type={'button'} className={'bg-blue-300 hover:bg-blue-400 rounded p-1 font-semibold'} onClick={sendClick}>send</button>

        <button type={'button'} className={'bg-red-300 hover:bg-red-400 rounded p-1'} onClick={closeClick}>close</button>
      </div>

      <div className={'bg-indigo-100 flex flex-col justify-center items-center p-2 rounded rounded-md'}>
        <div className={'bg-gray-100 h-auto flex flex-col w-96 rounded rounded-md'}>

          {
            msgList.map((msg, index) => {
              return msg.from === currentId ?
                <SendBox key={index} msg={msg.body} /> :

                <ReceiveBox key={index} msg={msg.body} />
            })
          }

        </div>
      </div>
    </div>
  )
}

function SendBox(props) {
  return (
    <div className={'flex m-2 justify-end items-center'}>
      <div className={'bg-green-300 p-2 rounded rounded-md shadow-xm'}>{props.msg}</div>
    </div>
  )
}

function ReceiveBox(props) {
  const {msg} = props
  return (
    <div className={'flex m-2 justify-start items-center'}>
      <div className={'bg-white p-2 rounded rounded-md shadow-xm'}>{msg}</div>
    </div>
  )
}