import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./pages/login/Login";
import App from "./App";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<App />} />
        <Route path={'/login'} element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes