import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import { AppProvider } from './store/context.jsx'
import { Provider } from 'react-redux'
import {store} from "./store/store.js"

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <AppProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </AppProvider>
  </Provider>
)
