import './ChatCard.css'
import {useState} from "react";
export default function ChatCard(props) {
  const { uid, title, sendClickCb, messages } = props

  return (
    <div className={'shadow-lg w-full h-full rounded text-gray-800 flex flex-col justify-between'}>

      <ChatTitle title={title} />

      <div className={'h-full overflow-auto h-96 max-h-96 p-2'}>

        {
          messages.map((message, index) => {
            return message.from == uid ? <SentMsgBox message={message} key={index} /> : <ReceivedMsgBox message={message} key={index} />
          })
        }

      </div>

      <EditArea sendClickCb={sendClickCb} />

    </div>
  )
}

function ChatTitle(props) {

  const { title } = props

  return (
    <div className={'bg-gray-200 flex justify-between items-center p-2 pl-4 pr-4'}>
      <div className={'text-xl'}>{title}</div>
      <div className={'p-1 rounded-lg bg-white text-red-400 ring ring-red-400 transition ease-in-out duration-500 transform hover:scale-110 cursor-default'}>
        <p>Close</p>
      </div>
    </div>
  )
}

function SentMsgBox(props) {

  const { message } = props

  return (
    <div className={'flex justify-end space-x-4 mb-4'}>
      <div className={'bg-blue-200 shadow p-2 flex rounded max-w-5xl text-justify'}>
        {message.body}
      </div>
      <div className={'bg-gray-100 w-12 h-12 flex justify-center items-center rounded cursor-default'}>{message.from}</div>
    </div>
  )
}

function ReceivedMsgBox(props) {

  const { message } = props

  return (
    <div className={'flex justify-start space-x-4 mb-4'}>
      <div className={'bg-gray-100 w-12 h-12 flex justify-center items-center rounded cursor-default'}>{message.from}</div>
      <div className={'shadow p-2 flex max-w-5xl rounded text-justify'}>
        {message.body}
      </div>
    </div>
  )
}

function EditArea(props) {

  const { sendClickCb } = props

  const [inputVal, setInputVal] = useState(null)

  const onTextChange = evt => {
    setInputVal(evt.target.value)
  }

  const sendClick = () => {
    sendClickCb(inputVal)

    setInputVal(null)
  }

  return (
    <div className={'w-full h-auto'}>
      <div className={'flex flex-col justify-between w-full'}>
        <div className={'bg-gray-200 shadow h-10 flex justify-start items-center pl-2 space-x-4 cursor-default'}>
          <div className={'bg-gray-400 text-gray-200 p-1 shadow rounded'}>AA</div>
          <div className={'bg-gray-400 text-gray-200 p-1 shadow rounded'}>BB</div>
          <div className={'bg-gray-400 text-gray-200 p-1 shadow rounded'}>CC</div>
        </div>
        <div className={'h-32 pt-1'}>
          <textarea className={'w-full h-full outline-none pl-1'} placeholder={'Input here'} onChange={onTextChange} value={inputVal || ''} />
        </div>
        <div className={'flex justify-end items-center pr-2 pb-2 pt-2 cursor-default'}>
          <p className={'shadow ring ring-4 text-blue-500 rounded-lg p-2 pl-4 pr-4'} onClick={sendClick}>Send</p>
        </div>
      </div>
    </div>
  )
}