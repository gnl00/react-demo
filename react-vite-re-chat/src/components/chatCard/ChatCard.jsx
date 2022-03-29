import './ChatCard.css'
import {forwardRef, useEffect, useRef, useState} from "react";

// 需要对输入框的 font-family 进行控制，否则可能某些设备无法显示
// {font-family: "Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "Apple Color Emoji", "Twemoji Mozilla", "Noto Color Emoji", "Android Emoji", -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif!important ;}
import 'emoji-mart/css/emoji-mart.css'
import {Picker} from "emoji-mart";

export default function ChatCard(props) {

  const { uid, title: to, setTo, sendClickCb, messagesObj, setShowChatInterface } = props

  // 记录最后一条消息
  const messageEnd = useRef(null)

  const [emojiVal, setEmojiVal] = useState(null)
  const [showEmoji, setShowEmoji] = useState(false)

  // https://blog.csdn.net/culiu9261/article/details/107543860
  useEffect(() => {
    // console.log(messageEnd.current)
    if (messagesObj) {
      scrollToBottom()
    }
  }, [messagesObj])

  const scrollToBottom = () => {
    if (messageEnd && messageEnd.current) {
      messageEnd.current.scrollIntoView()
    }
  }

  const onEmojiSelected = (emoji) => {
    // console.log(emoji.native)
    setEmojiVal(emoji)
  }

  const showEmojiCb = () => {
    setShowEmoji(!showEmoji)
  }

  return (
    <div className={'shadow-lg w-full h-full rounded text-gray-800 flex flex-col justify-between'}>

      <ChatTitle title={to} setTo={setTo} setShowChatInterface={setShowChatInterface} />

      <div className={'w-full h-96 max-h-96 p-2 overflow-auto'}>
        {
          messagesObj && messagesObj[to] ? messagesObj[to].map((message, index) => {
            return message.from === uid ?
              <SentMsgBox message={message} key={index} ref={(index + 1) === messagesObj[to].length ? messageEnd : null} /> :
              <ReceivedMsgBox message={message} key={index} ref={(index + 1) === messagesObj[to].length ? messageEnd : null} />
          }) : <></>
        }
      </div>

      {
        showEmoji ?
          <div className={'relative h-auto w-full'}>
            <div className={['z-10 absolute bottom-0'].join(' ')}>
              <Picker style={{}} title='Pick your emoji…' emoji='point_up' onSelect={(evt) => onEmojiSelected(evt)} i18n={{ search: '搜索', categories: { recent: '最近' } }} />
            </div>
          </div> :
          <></>
      }

      <EditArea sendClickCb={sendClickCb} emojiVal={emojiVal} showEmojiCb={showEmojiCb} />

    </div>
  )
}

function ChatTitle(props) {

  const { title, setTo, setShowChatInterface } = props

  const closeHandler = () => {
    setShowChatInterface(false)
    setTo(null)
  }

  return (
    <div className={'border border-2 shadow flex justify-between items-center p-2 pl-4 pr-4 mb-2 bg-gray-100'}>
      <div className={'text-xl rounded pl-2 pr-2'}>{title}</div>
      <div
        onClick={() => closeHandler()}
        className={'p-1 rounded text-gray-400 bg-gray-200 shadow-lg shadow-inner transition ease-in-out duration-500 transform hover:scale-110 cursor-default'}>
        <p>Close</p>
      </div>
    </div>
  )
}

const SentMsgBox = forwardRef(((props, ref) => {
  const { message } = props

  return (
    <div className={'flex justify-end items-start space-x-4 mb-4'} ref={ref}>
      <div className={'bg-blue-100 shadow p-1 max-w-5xl rounded h-auto'} style={{'wordBreak': 'break-all'}}>
        {message.body}
      </div>
      <div className={'bg-gray-100 w-12 h-12 flex-shrink-0 flex justify-center items-center rounded cursor-default shadow'}>{message.from}</div>
    </div>
  )
}))

const ReceivedMsgBox = forwardRef(((props, ref) => {
  const { message } = props

  return (
    <div className={'flex justify-start items-start space-x-4 mb-4'} ref={ref}>
      <div className={'bg-gray-100 w-12 h-12 flex-shrink-0 flex justify-center items-center rounded cursor-default shadow'}>{message.from}</div>
      <div className={'shadow p-1 max-w-5xl rounded h-auto'}>
        {message.body}
      </div>
    </div>
  )
}))

function EditArea(props) {

  const { sendClickCb, emojiVal, showEmojiCb } = props

  const [inputVal, setInputVal] = useState(null)

  // 记住光标位置，插入 emoji
  const [selectionIndex, setSelectionIndex] = useState()

  useEffect(() => {
    if (emojiVal) {
      // console.log(emojiVal)

      const emoji = emojiVal.native

      // 将 emoji 插入对应位置
      if (selectionIndex) {
        const start = inputVal.substr(0, selectionIndex)
        const end = inputVal.substr(selectionIndex, inputVal.length)

        const input = start + emoji + end

        setInputVal(input)
        setSelectionIndex(selectionIndex + emoji.length)
      } else {
        setInputVal(prevState => {
          let nextState = prevState + emoji
          return nextState
        })
      }}

  }, [emojiVal])

  const onTextChange = evt => {
    // console.log(evt)

    if (evt.target.value != '\n') {
      setInputVal(evt.target.value)
    }

  }

  const sendClick = () => {

    if (inputVal && inputVal.trim().length != 0) {
      sendClickCb(inputVal)

      setInputVal(null)
    }
  }

  const emojiClick = () => {
    showEmojiCb()
  }

  const onTextSelected = (evt) => {
    // console.log(evt.target.selectionStart)
    // console.log(evt.target.selectionEnd)
    setSelectionIndex(evt.target.selectionStart)
  }

  const onKeyDownHandler = (evt) => {
    if (evt.keyCode === 13) {
      sendClick()
    }
  }

  return (
    <div className={'w-full h-auto text-gray-700'}>
      <div className={'flex flex-col justify-between w-full'}>
        <div className={'border border-2 h-12 flex justify-start items-center p-2 space-x-4 text-gray-400 cursor-default'}>
          <div className={'p-1 shadow-lg shadow-inner rounded bg-gray-100'} onClick={(evt) => {emojiClick()}}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className={'p-1 shadow-lg shadow-inner rounded bg-gray-100'}>BB</div>
          <div className={'p-1 shadow-lg shadow-inner rounded bg-gray-100'}>CC</div>
        </div>
        <div className={'h-32 pt-1'}>
          <textarea className={'w-full h-full outline-none pl-1'} placeholder={'Input here'} value={inputVal || ''}
                    onChange={onTextChange}
                    onSelect={evt => {onTextSelected(evt)}} onKeyDown={evt => onKeyDownHandler(evt)} />
        </div>
        <div className={'flex justify-end items-center pr-2 pb-2 pt-2 cursor-default'}>
          <p className={'shadow-lg shadow-inner ring ring-2 text-blue-500 rounded-lg p-2 pl-4 pr-4'} onClick={sendClick}>Send</p>
        </div>
      </div>
    </div>
  )
}