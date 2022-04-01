import './ContactCard.css'
import {useState} from "react";

export default function ContactCard(props) {

  const { contacts, groups, unreadMessages, latestMessage, refreshClickCb, addFriendShowCb, createGroupCb, groupCardOpenCb, contactListClickCb } = props

  const [showFunctions, setShowFunctions] = useState(false);

  const functionClick = () => {
    // console.log('use for add friends or groups')
    // functionClickCb()
    setShowFunctions(!showFunctions)
  }

  const refreshClick = () => {
    // refresh
    refreshClickCb()
  }

  const addFriendsClick = () => {
    setShowFunctions(false)

    addFriendShowCb()
  }

  const openGroupClick = () => {
    setShowFunctions(false)

    createGroupCb()
  }

  return (
    <div className={'h-full w-full relative text-gray-700 space-y-2 cursor-default'}>

      {/* header */}
      <div className={'h-auto w-full p-1 flex justify-between items-center rounded shadow shadow-inner bg-gray-100'}>

        <div className={'flex-1 text-lg flex justify-center items-center'}>ContactsTab</div>

        <div className={'flex space-x-2 p-1'}>
          <div className={'h-auto w-auto p-1 rounded-lg text-gray-400 bg-white shadow transition duration-500 ease-in-out transform hover:scale-110'} onClick={refreshClick}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>

          <div className={'h-auto w-auto p-1 rounded-lg text-gray-400 bg-white shadow transition duration-500 ease-in-out transform hover:scale-110'} onClick={functionClick}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

      </div>

      {/* pop over */}
      <div className={['absolute z-10 right-0 mr-2 bg-gray-100 rounded shadow p-2 flex flex-col text-gray-700', showFunctions ? 'visible' : 'invisible'].join(' ')}>
        <div className={'bg-gray-100 p-2 rounded mb-1 hover:bg-gray-200 flex space-x-2'} onClick={addFriendsClick}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          <span>Add Friends</span>
        </div>
        <div className={'bg-gray-100 p-2 rounded mb-1 hover:bg-gray-200 flex space-x-2'} onClick={openGroupClick}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>Create Group</span>
        </div>
      </div>

      {/* contacts list */}
      <div className={'space-y-2'}>
        {
          contacts.map((contact, index) => {
            return <ContactList key={index} contactListClickCb={contactListClickCb} contact={contact} unreadMessages={unreadMessages} latestMessage={latestMessage} />
          })
        }

        {
          groups.map((group, index) => {
            return (
              <GroupList key={index} group={group} groupCardOpenCb={groupCardOpenCb} unreadMessages={unreadMessages}  latestMessage={latestMessage} />
            )
          })
        }
      </div>

    </div>
  )
}

function ContactList(props) {

  const { contact, contactListClickCb, unreadMessages ,latestMessage } = props

  const clickHandle = () => {
    contactListClickCb(contact.uid)
  }

  return (
    <div className={'contact-list bg-white shadow-lg p-2 rounded m-1'} onClick={clickHandle}>
      <div className={'flex h-16'}>
        <div className={'bg-gray-100 shadow mr-2 rounded p-2 w-20 max-w-20 h-16 max-h-16 flex justify-center items-center'}>{contact.uid}</div>
        <div className={'flex flex-col justify-around items-start space-y-2 w-full h-full truncate'}>
          <p className={'rounded p-1 text-black'}>{contact.uid}</p>

          <p className={'rounded max-w-sm truncate pl-1 text-gray-600'}>{ latestMessage && latestMessage[contact.uid] ? latestMessage[contact.uid].text : ''}</p>

        </div>
        <div className={'ml-2 h-full flex flex-col justify-around items-center space-y-2'}>
          {
            unreadMessages && unreadMessages[contact.uid] ? <div className={'rounded-full p-1 text-blue-400 bg-white ring-2 text-xs'}>{unreadMessages[contact.uid].count}</div>  : <></>
          }
          <div className={'text-gray-500 text-sm'}>{ latestMessage && latestMessage[contact.uid] ? latestMessage[contact.uid].time : ''}</div>
        </div>
      </div>
    </div>
  )
}

function GroupList(props) {

  const { group, groupCardOpenCb, latestMessage, unreadMessages } = props

  const clickHandle = () => {
    groupCardOpenCb(group.gid)
  }

  return (
    <div className={'contact-list bg-white shadow-lg p-2 rounded m-1'} onClick={clickHandle}>
      <div className={'flex h-16'}>
        <div className={'bg-gray-100 shadow mr-2 rounded p-2 w-20 max-w-20 h-16 max-h-16 flex justify-center items-center'}>{group.gid}</div>
        <div className={'flex flex-col justify-around items-start space-y-2 w-full h-full truncate'}>
          <p className={'rounded p-1 text-black'}>{group.gid}</p>

          <p className={'rounded max-w-sm truncate pl-1 text-gray-600'}>{ latestMessage && latestMessage[group.gid] ? latestMessage[group.gid].text : ''}</p>

        </div>
        <div className={'ml-2 h-full flex flex-col justify-around items-center space-y-2'}>
          {
            unreadMessages && unreadMessages[group.gid] ? <div className={'rounded-full p-1 text-blue-400 bg-white ring-2 text-xs'}>{unreadMessages[group.gid].count}</div>  : <></>
          }
          <div className={'text-gray-500 text-sm'}>{ latestMessage && latestMessage[group.gid] ? latestMessage[group.gid].time : ''}</div>
        </div>
      </div>
    </div>
  )
}