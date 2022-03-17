import './App.css'
import BFC from "./pages/diplay/BFC";
import ThreeContents from "./pages/diplay/ThreeContents";
import Transition from "./pages/transition/Transition";

function App() {

  return (
    <div className="App">
      <Transition />

      <BFC />

      <ThreeContents />
    </div>
  )
}

export default App
