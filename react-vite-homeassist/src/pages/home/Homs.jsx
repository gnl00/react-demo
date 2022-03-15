import './home.css'
import {useEffect, useState} from "react";
import {CSSTransition, SwitchTransition} from "react-transition-group";

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

  const [widgetVisible, setWidgetVisible] = useState(false)
  const [rightBarVisible, setRightBarVisible] = useState(true)

  const [mainAirCond, setMainAirCond] = useState(24.5)

  const onAccountClick = () => {
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

  const showWidget = () => {
    setWidgetVisible(!widgetVisible)
    setRightBarVisible(!rightBarVisible)
  }

  const [isShow, setIsShow] = useState(true)

  return (
    <div className="Home grid grid-cols-5 min-h-screen w-full bg-gray-100">

      {/* Home Left */}
      <div className={'home-left col-span-2 h-full flex flex-col ml-4 pt-4 shadow-md rounded rounded-lg p-2'}>

        {/* Account */}
        <div>
          <div
            className={'bg-white h-auto ml-4 p-1 flex justify-start items-center space-x-2 w-64 rounded rounded-3xl shadow-sm transition ease-in-out hover:-translate-1 hover:scale-105'}>
            <div
              className={'bg-blue-900 w-12 h-12 rounded rounded-full p-4 ml-2 text-white text-lg flex justify-center items-center'}>{name.charAt(0).toLocaleUpperCase()}</div>
            <div>
              <p className={'text-xl'}>{name}</p>
              <p className={'text-gray-600'}>{email}</p>
            </div>
            <div className={'ml-4 ring-2 ring-gray-200 rounded rounded-full p-3 text-gray-500'}
                 onClick={onAccountClick}>>
            </div>
          </div>

          {
            showAccount ? <div className={'bg-yellow-100 ml-4 p-1 w-60 h-40 absolute z-10 rounded rounded-lg'}>more
              accounts</div> : ''
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

          <div
            className={'flex-1 shadow bg-white rounded rounded-2xl p-2 flex flex-col transition ease-in-out hover:-translate-1 hover:scale-105'}>

            <div className={'flex-1 rounded rounded-2xl shadow-md flex justify-start items-center p-1 space-x-4'}
                 onClick={weatherClick}>
              <div className={'flex-1 flex space-x-4'}>
                <div>weatherIcon</div>
                <div>Sunny</div>
                <div>{new Date().getDate() + '/' + (new Date().getMonth() + 1)}</div>
              </div>

              <div className={'flex-1 flex justify-end items-center'}>
                <span className={'text-2xl'}>0</span><span className={'text-gray-400'}>/0 °C</span>
              </div>

            </div>

            {
              weatherInfo ? <div
                className={'z-50 bg-red-100 h-40 shadow w-auto flex justify-center items-center rounded rounded-lg mt-1'}>more
                about weathers and somethings</div> : ''
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

            <div
              className={'w-full flex-1 flex flex-col justify-center items-center space-y-2 shadow rounded rounded-full p-2 transition ease-in-out hover:-translate-1 hover:scale-105'}>
              <div className={'bg-red-100 p-3 rounded rounded-full text-red-500'}>Icon</div>
              <div className={'text-gray-600'}>Music</div>
            </div>

            <div
              className={'w-full flex-1 flex flex-col justify-center items-center space-y-2 shadow rounded rounded-full p-2 ring-4 transition ease-in-out hover:-translate-1 hover:scale-105'}>
              <div className={'bg-blue-100 p-3 rounded rounded-full text-blue-500'}>Icon</div>
              <div className={'text-gray-800'}>Go Out</div>
            </div>

            <div
              className={'w-full flex-1 flex flex-col justify-center items-center space-y-2 shadow rounded rounded-full p-2 transition ease-in-out hover:-translate-1 hover:scale-105'}>
              <div className={'bg-indigo-100 p-3 rounded rounded-full text-indigo-500'}>Icon</div>
              <div className={'text-gray-600'}>Night</div>
            </div>

            <div
              className={'w-full flex-1 flex flex-col justify-center items-center space-y-2 shadow rounded rounded-full p-2 transition ease-in-out hover:-translate-1 hover:scale-105'}>
              <div className={'bg-green-100 p-3 rounded rounded-full text-green-500'}>Icon</div>
              <div className={'text-gray-600'}>Movie</div>
            </div>

            <div
              className={'w-full flex-1 flex flex-col justify-center items-center space-y-2 shadow rounded rounded-full p-2 transition ease-in-out hover:-translate-1 hover:scale-105'}>
              <div className={'bg-yellow-100 p-3 rounded rounded-full text-yellow-500'}>Icon</div>
              <div className={'text-gray-600'}>Sleep</div>
            </div>

            <div
              className={'w-full flex-1 flex flex-col justify-center items-center space-y-2 shadow rounded rounded-full p-2 transition ease-in-out hover:-translate-1 hover:scale-105'}>
              <div className={'bg-purple-100 p-3 rounded rounded-full text-purple-500'}>Icon</div>
              <div className={'text-gray-600'}>Home</div>
            </div>

            <div
              className={'w-full flex-1 flex flex-col justify-center items-center space-y-2 shadow rounded rounded-full p-2 transition ease-in-out hover:-translate-1 hover:scale-105'}>
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
            <p
              className={'shadow-md p-2 rounded rounded-full ring-2 ring-gray-200 transition ease-in-out hover:-translate-1 hover:scale-105'}>Edit</p>
          </div>
        </div>

        {/* Control Center */}
        <div className={'ml-4 mt-4'}>
          <div className={'grid grid-cols-3 gap-4'}>

            {/* Wifi */}
            <div
              className={'row-span-2 bg-white shadow rounded rounded-xl h-26 flex flex-col p-2 transition ease-in-out hover:-translate-1 hover:scale-105'}>
              <div className={'flex-1 flex flex-row space-x-4 justify-start items-center'}>
                <div className={'bg-blue-100 p-2 rounded rounded-full text-blue-500'}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/>
                  </svg>
                </div>
                <div>
                  <p className={'text-md'}>Wifi Name</p>
                  <p className={'text-gray-400'}>Connected</p>
                </div>
              </div>

              <div className={'flex-1 mt-1 flex justify-around items-center'}>
                <div
                  className={'bg-gray-100 text-gray-500 p-2 rounded rounded-lg flex flex-col justify-center items-center'}>
                  <p>5.62Mb</p>
                  <p>download speed</p>
                </div>
                <div
                  className={'bg-gray-100 text-gray-500 p-2 rounded rounded-lg transition ease-in-out hover:-translate-y-1 hover:scale-110'}
                  onClick={expandWifi}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Light */}
            <div
              className={'row-span-2 bg-indigo-500 shadow rounded rounded-xl h-26 flex flex-col p-2 transition ease-in-out hover:-translate-1 hover:scale-105'}>
              <div className={'flex-1 flex flex-row space-x-4 justify-start items-center'}>
                <div className={'bg-blue-100 p-2 rounded rounded-full text-blue-500'}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <div>
                  <p className={'text-white'}>Lamp</p>
                  <p className={'text-gray-300'}>Opening</p>
                </div>
              </div>

              <div className={'flex-1 mt-1 flex justify-around items-center '}>
                <div
                  className={'bg-indigo-200 w-full h-full rounded rounded-2xl flex flex-row transition ease-in-out hover:translate-1 hover:scale-105'}>
                  <div className={'bg-white flex-1 rounded rounded-l-2xl'}></div>
                  <div className={'flex-1'}></div>
                  <div className={'flex-1'}></div>
                </div>
              </div>
            </div>

            {/* Air Condition */}
            <div
              className={'row-span-2 bg-indigo-500 shadow rounded rounded-xl h-26 flex flex-col p-2 transition ease-in-out hover:-translate-1 hover:scale-105'}>
              <div className={'flex-1 flex flex-row space-x-4 justify-start items-center'}>
                <div className={'bg-blue-100 p-2 rounded rounded-full text-blue-500'}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"/>
                  </svg>
                </div>
                <div className={'w-full truncate'}>
                  <p className={'text-white truncate'}>Air Condition 123456789</p>
                  <p className={'text-gray-300'}>Opening</p>
                </div>
              </div>

              <div className={'flex-1 mt-1 flex justify-around items-center'}>
                <div
                  className={'bg-white text-2xl text-indigo-600 w-10 p-2 rounded rounded-full flex justify-center items-center hover:bg-indigo-100'}
                  onClick={airCondDe}>-
                </div>
                <div>
                  <p className={'text-white text-xl'}>{airCondition}</p>
                  <p className={'text-indigo-200'}>°C</p>
                </div>
                <div
                  className={'bg-white text-2xl text-indigo-600 w-10 p-2 rounded rounded-full flex justify-center items-center hover:bg-indigo-100'}
                  onClick={airCondIn}>+
                </div>
              </div>
            </div>

            {/* Music Control */}
            <div
              className={'row-span-3 h-48 bg-purple-200 rounded rounded-xl shadow flex flex-col justify-around p-2 transition ease-in-out hover:-translate-1 hover:scale-105'}>
              <div className={'flex-1 flex flex-row justify-around items-center'}>
                <div className={'text-gray-600 bg-white p-2 w-24 rounded rounded-lg flex justify-center items-center'}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
                  </svg>
                </div>
                <div className={''}>
                  <p className={'text-md'}>Speaker</p>
                  <p className={'text-gray-500'}>Opening</p>
                </div>
              </div>
            </div>

            <div
              className={'bg-white shadow rounded rounded-xl p-2 flex flex-row space-x-4 justify-start items-center transition ease-in-out hover:-translate-1 hover:scale-105'}>
              <div className={'bg-gray-100 rounded rounded-xl p-2'}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <div className={'flex flex-col'}>
                <p className={'text-lg text-gray-700'}>Lamp2</p>
                <p className={'text-gray-500'}>Closed</p>
              </div>
            </div>

            <div
              className={'bg-white shadow rounded rounded-xl p-2 flex flex-row space-x-4 justify-start items-center transition ease-in-out hover:-translate-1 hover:scale-105'}>
              <div className={'bg-gray-100 rounded rounded-xl p-2'}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <div className={'flex flex-col'}>
                <p className={'text-lg text-gray-700'}>Lamp3</p>
                <p className={'text-gray-500'}>Closed</p>
              </div>
            </div>

            <div
              className={'bg-white shadow rounded rounded-xl p-2 flex flex-row space-x-4 justify-start items-center transition ease-in-out hover:-translate-1 hover:scale-105'}>
              <div className={'bg-gray-100 rounded rounded-xl p-2'}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <div className={'flex flex-col'}>
                <p className={'text-lg text-gray-700'}>Lamp4</p>
                <p className={'text-gray-500'}>Closed</p>
              </div>
            </div>

            <div
              className={'bg-white shadow rounded rounded-xl p-2 flex flex-row space-x-4 justify-start items-center transition ease-in-out hover:-translate-1 hover:scale-105'}>
              <div className={'bg-gray-100 rounded rounded-xl p-2'}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <div className={'flex flex-col'}>
                <p className={'text-lg text-gray-700'}>Lamp5</p>
                <p className={'text-gray-500'}>Closed</p>
              </div>
            </div>

            <div
              className={'bg-white shadow rounded rounded-xl p-2 flex flex-row space-x-4 justify-start items-center transition ease-in-out hover:-translate-1 hover:scale-105'}>
              <div className={'bg-gray-100 rounded rounded-xl p-2'}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <div className={'flex flex-col'}>
                <p className={'text-lg text-gray-700'}>Lamp6</p>
                <p className={'text-gray-500'}>Closed</p>
              </div>
            </div>

            <div
              className={'bg-white shadow rounded rounded-xl p-2 flex flex-row space-x-4 justify-start items-center transition ease-in-out hover:-translate-1 hover:scale-105'}>
              <div className={'bg-gray-100 rounded rounded-xl p-2'}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <div className={'flex flex-col'}>
                <p className={'text-lg text-gray-700'}>Lamp7</p>
                <p className={'text-gray-500'}>Closed</p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Sticky Content*/}
      <div
        className={'absolute bottom-0 left-0 bg-white w-96 h-20 p-2 rounded rounded-tr-xl flex justify-around items-center space-x-4'}>
        <div
          className={'bg-black text-white p-2 rounded rounded-3xl transition ease-in-out hover:-translate-1 hover:scale-110'}>Room
        </div>
        <div
          className={'shadow bg-gray-100 p-2 rounded rounded-3xl transition ease-in-out hover:-translate-1 hover:scale-110'}>Video
        </div>
        <div
          className={'bg-black text-white p-2 rounded rounded-3xl transition ease-in-out hover:-translate-1 hover:scale-110'}>Detail
        </div>
        <div
          className={'shadow-md p-2 rounded rounded-full transition ease-in-out hover:-translate-1 hover:scale-110'}>Voice
        </div>

      </div>

      {/* Home Right */}
      <div className={'home-right col-span-3 pt-4 h-full static ml-4'}>

        {/* Show Area */}
        <div className={'flex flex-col justify-space h-full'}>

          <div className={'flex flex-row justify-start space-x-4 w-76 rounded rounded-lg'}>
            <div className={'bg-white p-4 rounded rounded-full shadow text-gray-600'}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"/>
              </svg>
            </div>
            <div>
              <p className={'text-lg'}>Air Conditioner</p>
              <p className={'text-gray-500'}>BedRoom Temperature {mainAirCond}°C</p>
            </div>
          </div>

          <div className={'flex-1 flex flex-col justify-end items-center space-y-8 pb-20'}>

            <div
              className={'w-96 h-96 rounded rounded-full border-blue-500 border-t-8 border-l-8 shadow relative flex justify-center items-center'}>
              <div className={'flex flex-col justify-center items-center space-y-4'}>
                <div className={'text-gray-600 text-2xl'}>COLD</div>
                <div className={'flex justify-around items-center space-x-8'}>
                  <div className={'bg-white rounded rounded-full text-3xl p-2 hover:bg-gray-100 shadow'}
                       onClick={airCondDe}>-
                  </div>
                  <div className={'text-3xl text-gray-800'}>{airCondition}</div>
                  <div className={'bg-white rounded rounded-full text-3xl p-2 hover:bg-gray-100 shadow'}
                       onClick={airCondIn}>+
                  </div>
                </div>
                <div className={'text-gray-700 text-lg'}>°C</div>
                <div className={'bg-blue-200 text-blue-600 text-lg rounded rounded-full p-2'}>Auto Adjust</div>
              </div>
              <div className={'absolute bottom-0 left-0 w-80 h-20 bg-gray-100 flex'}>
                <div className={'flex-1 left-0 text-gray-700 text-lg flex justify-start'}>14°C</div>
                <div className={'flex-1 right-0 text-gray-700 text-lg flex justify-end'}>30°C</div>
              </div>
            </div>

            <div
              className={'bg-gray-200 rounded rounded-full shadow-inner h-auto w-64 flex justify-around items-center pl-2 pr-2'}>
              <div
                className={'rounded text-gray-700 rounded-full w-12 h-12 p-1 shadow flex justify-center items-center transition ease-in-out hover:-translate-y-2 hover:scale-105'}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
              </div>
              <div
                className={'bg-white text-gray-700 rounded rounded-full w-12 h-12 p-1 shadow flex justify-center items-center transition ease-in-out hover:-translate-y-2 hover:scale-110'}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z"/>
                </svg>
              </div>
              <div
                className={'rounded text-gray-700 rounded-full w-12 h-12 p-1 shadow flex justify-center items-center transition ease-in-out hover:-translate-y-2 hover:scale-105'}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <div
                className={'rounded text-gray-700 rounded-full w-12 h-12 p-1 shadow flex justify-center items-center transition ease-in-out hover:-translate-y-2 hover:scale-105'}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
                </svg>
              </div>
            </div>

            <div className={'flex justify-around items-center space-x-8'}>
              <div className={'space-y-2 flex flex-col justify-center items-center text-gray-700'}>
                <div
                  className={'bg-white p-4 rounded rounded-full w-12 h-12 flex justify-center items-center shadow transition ease-in-out hover:scale-110'}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"/>
                  </svg>
                </div>
                <div>Text</div>
              </div>

              <div className={'space-y-2 flex flex-col justify-center items-center text-gray-700'}>
                <div
                  className={'bg-white p-4 rounded rounded-full w-12 h-12 flex justify-center items-center shadow transition ease-in-out hover:scale-110'}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>Time</div>
              </div>

              <div className={'space-y-2 flex flex-col justify-center items-center text-gray-700'}>
                <div
                  className={'bg-yellow-200 text-yellow-600 ring-inset ring-4 ring-white p-4 rounded rounded-full w-12 h-12 flex justify-center items-center shadow transition ease-in-out hover:scale-110'}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                  </svg>
                </div>
                <div>Home</div>
              </div>
            </div>
          </div>

          <div className={'flex flex-col justify-end items-center p-4'}>
            <div className={'flex justify-center items-center space-x-4 bg-white h-16 w-auto p-2 rounded rounded-full'}>

              <div
                className={'text-gray-100 bg-gray-900 w-10 h-10 flex justify-center items-center rounded rounded-full transition ease-in-out hover:scale-110'}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
              </div>

              <div
                className={'text-gray-900 ring-gray-100 ring-2 w-10 h-10 flex justify-center items-center rounded rounded-full transition ease-in-out hover:scale-110'}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>

            </div>

          </div>
        </div>

        <div className={'absolute right-0 top-0 bg-white min-w-auto min-h-screen flex flex-row'}>
          <div className={['flex justify-center items-center text-base text-gray-500'].join(' ')} onMouseOver={() => {
            setIsShow(!isShow)
          }}>
            {
              isShow ?

                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>:
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            }
          </div>

          {
            isShow ?
              <CSSTransition in={widgetVisible}
                             classNames={'rBar'}
                             timeout={500}
              >
                <div className={'w-80 m-4 flex flex-col justify-around'}>

                  <div
                    className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto transition ease-in-out hover:scale-105">
                    <div className="animate-pulse flex space-x-4">
                      <div className="rounded-full bg-blue-400 h-12 w-12"></div>
                      <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-blue-400 rounded w-3/4"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-blue-400 rounded"></div>
                          <div className="h-4 bg-blue-400 rounded w-5/6"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="border border-red-300 shadow rounded-md p-4 max-w-sm w-full mx-auto transition ease-in-out hover:scale-105">
                    <div className="animate-pulse flex space-x-4">
                      <div className="rounded-full bg-red-400 h-12 w-12"></div>
                      <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-red-400 rounded w-3/4"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-red-400 rounded"></div>
                          <div className="h-4 bg-red-400 rounded w-5/6"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="border border-yellow-300 shadow rounded-md p-4 max-w-sm w-full mx-auto transition ease-in-out hover:scale-105">
                    <div className="animate-pulse flex space-x-4">
                      <div className="rounded-full bg-yellow-400 h-12 w-12"></div>
                      <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-yellow-400 rounded w-3/4"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-yellow-400 rounded"></div>
                          <div className="h-4 bg-yellow-400 rounded w-5/6"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="border border-green-300 shadow rounded-md p-4 max-w-sm w-full mx-auto transition ease-in-out hover:scale-105">
                    <div className="animate-pulse flex space-x-4">
                      <div className="rounded-full bg-green-400 h-12 w-12"></div>
                      <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-green-400 rounded w-3/4"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-green-400 rounded"></div>
                          <div className="h-4 bg-green-400 rounded w-5/6"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto transition ease-in-out hover:scale-105">
                    <div className="animate-pulse flex space-x-4">
                      <div className="rounded-full bg-gray-400 h-12 w-12"></div>
                      <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-gray-400 rounded w-3/4"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-400 rounded"></div>
                          <div className="h-4 bg-gray-400 rounded w-5/6"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="border border-indigo-300 shadow rounded-md p-4 max-w-sm w-full mx-auto transition ease-in-out hover:scale-105">
                    <div className="animate-pulse flex space-x-4">
                      <div className="rounded-full bg-indigo-400 h-12 w-12"></div>
                      <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-indigo-400 rounded w-3/4"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-indigo-400 rounded"></div>
                          <div className="h-4 bg-indigo-400 rounded w-5/6"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="border border-purple-300 shadow rounded-md p-4 max-w-sm w-full mx-auto transition ease-in-out hover:scale-105">
                    <div className="animate-pulse flex space-x-4">
                      <div className="rounded-full bg-purple-400 h-12 w-12"></div>
                      <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-purple-400 rounded w-3/4"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-purple-400 rounded"></div>
                          <div className="h-4 bg-purple-400 rounded w-5/6"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </CSSTransition> : ''
          }
        </div>
      </div>
    </div>
  )
}