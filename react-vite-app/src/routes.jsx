import {BrowserRouter, Routes, Route, useRoutes} from 'react-router-dom'
import {Analyse, AppConn} from "./pages/analyse/Analyse";
import Schedule from "./pages/schedule/Schedule";
import App from "./App";
import Home from "./pages/home/Home";

// useRoutes 如何设置 index？
const GetNavRoutes = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/home',
          element:　<Home />
        },
        {
          path: '/analyse',
          element: <Analyse />
        },
        {
          path: '/schedule',
          element: <Schedule />
        },
      ]
    },
  ])

  return routes
}

const NavRoutes = () => {
  return (
    <BrowserRouter>
      <GetNavRoutes />
    </BrowserRouter>
  )
}

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/analyse' element={<AppConn />}></Route>
          <Route path='/schedule' element={<Schedule />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export {
  NavRoutes,
  AppRoutes
}