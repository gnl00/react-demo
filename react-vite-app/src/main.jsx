import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {AppRoutes} from "./routes";
import {Provider} from 'react-redux'
import store from "./redux/store";
import App from "./App";

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
