import './App.css'
import BFC from "./pages/diplay/BFC";
import ThreeContents from "./pages/diplay/ThreeContents";
import Transition from "./pages/transition/Transition";
import Chat from "./pages/websocket/Chat";

function App() {

  return (
    <div className="App">

      <Chat />

      <Transition />

      <BFC />

      <ThreeContents />
    </div>
  )
}

export default App
