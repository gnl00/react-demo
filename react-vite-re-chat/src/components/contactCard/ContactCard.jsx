import './ContactCard.css'

export default function ContactCard(props) {

  const { contacts, contactListClickCb } = props

  const titleBtnClick = (evt) => {
    console.log('use for add friends or groups')
  }

  return (
    <div className={'pt-2 cursor-default h-full'}>
      <div className={'bg-gray-700 shadow-lg h-16 flex justify-center items-center rounded'}>
        <p className={'flex-1 flex justify-center items-center text-lg text-gray-200'}>contact title</p>
        <div className={'mr-5 p-2 rounded-lg ring ring-gray-400 text-gray-500 bg-white transition duration-500 ease-in-out transform hover:scale-110'} onClick={titleBtnClick}>More</div>
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
    <div className={'contact-list bg-gray-100 shadow p-2 rounded m-3 text-gray-600'} onClick={onItemClick}>
      <div className={'flex h-16'}>
        <div className={'bg-white mr-2 rounded p-2 w-20 max-w-20 h-16 max-h-16 flex justify-center items-center'}>{contact.uid}</div>
        <div className={'flex flex-col justify-around items-start space-y-2 w-full h-full truncate'}>
          <p className={'rounded p-1'}>{contact.uid}</p>
          <p className={'rounded max-w-sm truncate pl-1 text-gray-500'}>text text text text text text text text text text text text text text text text</p>
        </div>
        <div className={'ml-2 flex flex-col justify-around items-center space-y-2'}>
          <div className={'rounded-full p-1 text-blue-400 bg-white ring-2 text-xs'}>99+</div>
          <div className={'text-gray-600 text-sm'}>18:30</div>
        </div>
      </div>
    </div>
  )
}