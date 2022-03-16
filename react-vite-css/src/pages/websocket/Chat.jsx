import './Chat.css'
import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import ws from "./websoket";

export default function Chat() {

  const [val, setVal] = useState(null);

  const [receiveMsg, setReceiveMsg] = useState([])
  const [sendMsg, setSendMsg] = useState([])

  const sendClick = () => {
    setSendMsg([
      ...sendMsg,
      val
    ])
    ws.send(val)
  }

  const onMessage = () => {
    ws.onmessage = res => {
      console.log('收到消息 ', res.data)

      const receive = React.createElement(ReceiveBox, {msg: res.data, className: 'text-red-500'}, '', '')
      // ReactDOM.render(
      //   receive,
      //   document.getElementById('receiveBox')
      // )

      setReceiveMsg([
        ...receiveMsg,
        res.data
      ])

    }
  }

  onMessage()

  useEffect(() => {
    console.log('sendMsg ', sendMsg)
    console.log('receiveMsg ', receiveMsg)

  }, [receiveMsg, sendMsg])

  const closeClick = () => {
    ws.close()
  }

  return (
    <div className={'h-screen p-4'}>
      <h1 className={'text-center text-3xl mb-4'}>welcome to chatroom</h1>
      <div className={'space-x-4 flex justify-center items-center m-2'}>
        <input type={'text'} className={'ring ring-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'} onChange={evt => {setVal(evt.target.value)}} />
        <button type={'button'} className={'bg-blue-200 hover:bg-blue-400 rounded p-1 font-bold'} onClick={sendClick}>send</button>

        <button type={'button'} className={'bg-red-200 hover:bg-red-400 rounded p-1'} onClick={closeClick}>close</button>
      </div>

      <div className={'bg-indigo-100 flex justify-center items-center p-2 rounded rounded-md'}>
        <div className={'bg-gray-100 h-auto flex flex-col w-96 rounded rounded-md'}>
          <div id={'receiveBox'} className={'flex m-2 justify-start items-center'}>
            <div className={'bg-white p-2 rounded rounded-md shadow-xm'}>132</div>
          </div>

          <div id={'sendBox'} className={'flex m-2 justify-end items-center'}>
            <div className={'bg-green-300 p-2 rounded rounded-md shadow-xm'}>456</div>
          </div>

          <div id={'receiveBox'} className={'flex m-2 justify-start items-center'}>
            <div className={'bg-white p-2 rounded rounded-md shadow-xm'}>132</div>
          </div>

          <div id={'receiveBox'} className={'flex m-2 justify-start items-center'}>
            <div className={'bg-white p-2 rounded rounded-md shadow-xm'}>qazwsxedc</div>
          </div>

          <div id={'sendBox'} className={'flex m-2 justify-end items-center'}>
            <div className={'bg-green-300 p-2 rounded rounded-md shadow-xm'}>456</div>
          </div>

          <div id={'sendBox'} className={'flex m-2 justify-end items-center'}>
            <div className={'bg-green-300 p-2 rounded rounded-md shadow-xm'}>456</div>
          </div>

          <div id={'sendBox'} className={'flex m-2 justify-end items-center'}>
            <div className={'bg-green-300 p-2 rounded rounded-md shadow-xm'}>456</div>
          </div>

        </div>
      </div>
    </div>
  )
}

function ReceiveBox(props) {

  const {msg, className} = props

  return (
    <div className={['border-2 border', className].join(' ')}>
      {msg}
    </div>
  )
}