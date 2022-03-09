import './App.css'
import NavBar from "./components/navBar/NavBar";
import ControlCenter from "./components/controlCenter/ControlCenter";
import ShowArea from "./components/showArea/ShowArea";
import Device from "./components/device/Device";

function App() {
  return (
    <div className="App">
      <div className='App-item App-item-left'>
        <NavBar />
      </div>

      <div className='App-item col-span-3'>
        <Device />
      </div>

      <div className='App-item col-span-5'>
        <ControlCenter />
      </div>

      <div className='App-item App-item-right col-span-2'>
        <ShowArea />
      </div>

    </div>
  )
}

export default App
