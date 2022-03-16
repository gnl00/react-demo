import './Device.css'
import {getDeviceData} from "../../../fakeRequest/home";
import {useEffect, useRef, useState} from "react";


function Device() {
  const [devices, setDevices] = useState([])
  const [brand, setBrand] = useState()
  const [defaultIndex, setDefaultIndex] = useState(0)
  const [deviceInfo, setDeviceInfo] = useState({})
  const [deviceExtra, setDeviceExtra] = useState({})

  // componentDidMount
  useEffect(() => {

    const fetchDeviceData = async () => {
      const response = await getDeviceData()
      setDevices(response)
    }
    fetchDeviceData()
    // console.log(devices)

  }, [])


  useEffect(() => {
    if (devices.length !== 0) {
      setBrand(devices[0].brandIcon)
      setDefaultIndex(devices[0].id)
      setDeviceInfo(devices[0].info)
      setDeviceExtra(devices[0].extra)
    }
  }, [devices])

  const deviceClick = (index) => {
    // console.log(index)

    // 切换 ring
    setDefaultIndex(index)

    let target = devices.find(item => item.id === index)
    // console.log(target)

    // 切换 brand
    setBrand(target.brandIcon)

    // 切换 info
    setDeviceInfo(target.info)

    // 切换 extra
    setDeviceExtra(target.extra)
  }

  return (
    <div className='Device'>
      <div className='Device-item'>
        <div className={'device-list p-2'}>
          {
            devices.map((item, index) => {
              return (
                <div className={'device-list-item p-2'} key={item.id} onClick={evt => deviceClick(item.id)}>
                  <img className={['device-list-img', defaultIndex === item.id ? 'ring-4' : ''].join(' ')} src={item.icon}/>
                </div>
              )
            })
          }
        </div>
      </div>

      <div className='Device-item'>
        <div className={'device-icon w-24'}>
          <img className={'m-2 w-20'} src={brand}/>
        </div>
      </div>

      <div className='Device-item p-2'>
        {
          <div>
            <div className={'border-gray-200 border-b-4 p-2'}>
              Info
            </div>
            <div className={'device-info'}>
              <div className={'device-info-item'}>
                {deviceInfo.brand}
              </div>
              <div className={''}>
                {deviceInfo.cpu}
              </div>
              <div className={''}>
                {deviceInfo.memory}
              </div>
              <div className={''}>
                {deviceInfo.storage}
              </div>
            </div>
          </div>
        }
      </div>

      <div className='Device-item'>
        <div className={'device-extra'}>
          {
            <div>
              <div className={'p-2 border-gray-200 border-b-4'}>Network</div>
              <div className='flex flex-col justify-center items-start m-2 p-2 space-y-4'>
                <div className={'flex-1'}>
                  <div className={''}>
                    upload
                  </div>
                  <p className={'space-x-4 pt-2 text-lg text-gray-600'}>{deviceExtra.upload}</p>
                </div>
                <div className={'flex-1'}>
                  <div>
                    download
                  </div>
                  <p className={'space-x-4 pt-2 text-lg text-gray-600'}>{deviceExtra.download}</p>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Device