import './ContactCard.css'
import {TabPane, Tabs} from "../contactTab/ContactTab";

export default function ContactCard(props) {

  const { contacts, functionClickCb, contactListClickCb } = props

  const functionClick = (evt) => {
    // console.log('use for add friends or groups')
    functionClickCb()
  }

  return (
    <div className={'cursor-default h-full'}>
      <div className={'border border-2 shadow m-1 h-16 flex justify-center items-center rounded'}>
        <p className={'flex-1 flex justify-center items-center text-lg text-gray-700'}>ContactList</p>
        <div className={'mr-5 p-2 rounded  text-gray-400 bg-gray-100 shadow-lg shadow-inner transition duration-500 ease-in-out transform hover:scale-110'} onClick={functionClick}>Refresh</div>
      </div>
      <div className={'p-2 bg-white'}>
        {
          contacts.map((contact, index) => {
            return <ContactList contactListClickCb={contactListClickCb} key={index} contact={contact} />
          })
        }
      </div>
    </div>
  )
}

function ContactList(props) {

  const {contact, contactListClickCb} = props

  const onItemClick = () => {
    contactListClickCb(contact.uid)
  }

  return (
    <div className={'contact-list bg-gray-100 shadow p-2 rounded m-3'} onClick={onItemClick}>
      <div className={'flex h-16'}>
        <div className={'bg-white shadow mr-2 rounded p-2 w-20 max-w-20 h-16 max-h-16 flex justify-center items-center'}>{contact.uid}</div>
        <div className={'flex flex-col justify-around items-start space-y-2 w-full h-full truncate'}>
          <p className={'rounded p-1 text-black'}>{contact.uid}</p>
          <p className={'rounded max-w-sm truncate pl-1 text-gray-600'}>text text text text text text text text text text text text text text text text</p>
        </div>
        <div className={'ml-2 flex flex-col justify-around items-center space-y-2'}>
          <div className={'rounded-full p-1 text-blue-400 bg-white ring-2 text-xs'}>99+</div>
          <div className={'text-gray-500 text-sm'}>18:30</div>
        </div>
      </div>
    </div>
  )
}