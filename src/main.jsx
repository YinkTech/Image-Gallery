import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/css/index.css'
import './assets/css/App.css'
import { BrowserRouter } from 'react-router-dom'
import SwitchRoute from './container/SwitchRoute'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <SwitchRoute />
    </BrowserRouter>
  </React.StrictMode>,
)
