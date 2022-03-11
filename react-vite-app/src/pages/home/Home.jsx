import './home.css'
import Device from "./device/Device";
import ControlCenter from "./controlCenter/ControlCenter";
import ShowArea from "./showArea/ShowArea";

function Home() {
  return (
    <div className='Home'>

      <div className='home-item home-left col-span-3'>
        <Device />
      </div>

      <div className='home-item col-span-5'>
        <ControlCenter />
      </div>

      <div className='home-item home-right col-span-3'>
        <ShowArea />
      </div>
    </div>
  )
}

export default Home;