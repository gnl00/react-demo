import './Chat.css'

import NotchCard from "../../components/notchCard/NotchCard";
import HeaderCard from "../../components/headerCard/HeaderCard";
import ContactCard from "../../components/contactCard/ContactCard";
import ChatCard, { FriendCard, GroupCard } from "../../components/chatCard/ChatCard";

import {buildGroup, buildMessage } from "../../util/ChatUtils";
import {createGroup, getContactList, updateGroup} from "../../network/request/user";

import {Context} from "../../layout/handler/WSHandler";

import {useContext, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {toDateTime} from "../../util/DateFormatUtils";
import {contactsSuf, groupsSuf, latestMessageSuf, messagesStoreSuf, Prefix, unReadMessageSuf} from "../../const/Const";

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

  const [curGroup, setCurGroup] = useState(null)
  const [groups, setGroups] = useState([])
  const [groupMember, setGroupMember] = useState()

  const [groupMessage, setGroupMessage] = useState(null)

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

    // get unread messages from local
    const localUnreadStr = localStorage.getItem(Prefix + uid + unReadMessageSuf)
    if (localUnreadStr) {
      const localUnread = JSON.parse(localUnreadStr)

      setUnReadMessages(localUnread)
    }

    // get groups from local
    const localGroupsStr = localStorage.getItem(Prefix + uid + groupsSuf)
    if (localGroupsStr) {
      const localGroups = JSON.parse(localGroupsStr)
      setGroups(localGroups)
    }

  }, [])

  useEffect(() => {
    // 接收到消息
    if (message) {
      const msgObj = JSON.parse(message)

      if (msgObj.group) {
        handleGroupMessage(msgObj)
      } else {
        handleSingleMessage(msgObj)
      }
    }
  }, [message])

  // save messages to local
  useEffect(() => {
    // console.log(messagesObj)
    localStorage.setItem(Prefix + uid + messagesStoreSuf, JSON.stringify(messagesObj))
  }, [messagesObj])

  /* ================================================= function callback =========================================================*/
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

  /* ========== Contacts Tab ===============*/
  const refreshClickCb = () => {
    // console.log('refresh')

    // TODO 刷新好友列表
  }

  const contactListClickCb = (toId) => {
    setTo(toId)

    setShowChatCard(true)

    setUnReadMessages(prevState => {

      let nextState = prevState

      // 存在未读消息
      if (prevState && Object.keys(prevState).indexOf(toId) != -1) {
        // 打开聊天框的时候清空
        nextState = Object.assign({}, prevState)
        nextState[toId] = null
      }

      // update unread message to local
      localStorage.setItem(Prefix + uid + unReadMessageSuf, JSON.stringify(nextState))

      return nextState
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

  /* ============ Chat Card ==================*/
  const sendClickCb = (value) => {
    // console.log('send click callback')

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

    const jsonMsg = JSON.stringify(objMsg)
    webSocket.send(jsonMsg)

    // 更新最近内容
    updateLatestMessage({key: to, body: value, date: msgDate})

    // update local while send message
    updateMessageRecord({key: to, msgObj: objMsg})
  }

  const chatCloseClickCb = () => {
    setShowChatCard(false)
  }

  /* ========== Friend Card ===============*/
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

  /* ========== Group Card ===============*/
  const createGroupCb = () => {
    setShowFriendCard(false)
    setShowChatCard(false)

    setShowGroupCard(true)

    // 1、create group and add to contact list

    const gid = Math.round(Math.random() * 1000000) + ''

    // check gid

    createGroup({groupId: gid, uid}).then(res => {

      // create group success
      const group = buildGroup({gid, members: [uid]})

      setGroups(prevState => {

        let nextState = [
          ...prevState,
          group
        ]

        // save groups to local
        localStorage.setItem(Prefix + uid + groupsSuf, JSON.stringify(nextState))

        return nextState
      })

      setCurGroup(gid)

      setGroupMember({
        [gid]: [uid]
      })

    }).catch(err => {
      console.log(err)
    })

  }

  const groupCardOpenCb = (gid) => {
    setCurGroup(gid)

    setShowFriendCard(false)
    setShowChatCard(false)

    setShowGroupCard(true)

    setGroupMember(prevState => {

      let nextState = {
        [gid]: [
          ...groups.find(item => item.gid === gid).members
        ]
      }

      return nextState
    })
  }

  const groupCardCloseCb = () => {
    setShowGroupCard(false)
    setCurGroup(null)
  }

  const addGroupMemberCb = (memberId) => {
    let group = groups.find(item => item.gid === curGroup)

    // 检查是否存在该群组
    if (group) {
      updateGroup({groupId: curGroup, uid: memberId}).then(res => {
        // 更新群组信息
        setGroups(prevState => {

          let nextState = prevState

          let group = nextState.find(item => item.gid === curGroup)

          if (group && group.members && group.members.indexOf(memberId) === -1) {
            group.members.push(memberId)
          }

          // save groups to local
          localStorage.setItem(Prefix + uid + groupsSuf, JSON.stringify(nextState))

          return nextState
        })


        // 更新群员信息
        setGroupMember(prevState => {
          // console.log(prevState)

          let nextState = prevState

          let members = nextState[curGroup]
          if (members && members.indexOf(memberId) === -1) {
            members.push(memberId)
          }

          return nextState
        })
      }).catch(err => {
        console.log(err)
      })


    }
  }

  const groupSendClickCb = (val) => {

    if (val) {

      // build and send message to group
      const date = new Date().getTime()
      const messageObj = buildMessage({from: uid, to: curGroup, body: val, type: 'text', date, group: true})
      const msgJson = JSON.stringify(messageObj)
      webSocket.send(msgJson)

      // update group message
      setGroupMessage(prevState => {

        let nextState = prevState

        // 记录是否已存在
        if (nextState && nextState[curGroup]) {
          let messages = nextState[curGroup]
          messages.push(messageObj)
        } else {
          let msgObj = {
            [curGroup]: [messageObj]
          }

          nextState = {
            ...prevState,
            ...msgObj
          }
        }

        return nextState
      })

      // update recent message

      // update local message store

    }
  }

  /* ================================================= function =========================================================*/
  const handleSingleMessage = (msgObj) => {
    // 设置未读消息
    // 当前聊天窗口对象和消息发送对象不一致才存入未读消息
    if (to != msgObj.from) {

      // 将 msgObj.from 加入 contacts
      setContacts(prevState => {
        let nextState = prevState

        // 如果 contacts 中无当前联系人，添加
        if (!prevState || !prevState.find(item => item.uid === msgObj.from)) {
          nextState = [
            ...prevState,
            {
              uid: msgObj.from
            }
          ]
          // save contacts to local
          localStorage.setItem(Prefix + uid + contactsSuf, JSON.stringify(nextState))
        }
        return nextState
      })

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

        // save unread to local
        localStorage.setItem(Prefix + uid + unReadMessageSuf, JSON.stringify(nextState))

        return nextState
      })
    }

    // 设置最近内容
    updateLatestMessage({key: msgObj.from, body: msgObj.body, date: msgObj.date})

    // update local while receive message
    updateMessageRecord({key: msgObj.from, msgObj})
  }

  const handleGroupMessage = (msgObj) => {
    console.log(msgObj)
  }

  // Deprecated
  // fetch and set contacts
  // const fetchContacts = async (uid) => {
  //
  //   const list = await getContactList(uid).then(res => {
  //     return res.filter((item) => item.uid != uid)
  //   }).catch(err => {
  //     console.log(err)
  //   })
  //
  //   setContacts([
  //     ...list
  //   ])
  //
  // }

  /* ================================================= render =========================================================*/
  return (
    <div className={'w-full min-h-screen bg-gray-100'}>

      <NotchCard />

      <div className={'p-8 rounded'}>
        <div className={'bg-white w-full h-full shadow rounded'}>

          <div className={'grid grid-cols-12 w-full h-full p-1'}>

            <div className={'col-span-3 w-full h-full p-1 space-y-4'}>
              <HeaderCard uid={uid} />
              <ContactCard contacts={contacts} groups={groups} unreadMessages={unreadMessages}
                           latestMessage={latestMessage} refreshClickCb={refreshClickCb} addFriendShowCb={addFriendShowCb}
                           createGroupCb={createGroupCb} contactListClickCb={contactListClickCb} groupCardOpenCb={groupCardOpenCb} />
            </div>

            <div className={'col-span-9 p-2 w-full h-auto'}>
              {
                showChatCard ? <ChatCard uid={uid} title={to} setTo={setTo} sendClickCb={sendClickCb} messagesObj={messagesObj} closeClickCb={chatCloseClickCb}  /> :
                  showFriendCard ? <FriendCard closeClickCb={friendCloseCb} addFriendCb={addFriendCb} userList={userList} /> :
                    showGroupCard ? <GroupCard uid={uid} curGroup={curGroup} groupMember={groupMember} groupCardCloseCb={groupCardCloseCb} addGroupMemberCb={addGroupMemberCb}
                                               contacts={contacts} sendClickCb={groupSendClickCb} groupMessages={groupMessage} /> :
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