import './App.css'
import Auth from "./layout/auth/Auth";
import Chat from "./pages/chat/Chat";
import WSHandler from "./layout/handler/WSHandler";

function App() {
  return (
    <div className="App">
      <Auth>
        <WSHandler>
          <Chat />
        </WSHandler>
      </Auth>
    </div>
  )
}

export default App
