import './ShowArea.css'

function ShowArea() {
  return (
    <div className='ShowArea h-full flex flex-col p-2'>

      <div className={'flex-none border-gray-100 border-b-4'}>
        <div className={'flex justify-center items-center m-2'}>
          XX TV
        </div>
      </div>

      <div className={'flex-grow p-2'}>
        <div className={'flex flex-col h-full w-full'}>
          <div className={'flex-1 bg-gray-100 m-1 rounded rounded-lg hover:bg-gray-200'}>1</div>
          <div className={'flex-1 bg-gray-100 m-1 rounded rounded-lg hover:bg-gray-200'}>2</div>
          <div className={'flex-1 bg-gray-100 m-1 rounded rounded-lg hover:bg-gray-200'}>3</div>
          <div className={'flex-1 bg-gray-100 m-1 rounded rounded-lg hover:bg-gray-200'}>4</div>
          <div className={'flex-1 bg-gray-100 m-1 rounded rounded-lg hover:bg-gray-200'}>5</div>
          <div className={'flex justify-center items-center'}>
            <div className={'bg-gray-100 p-1 rounded rounded-lg hover:bg-gray-200'}>
              Pagination
            </div>
          </div>
        </div>
      </div>

      <div className={'flex-none'}>
        <div className={'flex justify-center items-center m-2 '}>
          <div className={'flex space-x-2 bg-red-400 p-2 rounded rounded-lg hover:bg-red-500 text-white'}>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </span>
            <span className={''}>more episodes</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ShowArea;