import './HeaderCard.css'

export default function HeaderCard(props) {

  const { uid } = props

  const btnClick = () => {
    console.log('header menu btn click')
  }

  return (
    <div className={'h-auto w-auto p-2 flex justify-between items-start rounded shadow'}>
      <div className={'flex space-x-2'}>
        <div className={'h-20 w-20 bg-gray-100 flex justify-center items-center rounded-lg shadow cursor-default'}>{'Avatar'}</div>

        <div className={'rounded h-auto flex flex-col justify-around items-start'}>
          <div className={'p-1 text-gray-700 text-xl shadow shadow-inner rounded-md'}>{uid}</div>
          <div className={'p-1 text-gray-600 shadow shadow-inner rounded-md'}>motto motto motto motto</div>
        </div>
      </div>

      <div className={'w-auto h-full p-2 bg-gray-100 text-gray-400 rounded-lg shadow-lg shadow-inner transition ease-in-out duration-500 transform hover:scale-110 cursor-default'} onClick={btnClick}>Menu</div>

    </div>
  )
}