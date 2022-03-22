import {BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import ChatOne from "./pages/chatOne/ChatOne";
import ChatMany from "./pages/chatMany/ChatMany";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<App />} >
          {/*<Route path={'/one'} element={<ChatOne />} />*/}
          {/*<Route path={'/many'} element={<ChatMany />} />*/}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes