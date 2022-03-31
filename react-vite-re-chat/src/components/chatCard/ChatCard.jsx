import './ChatCard.css'
import {forwardRef, useEffect, useRef, useState} from "react";

// 需要对输入框的 font-family 进行控制，否则可能某些设备无法显示
// {font-family: "Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "Apple Color Emoji", "Twemoji Mozilla", "Noto Color Emoji", "Android Emoji", -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif!important ;}
import 'emoji-mart/css/emoji-mart.css'
import {Picker} from "emoji-mart";

export default function ChatCard(props) {

  const { uid, title: to, setTo, sendClickCb, messagesObj, closeClickCb } = props

  // 记录最后一条消息
  const messageEnd = useRef(null)

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

  return (
    <div className={'w-full h-full text-gray-700 flex flex-col justify-between rounded shadow'}>

      <ChatTitle title={to} setTo={setTo} closeClickCb={closeClickCb} />

      <div className={'w-full h-96 max-h-96 p-2 overflow-auto'}>
        {
          messagesObj && messagesObj[to] ? messagesObj[to].map((message, index) => {
            return message.from === uid ?
              <SentMsgBox message={message} key={index} ref={(index + 1) === messagesObj[to].length ? messageEnd : null} /> :
              <ReceivedMsgBox message={message} key={index} ref={(index + 1) === messagesObj[to].length ? messageEnd : null} />
          }) : <></>
        }
      </div>

      <EditArea sendClickCb={sendClickCb} />

    </div>
  )
}

