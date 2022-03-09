import './Device.css'
import device1 from '@/assets/img/device/1.svg'
import device2 from '@/assets/img/device/2.svg'
import device3 from '@/assets/img/device/3.svg'
import device4 from '@/assets/img/device/4.svg'

import sonyIcon from '@/assets/img/device/banner/sony.svg'


function Device() {
  return (
    <div className='Device'>
      <div className='Device-item'>
        <div className={'device-list p-2'}>
          <div className={'device-list-item'}>
            <img className={'device-list-img border-2 border-red-300'} src={device1}/>
          </div>
          <div className={'device-list-item'}>
            <img className={'device-list-img'} src={device3}/>
          </div>
          <div className={'device-list-item'}>
            <img className={'device-list-img'} src={device4}/>
          </div>

          <div className={'device-list-item'}>
            <img className={'device-list-img'} src={device2}/>
          </div>
        </div>
        <div className={'device-list-dot flex justify-center'}>...</div>
      </div>

      <div className='Device-item'>
        <div className={'device-icon p-2 w-28'}>
          <img src={sonyIcon}/>
        </div>
      </div>

      <div className='Device-item'>
        DeviceInfo DeviceInfo DeviceInfo DeviceInfo DeviceInfo DeviceInfo DeviceInfo DeviceInfo
        DeviceInfo DeviceInfo DeviceInfo DeviceInfo DeviceInfo DeviceInfo DeviceInfo DeviceInfo
        DeviceInfo DeviceInfo DeviceInfo DeviceInfo DeviceInfo DeviceInfo DeviceInfo DeviceInfo
        DeviceInfo DeviceInfo DeviceInfo DeviceInfo DeviceInfo DeviceInfo DeviceInfo DeviceInfo
        DeviceInfo DeviceInfo DeviceInfo DeviceInfo DeviceInfo DeviceInfo DeviceInfo DeviceInfo
        DeviceInfo DeviceInfo DeviceInfo DeviceInfo DeviceInfo DeviceInfo DeviceInfo DeviceInfo
        DeviceInfo DeviceInfo DeviceInfo DeviceInfo DeviceInfo DeviceInfo DeviceInfo DeviceInfo
      </div>

      <div className='Device-item'>
        DeviceNetwork DeviceNetwork DeviceNetwork DeviceNetwork
        DeviceNetwork DeviceNetwork DeviceNetwork DeviceNetwork
        DeviceNetwork DeviceNetwork DeviceNetwork DeviceNetwork
        DeviceNetwork DeviceNetwork DeviceNetwork DeviceNetwork
        DeviceNetwork DeviceNetwork DeviceNetwork DeviceNetwork
        DeviceNetwork DeviceNetwork DeviceNetwork DeviceNetwork
        DeviceNetwork DeviceNetwork DeviceNetwork DeviceNetwork
      </div>
    </div>
  )
}

export default Device