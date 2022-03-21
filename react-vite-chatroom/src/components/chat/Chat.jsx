import './Chat.css'

function InputBox(props) {
  const {input, inputChange, sendClick, closeClick} = props
  const onInputChange = evt => {
    inputChange(evt.target.value)
  }

  const send = () => {
    sendClick()
  }

  const close = () => {
    closeClick()
  }

  return (
    <div className={'space-x-4 flex justify-center items-center m-4 rounded rounded-md'}>
      <input id={'sendInput'} type={'text'} className={'ring-gray-200 ring-2 rounded focus:outline-none focus:ring-3 focus:ring-blue-500 h-10'} value={input || ''} onChange={onInputChange} />
      <button type={'button'} className={'bg-blue-300 hover:bg-blue-400 rounded p-2 font-mono font-semibold'} onClick={send}>send</button>
      <button type={'button'} className={'bg-red-300 hover:bg-red-400 rounded p-2 font-mono font-semibold'} onClick={close}>close</button>
    </div>
  )
}

function ChatBox(props) {
  return (
    <div className={'bg-indigo-100 h-auto flex flex-row justify-around items-center p-2 rounded rounded-md'}>
      <div className={'bg-gray-100 h-auto flex flex-col w-96 rounded rounded-md overflow-auto'}>
        {props.children}
      </div>
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

function OnLineBox(props) {
  const {users, chatCb} = props
  return (
    <div className={'space-y-4 m-2 p-4'}>
      <div className={'h-full w-full bg-yellow-200 p-2 flex justify-center items-center rounded'}>
        <div className={'w-80 h-auto bg-gray-100'}>
          <div className={'bg-gray-200 p-2 text-lg font-semibold text-center'}>Online Users ({users ? users.length : 0})</div>
          {
            users ?
              users.map((item, index) => {
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

export {
  InputBox,
  ChatBox,
  Title,
  TimeSpan,
  SentBox,
  ReceivedBox,
  OnLineBox
}