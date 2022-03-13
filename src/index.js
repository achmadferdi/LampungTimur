import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navigation} from './Navigation';
import News from './News';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import store from './store';


ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}>
     <BrowserRouter>
     <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
