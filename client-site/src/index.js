import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { store, persistor } from "./redux/Store";
import { PersistGate } from 'redux-persist/integration/react'
import "./styles/style.css";
import "bootstrap/dist/css/bootstrap.min.css";




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PersistGate persistor={persistor} >
      <Provider store={store} >
        <App />
      </Provider>
    </PersistGate>
  </React.StrictMode >
);
