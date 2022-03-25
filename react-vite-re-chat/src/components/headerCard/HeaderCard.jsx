import './HeaderCard.css'

export default function HeaderCard(props) {

  const { uid } = props

  const btnClick = () => {
    console.log('header menu btn click')
  }

  return (
    <div className={'h-full flex justify-between rounded shadow-lg'}>
      <div className={'flex'}>
        <div className={'bg-gray-100 m-2 ml-5 p-2 h-24 w-24 rounded-lg flex justify-center items-center cursor-default shadow'}>{uid}</div>

        <div className={'rounded h-auto flex flex-col justify-around items-start'}>
          <div className={'m-1 p-2 text-gray-700 text-xl shadow shadow-inner rounded-md'}>{uid}</div>
          <div className={'m-1 p-2 text-gray-600 shadow shadow-inner rounded-md'}>motto motto motto motto</div>
        </div>
      </div>

      <div className={'w-auto h-full mt-4 mr-5'}>
        <div className={'p-2 pr-4 pl-4 rounded shadow-lg shadow-inner bg-gray-100 text-gray-400 transition ease-in-out duration-500 transform hover:scale-110 cursor-default'} onClick={btnClick}>Menu</div>
      </div>

    </div>
  )
}