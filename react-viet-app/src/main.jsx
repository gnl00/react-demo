import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {AppRoutes} from "./routes";

ReactDOM.render(
  <React.StrictMode>
    <AppRoutes>
      <App />
    </AppRoutes>
  </React.StrictMode>,
  document.getElementById('root')
)
