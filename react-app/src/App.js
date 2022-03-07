import './App.css';
import {useState} from "react";
import Home from "./pages/home/Home";
import About from "./pages/about/About";

function App() {
  const [ste, setSte] = useState('defaultState');

  const info = 'This is App-header'

  return (
    <div className="App">
      <header className="App-header">
        <h1>{info}</h1>
        <p>{ste}</p>
      </header>

      <div className='App-content'>
        <Home />
        <About />
      </div>
    </div>
  );
}

export default App;
