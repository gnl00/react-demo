import './Chat.css'

import NotchCard from "../../components/notchCard/NotchCard";
import HeaderCard from "../../components/headerCard/HeaderCard";
import ContactCard from "../../components/contactCard/ContactCard";
import ChatCard, { FriendCard, GroupCard } from "../../components/chatCard/ChatCard";

import {buildMessage} from "../../util/messageUtils";
import {getContactList} from "../../network/request/user";

import {Context} from "../../layout/handler/WSHandler";

import {useContext, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {toDateTime} from "../../util/dateFormatUtils";
import {contactsSuf, latestMessageSuf, messagesStoreSuf, Prefix} from "../../const/Const";

export default function Chat() {

  // console.log('load Chat page')

  /* ================================================= redux =========================================================*/
  const uid = useSelector(state => state.uid)

  /* ================================================= context =========================================================*/
  const { webSocket, message } = useContext(Context);

  /* ================================================= state =========================================================*/
  const [to, setTo] = useState(null)
  const [contacts, setContacts] = useState([])
  const [messagesObj, setMessagesObj] = useState(null)

  const [latestMessage, setLatestMessage] = useState()
  const [unreadMessages, setUnReadMessages] = useState()

  const [userList, setUserList] = useState([])
  const [groupContacts, setGroupContacts] = useState([])

  const [showChatCard, setShowChatCard] = useState(false)
  const [showFriendCard, setShowFriendCard] = useState(false)
  const [showGroupCard, setShowGroupCard] = useState(false)

  /* ================================================= useEffect =========================================================*/
  useEffect(() => {

    // load messages from local
    const localMessagesObj = localStorage.getItem(Prefix + uid + messagesStoreSuf)

    setMessagesObj({
      ...JSON.parse(localMessagesObj)
    })

    // load latest messages from local
    const localLatest = localStorage.getItem(Prefix + uid + latestMessageSuf)
    if (localLatest) {
      // console.log(JSON.parse(localLatest))
      setLatestMessage(prevState => {
        const nextState = JSON.parse(localLatest)
        return nextState
      })
    }

    // local friends list from local
    const localContactsStr = localStorage.getItem(Prefix + uid + contactsSuf)
    if (localContactsStr) {
      const localContacts = JSON.parse(localContactsStr)

      setContacts(localContacts)
    }


  }, [])

  useEffect(() => {

    // 接收到消息
    if (message) {
      const msgObj = JSON.parse(message)

      // 设置未读消息
      // 当前聊天窗口对象和消息发送对象不一致才存入未读消息
      if (to != msgObj.from) {
        setUnReadMessages(prevState => {

          let key = msgObj.from
          let count = 0

          // 已经存在 key
          if (prevState && Object.keys(prevState).indexOf(key) !== -1) {
            // 获取 unread count
            count = prevState[key].count
          }

          count = count + 1

          // 未存在 key，根据 key 创建对象
          let obj = {
            [key]: {
              count
            }
          }

          let nextState = null

          if (prevState) {
            nextState = {
              ...prevState,
              ...obj,
            }
          } else {
            nextState = {
              ...obj
            }
          }

          return nextState
        })
      }

      // 设置最近内容
      updateLatestMessage({key: msgObj.from, body: msgObj.body, date: msgObj.date})

      // update local while receive message
      updateMessageRecord({key: msgObj.from, msgObj})

    }

  }, [message])

  // save messages to local
  useEffect(() => {
    // console.log(messagesObj)
    localStorage.setItem(Prefix + uid + messagesStoreSuf, JSON.stringify(messagesObj))
  }, [messagesObj])

  /* ================================================= function callback =========================================================*/
  const sendClickCb = (value) => {

    // console.log('send click callback')
    // console.log(value)

    if (!value) {
      return
    }

    const msgDate = new Date().getTime()
    const objMsg = buildMessage({
      from: uid,
      to,
      body: value,
      type: 'string',
      date: msgDate
    })

    // setMessages([
    //   ...messages,
    //   objMsg
    // ])

    const jsonMsg = JSON.stringify(objMsg)
    webSocket.send(jsonMsg)

    // 更新最近内容
    updateLatestMessage({key: to, body: value, date: msgDate})

    // update local while send message
    updateMessageRecord({key: to, msgObj: objMsg})
  }

  const updateMessageRecord = ({key, msgObj}) => {

    setMessagesObj(prevState => {

      let nextState = null

      if (prevState && Object.keys(prevState).indexOf(key) != -1) {
        // 已记录过
        const messageList = Object.assign([], prevState[key])
        messageList.push(msgObj)

        nextState = {
          ...prevState,
          [key]: messageList
        }

      } else {
        // 未记录过
        const saveObj = {
          [key]: [msgObj]
        }

        nextState = {
          ...prevState,
          ...saveObj
        }
      }

      return nextState
    })

  }

  const updateLatestMessage = ({key, body, date}) => {
    setLatestMessage(prevState => {

      const time = toDateTime(date)

      let timeObj = {
        [key]: {
          time,
          text: body
        }
      }

      const nextState = {
        ...prevState,
        ...timeObj
      }

      localStorage.setItem(Prefix + uid + latestMessageSuf, JSON.stringify(nextState))

      return nextState

    })
  }

  const refreshClickCb = () => {
    // console.log('refresh')

    // TODO 刷新好友列表
  }

  const contactListClickCb = (toId) => {
    setTo(toId)

    setShowChatCard(true)

    setUnReadMessages(prevState => {

      let nextState = null

      // 存在未读消息
      if (prevState && Object.keys(prevState).indexOf(toId) != -1) {
        // 打开聊天框的时候清空
        nextState = Object.assign({}, prevState)
        nextState[toId] = null
      }
    })
  }

  const addFriendShowCb = async () => {
    setShowChatCard(false)
    setShowFriendCard(true)

    // fetch friends list
    const list = await getContactList(uid).then(res => {
      return res.filter((item) => item.uid != uid).map(item => {
        return {
          uid: item.uid
        }
      })
    }).catch(err => {
      console.log(err)
    })
    setUserList(list)
  }

  const friendCloseCb = () => {
    setShowFriendCard(false)
  }

  const addFriendCb = (friendId) => {
    // console.log('add friend ' + friendId)

    // add friends
    const friendObj = {
      uid: friendId
    }

    const friends = [
      ...contacts,
      friendObj
    ];

    // save friends list to local
    localStorage.setItem(Prefix + uid + contactsSuf, JSON.stringify(friends))

    setContacts([
      ...friends
    ])

  }

  const chatCloseClickCb = () => {
    setShowChatCard(false)
  }

  const openGroupCb = () => {
    setShowFriendCard(false)
    setShowChatCard(false)

    setShowGroupCard(true)
  }

  const groupCardCloseCb = () => {
    setShowGroupCard(false)
  }

  const addGroupMemberCb = () => {
    setGroupContacts([
      ...contacts
    ])
  }

  /* ================================================= function fetch =========================================================*/
  // Deprecated
  // fetch and set contacts
  const fetchContacts = async (uid) => {

    const list = await getContactList(uid).then(res => {
      return res.filter((item) => item.uid != uid)
    }).catch(err => {
      console.log(err)
    })

    setContacts([
      ...list
    ])

  }

  /* ================================================= render =========================================================*/
  return (
    <div className={'w-full min-h-screen bg-gray-100'}>

      <NotchCard />

      <div className={'p-8 rounded'}>
        <div className={'bg-white w-full h-full shadow rounded'}>

          <div className={'grid grid-cols-12 w-full h-full p-1'}>

            <div className={'col-span-3 w-full h-full p-1 space-y-4'}>
              <HeaderCard uid={uid} />
              <ContactCard contacts={contacts} unreadMessages={unreadMessages} latestMessage={latestMessage} refreshClickCb={refreshClickCb} addFriendShowCb={addFriendShowCb} openGroupCb={openGroupCb} contactListClickCb={contactListClickCb} />
            </div>

            <div className={'col-span-9 p-2 w-full h-auto'}>
              {
                showChatCard ? <ChatCard uid={uid} title={to} setTo={setTo} sendClickCb={sendClickCb} messagesObj={messagesObj} closeClickCb={chatCloseClickCb}  /> :
                  showFriendCard ? <FriendCard closeClickCb={friendCloseCb} addFriendCb={addFriendCb} userList={userList} /> :
                    showGroupCard ? <GroupCard groupCardCloseCb={groupCardCloseCb} addGroupMemberCb={addGroupMemberCb} groupContacts={groupContacts} /> :
                    <div className={['bg-white shadow-lg w-full h-full flex justify-center items-center text-gray-700 rounded', !showChatCard || !showFriendCard || !showGroupCard ? '' : 'hidden'].join(' ')}>
                      Pick one and chat
                    </div>
              }
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}