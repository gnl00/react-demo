import './App.css'
import {Outlet} from 'react-router-dom'
import NavBar from "./components/navBar/NavBar";
import {connect} from "react-redux";

function App() {
  return (
    <div className="App">
      <div className='nav'>
        <NavBar />
      </div>

      <Outlet />
    </div>
  )
}

export default App
