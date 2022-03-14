import './home.css'
import {useEffect, useState} from "react";

export default function Home() {
  const [name, setName] = useState('DefaultUser');
  const [email, setEmail] = useState('email@email.com');
  const [showAccount, setShowAccount] = useState(false);

  const [weatherInfo, setWeatherInfo] = useState(false)

  const [airCondition, setAirCondition] = useState(25)

  const [songTime, setSongTime] = useState({
    start: '0:00',
    end: '0:00'
  })

  const [devices, setDevices] = useState([
    {name: 'Wifi', status: 'Connected'},
    {name: 'Lamp', status: 'Opening'},
    {name: 'Lamp2', status: 'Closed'},
    {name: 'Lamp3', status: 'Closed'},
    {name: 'Lamp4', status: 'Closed'},
    {name: 'Lamp5', status: 'Closed'},
    {name: 'Lamp6', status: 'Closed'},
    {name: 'Fan', status: 'Closed'},
  ])

  const onAccountClick =  () => {
    setShowAccount(!showAccount)
  }

  const computeHelloMsg = () => {
    let suffix = (new Date().getHours()) < 12 ? 'Morning' : 'Afternoon'
    return 'Good ' + suffix
  }

  const weatherClick = () => {
    setWeatherInfo(!weatherInfo)
  }
  
  const sceneMenu = () => {
    console.log('click menu')
  }
  
  const editClick = () => {
    console.log('click edit')
  }

  const expandWifi = () => {
    console.log('expand wifi info')
  }

  const airCondIn = () => {
    setAirCondition(airCondition < 30 ? airCondition + 1 : airCondition)
  }

  const airCondDe = () => {
    setAirCondition(airCondition > 15 ? airCondition - 1 : airCondition)
  }

  return (
    <div className="Home grid grid-cols-5 min-h-screen w-full bg-gray-100">
      <div className={'home-left col-span-2 h-full flex flex-col ml-4 relative'}>

        {/* Account */}
        <div>
          <div className={'bg-white h-auto ml-4 mt-4 p-1 flex justify-start items-center space-x-2 w-64 rounded rounded-3xl shadow-sm transition ease-in-out hover:-translate-1 hover:scale-105'}>
            <div className={'bg-blue-900 w-12 h-12 rounded rounded-full p-4 ml-2 text-white text-lg flex justify-center items-center'}>{name.charAt(0).toLocaleUpperCase()}</div>
            <div>
              <p className={'text-xl'}>{name}</p>
              <p className={'text-gray-600'}>{email}</p>
            </div>
            <div className={'ml-4 ring-2 ring-gray-200 rounded rounded-full p-3 text-gray-500'} onClick={onAccountClick}>></div>
          </div>

          {
            showAccount ? <div className={'bg-yellow-100 ml-4 p-1 w-60 h-40 absolute z-10 rounded rounded-lg'}>more accounts</div> : ''
          }
        </div>

        {/* Weather and Msg */}
        <div className={'flex mt-4 ml-4 '}>
          <div className={'flex-1 space-y-1'}>
            <div className={'text-2xl'}>{computeHelloMsg()}.</div>
            <div className={'text-lg'}>{name + '!'}</div>
            <div className={'text-gray-400'}>some not so importance informations here and split into 2 lines</div>
            <div className={'text-gray-500 hover:text-gray-800'}>and {2} more ></div>
          </div>

          <div className={'flex-1 shadow bg-white rounded rounded-2xl p-2 flex flex-col transition ease-in-out hover:-translate-1 hover:scale-105'}>

            <div className={'flex-1 rounded rounded-2xl shadow-md flex justify-start items-center p-1 space-x-4'} onClick={weatherClick}>
              <div className={'flex-1 flex space-x-4'}>
                <div>weatherIcon</div>
                <div>Sunny</div>
                <div>{new Date().getDate()+'/' + (new Date().getMonth() + 1)}</div>
              </div>

              <div className={'flex-1 flex justify-end items-center'}>
                <span className={'text-2xl'}>0</span><span className={'text-gray-400'}>/0 °C</span>
              </div>

            </div>

            {
              weatherInfo ? <div className={'z-50 bg-red-100 h-40 shadow w-auto flex justify-center items-center rounded rounded-lg mt-1'}>more about weathers and somethings</div> : ''
            }

            <div className={'flex-1 flex mt-2 flex space-around justify-around items-center space-x-8'}>
              <div className={'space-y-1'}>
                <p className={'text-lg text-gray-500'}>5km/h</p>
                <p className={'text-gray-400 text-sm'}>风速</p>
              </div>

              <div className={'space-y-1'}>
                <p className={'text-lg text-gray-500'}>30°C</p>
                <p className={'text-gray-400 text-sm'}>体感温度</p>
              </div>

              <div className={'space-y-1'}>
                <p className={'text-lg text-gray-500'}>56%</p>
                <p className={'text-gray-400 text-sm'}>湿度</p>
              </div>

              <div className={'space-y-1'}>
                <p className={'text-lg text-gray-500'}>25°C</p>
                <p className={'text-gray-400 text-sm'}>其他</p>
              </div>
            </div>

          </div>
        </div>

        {/* Scenes */}
        <div className={'w-full mt-4 bg-white shadow rounded rounded-lg flex flex-col p-1'}>
          <div className={'flex-1 m-2 flex justify-between'}>
            <p className={'text-lg'}>Scenes</p>
            <p className={'text-gray-400 hover:text-black'} onClick={sceneMenu}>...</p>
          </div>

          <div className={'p-1 mt-1 flex justify-center items-center w-full space-x-4 mb-1'}>

            <div className={'w-full flex-1 flex flex-col justify-center items-center space-y-2 shadow rounded rounded-full p-2 transition ease-in-out hover:-translate-1 hover:scale-105'}>
              <div className={'bg-red-100 p-3 rounded rounded-full text-red-500'}>Icon</div>
              <div className={'text-gray-600'}>Music</div>
            </div>

            <div className={'w-full flex-1 flex flex-col justify-center items-center space-y-2 shadow rounded rounded-full p-2 ring-4 transition ease-in-out hover:-translate-1 hover:scale-105'}>
              <div className={'bg-blue-100 p-3 rounded rounded-full text-blue-500'}>Icon</div>
              <div className={'text-gray-800'}>Go Out</div>
            </div>

            <div className={'w-full flex-1 flex flex-col justify-center items-center space-y-2 shadow rounded rounded-full p-2 transition ease-in-out hover:-translate-1 hover:scale-105'}>
              <div className={'bg-indigo-100 p-3 rounded rounded-full text-indigo-500'}>Icon</div>
              <div className={'text-gray-600'}>Night</div>
            </div>

            <div className={'w-full flex-1 flex flex-col justify-center items-center space-y-2 shadow rounded rounded-full p-2 transition ease-in-out hover:-translate-1 hover:scale-105'}>
              <div className={'bg-green-100 p-3 rounded rounded-full text-green-500'}>Icon</div>
              <div className={'text-gray-600'}>Movie</div>
            </div>

            <div className={'w-full flex-1 flex flex-col justify-center items-center space-y-2 shadow rounded rounded-full p-2 transition ease-in-out hover:-translate-1 hover:scale-105'}>
              <div className={'bg-yellow-100 p-3 rounded rounded-full text-yellow-500'}>Icon</div>
              <div className={'text-gray-600'}>Sleep</div>
            </div>

            <div className={'w-full flex-1 flex flex-col justify-center items-center space-y-2 shadow rounded rounded-full p-2 transition ease-in-out hover:-translate-1 hover:scale-105'}>
              <div className={'bg-purple-100 p-3 rounded rounded-full text-purple-500'}>Icon</div>
              <div className={'text-gray-600'}>Home</div>
            </div>

            <div className={'w-full flex-1 flex flex-col justify-center items-center space-y-2 shadow rounded rounded-full p-2 transition ease-in-out hover:-translate-1 hover:scale-105'}>
              <div className={'bg-pink-100 p-3 rounded rounded-full text-pink-500'}>Icon</div>
              <div className={'text-gray-600'}>Meeting</div>
            </div>
          </div>

        </div>

        {/* Place */}
        <div className={'ml-4 mt-4 flex justify-around items-center'}>
          <div className={'flex-1'}>
            <p className={'text-xl'}>Living Room</p>
            <p className={'text-gray-400'}>11 Devices</p>
          </div>

          <div className={'flex-1 flex justify-end items-center p-2'} onClick={editClick}>
            <p className={'shadow-md p-2 rounded rounded-full ring-2 ring-gray-200 transition ease-in-out hover:-translate-1 hover:scale-105'}>Edit</p>
          </div>
        </div>

        {/* Control Center */}
        <div className={'ml-4 mt-4'}>
          <div className={'grid grid-cols-3 gap-4'}>

            {/* Wifi */}
            <div className={'row-span-2 bg-white shadow rounded rounded-xl h-26 flex flex-col p-2 transition ease-in-out hover:-translate-1 hover:scale-105'}>
              <div className={'flex-1 flex flex-row space-x-4 justify-start items-center'}>
                <div className={'bg-blue-100 p-2 rounded rounded-full text-blue-500'}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                  </svg>
                </div>
                <div>
                  <p className={'text-md'}>Wifi Name</p>
                  <p className={'text-gray-400'}>Connected</p>
                </div>
              </div>

              <div className={'flex-1 mt-1 flex justify-around items-center'}>
                <div className={'bg-gray-100 text-gray-500 p-2 rounded rounded-lg flex flex-col justify-center items-center'}>
                  <p>5.62Mb</p>
                  <p>download speed</p>
                </div>
                <div className={'bg-gray-100 text-gray-500 p-2 rounded rounded-lg transition ease-in-out hover:-translate-y-1 hover:scale-110'} onClick={expandWifi}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Light */}
            <div className={'row-span-2 bg-indigo-500 shadow rounded rounded-xl h-26 flex flex-col p-2 transition ease-in-out hover:-translate-1 hover:scale-105'}>
              <div className={'flex-1 flex flex-row space-x-4 justify-start items-center'}>
                <div className={'bg-blue-100 p-2 rounded rounded-full text-blue-500'}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <p className={'text-white'}>Lamp</p>
                  <p className={'text-gray-300'}>Opening</p>
                </div>
              </div>

              <div className={'flex-1 mt-1 flex justify-around items-center '}>
                <div className={'bg-indigo-200 w-full h-full rounded rounded-2xl flex flex-row transition ease-in-out hover:translate-1 hover:scale-105'}>
                  <div className={'bg-white flex-1 rounded rounded-l-2xl'}></div>
                  <div className={'flex-1'}></div>
                  <div className={'flex-1'}></div>
                </div>
              </div>
            </div>

            {/* Air Condition */}
            <div className={'row-span-2 bg-indigo-500 shadow rounded rounded-xl h-26 flex flex-col p-2 transition ease-in-out hover:-translate-1 hover:scale-105'}>
              <div className={'flex-1 flex flex-row space-x-4 justify-start items-center'}>
                <div className={'bg-blue-100 p-2 rounded rounded-full text-blue-500'}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                  </svg>
                </div>
                <div className={'w-full truncate'}>
                  <p className={'text-white truncate'}>Air Condition 123456789</p>
                  <p className={'text-gray-300'}>Opening</p>
                </div>
              </div>

              <div className={'flex-1 mt-1 flex justify-around items-center'}>
                <div className={'bg-white text-2xl text-indigo-600 w-10 p-2 rounded rounded-full flex justify-center items-center hover:bg-indigo-100'} onClick={airCondDe}>-</div>
                <div>
                  <p className={'text-white text-xl'}>{airCondition}</p>
                  <p className={'text-indigo-200'}>°C</p>
                </div>
                <div className={'bg-white text-2xl text-indigo-600 w-10 p-2 rounded rounded-full flex justify-center items-center hover:bg-indigo-100'} onClick={airCondIn}>+</div>
              </div>
            </div>

            {/* Music Control */}
            <div className={'row-span-3 h-48 bg-purple-200 rounded rounded-xl shadow flex flex-col justify-around p-2 transition ease-in-out hover:-translate-1 hover:scale-105'}>
              <div className={'flex-1 flex flex-row justify-around items-center'}>
                <div className={'text-gray-600 bg-white p-2 w-24 rounded rounded-lg flex justify-center items-center'}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className={'text-gray-700'}>Song Name</p>
                  <p className={'text-gray-500'}>Singer</p>
                </div>
              </div>

              <div className={'flex-1 flex flex-col justify-center items-center'}>
                <div className={'bg-gray-200 w-full h-1'}>
                  <div className={'bg-white w-8 h-1'}></div>
                </div>
              </div>

              <div className={'flex-1 flex flex-row w-full text-gray-600'}>
                <div className={'flex-1 flex justify-start'}>{songTime.start}</div>
                <div className={'flex-1 flex justify-end'}>{songTime.end}</div>
              </div>

              <div className={'flex-1 flex flex-row justify-start items-center space-x-4'}>
                <div className={'text-gray-700 bg-white p-2 rounded rounded-lg'}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                </div>
                <div className={''}>
                  <p className={'text-md'}>Speaker</p>
                  <p className={'text-gray-500'}>Opening</p>
                </div>
              </div>
            </div>

            <div className={'bg-white shadow rounded rounded-xl p-2 flex flex-row space-x-4 justify-start items-center transition ease-in-out hover:-translate-1 hover:scale-105'}>
              <div className={'bg-gray-100 rounded rounded-xl p-2'}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className={'flex flex-col'}>
                <p className={'text-lg text-gray-700'}>Lamp2</p>
                <p className={'text-gray-500'}>Closed</p>
              </div>
            </div>

            <div className={'bg-white shadow rounded rounded-xl p-2 flex flex-row space-x-4 justify-start items-center transition ease-in-out hover:-translate-1 hover:scale-105'}>
              <div className={'bg-gray-100 rounded rounded-xl p-2'}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className={'flex flex-col'}>
                <p className={'text-lg text-gray-700'}>Lamp3</p>
                <p className={'text-gray-500'}>Closed</p>
              </div>
            </div>

            <div className={'bg-white shadow rounded rounded-xl p-2 flex flex-row space-x-4 justify-start items-center transition ease-in-out hover:-translate-1 hover:scale-105'}>
              <div className={'bg-gray-100 rounded rounded-xl p-2'}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className={'flex flex-col'}>
                <p className={'text-lg text-gray-700'}>Lamp4</p>
                <p className={'text-gray-500'}>Closed</p>
              </div>
            </div>

            <div className={'bg-white shadow rounded rounded-xl p-2 flex flex-row space-x-4 justify-start items-center transition ease-in-out hover:-translate-1 hover:scale-105'}>
              <div className={'bg-gray-100 rounded rounded-xl p-2'}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className={'flex flex-col'}>
                <p className={'text-lg text-gray-700'}>Lamp5</p>
                <p className={'text-gray-500'}>Closed</p>
              </div>
            </div>

            <div className={'bg-white shadow rounded rounded-xl p-2 flex flex-row space-x-4 justify-start items-center transition ease-in-out hover:-translate-1 hover:scale-105'}>
              <div className={'bg-gray-100 rounded rounded-xl p-2'}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className={'flex flex-col'}>
                <p className={'text-lg text-gray-700'}>Lamp6</p>
                <p className={'text-gray-500'}>Closed</p>
              </div>
            </div>

            <div className={'bg-white shadow rounded rounded-xl p-2 flex flex-row space-x-4 justify-start items-center transition ease-in-out hover:-translate-1 hover:scale-105'}>
              <div className={'bg-gray-100 rounded rounded-xl p-2'}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className={'flex flex-col'}>
                <p className={'text-lg text-gray-700'}>Lamp7</p>
                <p className={'text-gray-500'}>Closed</p>
              </div>
            </div>

          </div>
        </div>

        {/* Sticky Content*/}
        <div className={'absolute bottom-0 left-0 bg-white w-96 h-20 p-2 rounded rounded-tr-xl flex justify-around items-center space-x-4'}>
          <div className={'bg-black text-white p-2 rounded rounded-3xl transition ease-in-out hover:-translate-1 hover:scale-110'}>Room</div>
          <div className={'shadow bg-gray-100 p-2 rounded rounded-3xl transition ease-in-out hover:-translate-1 hover:scale-110'}>Video</div>
          <div className={'bg-black text-white p-2 rounded rounded-3xl transition ease-in-out hover:-translate-1 hover:scale-110'}>Detail</div>
          <div className={'shadow-md p-2 rounded rounded-full transition ease-in-out hover:-translate-1 hover:scale-110'}>Voice</div>

        </div>
      </div>

      <div className={'home-right col-span-3'}>
        <div className={'grid grid-cols-3'}>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
        </div>
      </div>
    </div>
  )
}