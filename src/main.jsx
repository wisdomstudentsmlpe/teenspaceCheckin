import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  BrowserRouter as Router
} from "react-router-dom";

import Context, { FirebaseContext } from "./store/Context";
import firebase from "./firebase/config.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ firebase }}>
      <Context>
        <Router>
          <App />
        </Router>
      </Context>
    </FirebaseContext.Provider>
  </React.StrictMode>,
)