function ChatTitle(props) {

  const { title, setTo, closeClickCb } = props

  const closeHandler = () => {
    closeClickCb()

    if (setTo) {
      setTo(null)
    }
  }

  return (
    <div className={'w-full h-auto p-2 bg-gray-100 flex justify-between items-center'}>
      <div className={'text-xl rounded pl-2 pr-2'}>{title}</div>
      <div onClick={() => closeHandler()}
        className={'p-1 rounded text-red-400 bg-white shadow-inner ring ring-red-100 transition ease-in-out duration-500 transform hover:scale-110 cursor-default'}>
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

  const { sendClickCb } = props

  const [inputVal, setInputVal] = useState(null)
  const [emojiVal, setEmojiVal] = useState(null)

  const [showEmojiBox, setShowEmojiBox] = useState(false)

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

          let nextState = null

          if (prevState) {
            nextState = prevState + emoji
          } else {
            nextState = emoji
          }

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
    setShowEmojiBox(!showEmojiBox)
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

  const onEmojiSelected = (emoji) => {
    setEmojiVal(emoji)
  }

  return (
    <div className={'w-full h-auto text-gray-700'}>
      <div className={'flex flex-col justify-between w-full'}>

        {
          showEmojiBox ?
            <div className={'relative h-auto w-full'}>
              <div className={['z-10 absolute bottom-0'].join(' ')}>
                <Picker style={{}} title='Pick your emoji…' emoji='point_up' onSelect={(evt) => onEmojiSelected(evt)} i18n={{ search: '搜索', categories: { recent: '最近' } }} />
              </div>
            </div> : <></>
        }

        <div className={'h-auto flex justify-start items-center p-2 space-x-4 text-gray-400 shadow cursor-default'}>
          <div className={'p-1 shadow-lg shadow-inner rounded bg-gray-100 transition ease-in-out duration-500 transform hover:scale-110'} onClick={(evt) => {emojiClick()}}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className={'p-1 shadow-lg shadow-inner rounded bg-gray-100 transition ease-in-out duration-500 transform hover:scale-110'}>BB</div>
          <div className={'p-1 shadow-lg shadow-inner rounded bg-gray-100 transition ease-in-out duration-500 transform hover:scale-110'}>CC</div>
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

export function FriendCard(props) {

  const cardTitle = 'Add-Friends'

  const { closeClickCb, addFriendCb, userList } = props

  const handleClose = () => {
    closeClickCb()
  }

  const handleAddClick = (friendId) => {
    // console.log('add friend')
    addFriendCb(friendId)
  }

  return (
    <div className={'w-full h-full text-gray-700 flex flex-col justify-between rounded shadow'}>

      <ChatTitle title={cardTitle} closeClickCb={handleClose} />

      <div className={['bg-white shadow-lg w-full h-full flex flex-col text-gray-600 p-2 space-y-2'].join(' ')}>
        {
          userList ? userList.map((item, index) => {
            return (
              <div className={'bg-gray-100 hover:bg-gray-200 rounded p-2 flex justify-around h-auto space-x-8'} key={index}>
                <div className={'bg-white p-1 rounded w-10 flex justify-center items-center'}>{item.uid}</div>
                <div className={'bg-white p-2 rounded cursor-default flex justify-center items-center'} onClick={() => handleAddClick(item.uid)}>Add to Contact</div>
              </div>
            )
          }) : <></>
        }
      </div>
    </div>
  )
}

export function GroupCard(props) {

  const { curGroup, groupCardCloseCb, sendClickCb, contacts = [], groupMember, addGroupMemberCb } = props

  const [members, setMembers] = useState([])
  const [showAddToGroupLayout, setShowAddToGroupLayout] = useState(false)

  useEffect(() => {
    setMembers(groupMember)
  }, [groupMember])

  const handleCloseClick = () => {
    groupCardCloseCb()
  }

  const groupMemberClick = () => {
    console.log('groupMemberClick')
    // TODO show group friends
  }

  const addMemberClick = () => {
    // console.log('addMemberClick')
    setShowAddToGroupLayout(true)

  }

  const addToGroup = (memberId) => {
    // console.log('add group member ', memberId)

    // TODO add friend to group
    addGroupMemberCb(memberId)

  }

  const addToGroupCloseClick = () => {
    setShowAddToGroupLayout(false)
  }

  return (
    <div className={['bg-white shadow-lg w-full h-full flex flex-col justify-start items-center text-gray-700 rounded'].join(' ')}>
      <div className={'flex-1 bg-gray-100 w-full flex justify-between items-center p-2'}>

        <div className={'flex justify-center items-center p-1 space-x-2'}>
          <div className={'max-w-80 truncate'}>{curGroup}({ members && members[curGroup] ? members[curGroup].join('、') : ''})</div>
          <div>
            <div className={'rounded-lg shadow p-2 bg-white text-gray-400 transition ease-in-out duration-500 transform hover:scale-110'} onClick={groupMemberClick}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className={'flex justify-center items-center space-x-4 cursor-default'} >

          <div className={'rounded-lg shadow p-2 bg-white text-gray-400 transition ease-in-out duration-500 transform hover:scale-110'} onClick={addMemberClick}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>

          <div className={'rounded shadow-inner p-1 ring ring-red-100 text-red-400 transition ease-in-out duration-500 transform hover:scale-110'} onClick={handleCloseClick}>Close</div>

        </div>

      </div>

      {
        showAddToGroupLayout ?
          <div className={'z-10 w-full h-full p-2 shadow-lg flex flex-col justify-center items-center space-y-2'}>
            <div className={'w-1/3 flex justify-center items-center ring ring-red-100 text-red-400 rounded p-1 shadow-inner'}  onClick={addToGroupCloseClick}>
              Close
            </div>
            <div className={'w-full flex justify-center flex-wrap'}>
              {
                contacts.map((item, index) => {
                  return (
                    <div key={index} className={'bg-gray-100 p-2 w-1/3 rounded m-1 shadow flex justify-between items-center transition ease-in-out duration-500 transform hover:scale-105'}>
                      <div>{item.uid}</div>
                      <div className={'bg-white shadow p-1 rounded cursor-default'} onClick={() => addToGroup(item.uid)} >addToGroup</div>
                    </div>
                  )
                })
              }
            </div>
          </div> : <></>
      }

      <div className={'h-full w-full'}>

        <div className={'h-96'}></div>

        <EditArea sendClickCb={sendClickCb} />
      </div>
    </div>
  )
}