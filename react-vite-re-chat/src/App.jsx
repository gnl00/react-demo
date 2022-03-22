import './App.css'
import Auth from "./pages/auth/Auth";
import Chat from "./pages/chat/Chat";

function App() {
  return (
    <div className="App">
      <Auth>
        <Chat />
      </Auth>
    </div>
  )
}

export default App
