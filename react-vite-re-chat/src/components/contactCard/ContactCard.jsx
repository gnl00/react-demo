import './ContactCard.css'

export default function ContactCard(props) {

  const titleBtnClick = (evt) => {
    console.log('use for add friends or groups')
  }

  return (
    <div className={'text-gray-800'}>
      <div className={'bg-gray-200 rounded h-14 flex justify-center items-center'}>
        <p className={'flex-1 flex justify-center items-center'}>contact title</p>
        <div className={'mr-5 p-2 rounded-lg bg-white shadow transition duration-500 ease-in-out transform hover:scale-110'} onClick={titleBtnClick}>btn</div>
      </div>
      <div className={'p-2 bg-white'}>

        <ContactList />
        <ContactList />
        <ContactList />
        <ContactList />
        <ContactList />

      </div>
    </div>
  )
}

function ContactList(props) {
  return (
    <div className={'contact-list bg-gray-100 shadow p-2 rounded m-3'}>
      <div className={'flex'}>
        <div className={'bg-white mr-2 rounded p-2'}>avatar</div>
        <div className={'flex flex-col justify-around items-start space-y-2 w-full h-full'}>
          <p className={'bg-white rounded p-1'}>nickname</p>
          <p className={'bg-white rounded max-w-sm max-h-6 overflow-hidden pl-1'}>text text text text text text text text text text text text text text text text</p>
        </div>
        <div className={'ml-2 flex flex-col justify-around items-center space-y-2'}>
          <div className={'bg-blue-500 rounded-full p-1 text-gray-100 font-bold'}>99+</div>
          <div className={'text-gray-600'}>18:30</div>
        </div>
      </div>
    </div>
  )
}