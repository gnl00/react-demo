import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from "./pages/login/Login";
import App from "./App";
import ChatCard from "./components/chatCard/ChatCard";
import Test from "./pages/test/Test";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<App />} >
          <Route path={'/chat/:uid'} element={<ChatCard />} />
        </Route>
        <Route path={'/login'} element={<Login />} />
        <Route path={'/test'} element={<Test />} />
        <Route path="/*" element={<Navigate to="/" />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes