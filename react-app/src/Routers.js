import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom";
import App from "./App";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Profile from "./pages/profile/Profile";

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/about' element={<About />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Routers;
