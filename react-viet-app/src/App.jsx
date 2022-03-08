import './App.css'
import NavBar from "./components/navBar/NavBar";
import DeviceInfo from "./components/deviceInfo/DeviceInfo";
import ControlCenter from "./components/controlCenter/ControlCenter";

function App() {
  return (
    <div className="App">
      <div className='App-item App-item-left'>
        <NavBar />
      </div>

      <div className='App-item col-span-3'>
        <DeviceInfo />
      </div>

      <div className='App-item col-span-5'>
        <ControlCenter />
      </div>

      <div className='App-item App-item-right col-span-2'>message</div>

    </div>
  )
}

export default App
