import './HeaderCard.css'

export default function HeaderCard(props) {

  const btnClick = () => {
    console.log('header menu btn click')
  }

  return (
    <div className={'bg-gray-800 h-full flex relative rounded'}>
      <div className={'m-2 ml-5 p-2 bg-white h-28 w-28 rounded-lg text-center'}>avatar place</div>

      <div className={'rounded h-auto flex flex-col justify-around items-start'}>
        <div className={'m-1 p-2 text-gray-100 text-xl'}>nickname</div>
        <div className={'m-1 p-2 text-gray-100'}>motto motto motto motto</div>
      </div>

      <div className={'absolute right-0 w-auto h-full flex justify-center items-start mt-4 mr-5'}>
        <div className={'ring-gray-400 ring-outer ring-4 p-4 rounded shadow bg-white hover:ring-white hover:bg-gray-400'} onClick={btnClick}>menu</div>
      </div>

    </div>
  )
}