import React from 'react'
import ReactDOM from 'react-dom'
import './assets/css/normalize.css'
import './index.css'
import App from './App'
import AppRoutes from "./routes";
import store from "./redux/store";
import {Provider} from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRoutes>
        <App />
      </AppRoutes>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
