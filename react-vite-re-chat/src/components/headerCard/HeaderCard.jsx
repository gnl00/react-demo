import './HeaderCard.css'

export default function HeaderCard(props) {

  const { uid } = props

  const btnClick = () => {
    console.log('header menu btn click')
  }

  return (
    <div className={'bg-gray-800 h-full flex justify-between rounded'}>
      <div className={'flex'}>
        <div className={'m-2 ml-5 p-2 bg-white h-24 w-24 rounded-lg flex justify-center items-center cursor-default'}>{uid}</div>

        <div className={'rounded h-auto flex flex-col justify-around items-start'}>
          <div className={'m-1 p-2 text-gray-100 text-xl'}>{uid}</div>
          <div className={'m-1 p-2 text-gray-100'}>motto motto motto motto</div>
        </div>
      </div>

      <div className={'w-auto h-full flex justify-center items-start mt-4 mr-5'}>
        <div className={'p-2 pr-4 pl-4 rounded ring ring-gray-400 text-gray-500 bg-white transition ease-in-out duration-500 transform hover:scale-110 cursor-default'} onClick={btnClick}>Menu</div>
      </div>

    </div>
  )
}