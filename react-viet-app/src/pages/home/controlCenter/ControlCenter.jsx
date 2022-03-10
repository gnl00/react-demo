import './ControlCenter.css'
import {useState} from "react";

function ControlCenter() {
  const [startBtn, setStartBtn] = useState({
    text: 'Start',
    statue: true
  })

  const startBtnClick = () => {
    if (startBtn.statue) {
      setStartBtn({
        ...startBtn,
        statue: !startBtn.statue,
        text: 'Stop'
      })
    } else {
      setStartBtn({
        ...startBtn,
        statue: !startBtn.statue,
        text: 'Start'
      })
    }
  }


  return (
    <div className='ConCenter'>
        <div className='ConCenter-item ConCenter-top'>
          <div className={'grid grid-cols-9 h-full p-2'}>
            <div className={'col-span-4'}>
              <div onClick={startBtnClick} className={['top-btn p-2 w-20 h-full flex justify-center items-center text-white rounded rounded-full', startBtn.statue ? 'bg-blue-400': 'bg-red-400'].join(' ')}>{startBtn.text}</div>
            </div>

            <div className={'col-span-2 h-full flex justify-center items-center'}>
              <div className="">
                <select className="border-black border-none rounded w-24 h-10 bg-gray-100">
                  <option className={'border-none'}>HDMI</option>
                  <option className={'border-none'}>TypeC</option>
                  <option className={'border-none'}>USB</option>
                </select>
              </div>
            </div>

            <div className={'flex justify-center items-center'}>
              <span className={'bg-gray-100 rounded p-2'}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </span>
            </div>

            <div className={'flex justify-center items-center'}>
              <span className={'bg-gray-100 rounded p-2'}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </div>

            <div className={'flex justify-center items-center'}>
              <span className={'bg-gray-100 rounded p-2'}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </span>

            </div>
          </div>
        </div>

      <div className='ConCenter-item ConCenter-center m-8'>
        <div className={'grid grid-cols-5 justify-items-center h-full'}>

          <div className={'bg-green-100 flex flex-col justify-center items-center'}>

            <div className={'flex-1'}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            </div>

            <div className={'flex-1'}>sound bar</div>

            <div className={'flex flex-col-reverse'}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            </div>
          </div>

          <div className={'col-span-3 bg-blue-300 rounded rounded-full p-5'}>
            <div className={'grid grid-cols-3 h-full place-items-center'}>
              <div className={'invisible'}>left top</div>

              <div className={'text-white text-xl p-2 hover:bg-blue-500 hover:rounded hover:rounded-lg'}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
                </svg>
              </div>

              <div className={'invisible'}>right top</div>

              <div className={'text-white text-lg p-2 hover:bg-blue-500 hover:rounded hover:rounded-lg'}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                </svg>
              </div>

              <div className={'bg-white p-10 rounded rounded-full text-xl hover:bg-gray-200 hover:p-12'}>OK</div>

              <div className={'text-white text-lg p-2 hover:bg-blue-500 hover:rounded hover:rounded-lg'}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <div className={'invisible'}>left bottom</div>

              <div className={'text-white text-lg p-2 hover:bg-blue-500 hover:rounded hover:rounded-lg'}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
                </svg>
              </div>

              <div className={'invisible'}>right bottom</div>

            </div>
          </div>

          <div className={'bg-red-100 flex flex-col justify-center items-center'}>

            <div className={'flex-1'}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>

            <div className={'flex-1'}>light bar</div>

            <div className={'flex flex-col-reverse'}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </div>

          </div>
        </div>
      </div>

      <div className={'flex justify-space-between w-full p-4'}>
        <div className={'flex justify-center items-center p-4 bg-gray-100 rounded rounded-lg hover:bg-gray-300'}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
        <div className={'flex-1 flex justify-center items-center bg-gray-100 ml-20 mr-20 rounded rounded-lg hover:bg-gray-300'}>menu</div>
        <div className={'flex justify-center items-center p-4 bg-gray-100 rounded rounded-lg hover:bg-gray-300'}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </div>
      </div>

    </div>
  )
}

export default ControlCenter