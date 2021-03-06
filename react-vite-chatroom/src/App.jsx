import './App.css'
import {NavLink, Outlet} from "react-router-dom";
import TopLayout from "./pages/topLayout/TopLayout";
import Test from "./pages/test/Test";

function App() {
  return (
    <div className="App">
      <div>
        <h1 className={'text-center text-3xl mb-4'}>ChatRoom</h1>
        <p className={'text-gray-500 text-center'}>Welcome</p>
      </div>

      <Test />

      {/*<div className={'mt-10 h-full w-full p-4 bg-pink-200 flex justify-center items-center space-x-4'}>*/}
      {/*  <NavLink to={'/one'} >*/}
      {/*    <div className={'bg-blue-400 text-gray-100 p-3 rounded hover:bg-blue-600'}>ToOne</div>*/}
      {/*  </NavLink>*/}
      {/*  <NavLink to={'/many'} >*/}
      {/*    <div className={'bg-blue-400 text-gray-100 p-3 rounded hover:bg-blue-600'}>ToMany</div>*/}
      {/*  </NavLink>*/}
      {/*</div>*/}

      {/*<TopLayout>*/}
      {/*  <Outlet />*/}
      {/*</TopLayout>*/}
    </div>
  )
}

export default App
