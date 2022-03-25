import './ChatCard.css'
import {useState} from "react";
import {useParams} from "react-router-dom";
export default function ChatCard(props) {

  let params = useParams();
  console.log(params)

  const { uid, title, sendClickCb, messages = [] } = props

  return (
    <div className={'shadow-lg w-full h-full rounded text-gray-800 flex flex-col justify-between'}>

      <ChatTitle title={title} />

      <div className={'w-full h-96 max-h-96 p-2 overflow-auto'}>
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
    <div className={'border border-2 shadow flex justify-between items-center p-2 pl-4 pr-4 mb-2 bg-gray-100'}>
      <div className={'text-xl rounded pl-2 pr-2'}>{title}</div>
      <div className={'p-1 rounded text-gray-400 bg-gray-200 shadow-lg shadow-inner transition ease-in-out duration-500 transform hover:scale-110 cursor-default'}>
        <p>Close</p>
      </div>
    </div>
  )
}

function SentMsgBox(props) {

  const { message } = props

  return (
    <div className={'flex justify-end items-start space-x-4 mb-4'}>
      <div className={'bg-blue-100 shadow p-1 max-w-5xl rounded h-auto'} style={{'wordBreak': 'break-all'}}>
        {message.body}
      </div>
      <div className={'bg-gray-100 w-12 h-12 flex-shrink-0 flex justify-center items-center rounded cursor-default shadow'}>{message.from}</div>
    </div>
  )
}

function ReceivedMsgBox(props) {

  const { message } = props

  return (
    <div className={'flex justify-start items-start space-x-4 mb-4'}>
      <div className={'bg-gray-100 w-12 h-12 flex-shrink-0 flex justify-center items-center rounded cursor-default shadow'}>{message.from}</div>
      <div className={'shadow p-1 max-w-5xl rounded h-auto'}>
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
    <div className={'w-full h-auto text-gray-700'}>
      <div className={'flex flex-col justify-between w-full'}>
        <div className={'border border-2 h-12 flex justify-start items-center p-2 space-x-4 text-gray-400 cursor-default'}>
          <div className={'p-1 shadow-lg shadow-inner rounded bg-gray-100'}>AA</div>
          <div className={'p-1 shadow-lg shadow-inner rounded bg-gray-100'}>BB</div>
          <div className={'p-1 shadow-lg shadow-inner rounded bg-gray-100'}>CC</div>
        </div>
        <div className={'h-32 pt-1'}>
          <textarea className={'w-full h-full outline-none pl-1'} placeholder={'Input here'} onChange={onTextChange} value={inputVal || ''} />
        </div>
        <div className={'flex justify-end items-center pr-2 pb-2 pt-2 cursor-default'}>
          <p className={'shadow-lg shadow-inner ring ring-2 text-blue-500 rounded-lg p-2 pl-4 pr-4'} onClick={sendClick}>Send</p>
        </div>
      </div>
    </div>
  )
}