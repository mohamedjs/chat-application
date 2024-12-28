import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware  } from 'redux'
import App from './App';
import reportWebVitals from './test/reportWebVitals';
import reducer from './store/mainReducer'
import thunk from 'redux-thunk';
import { ThemeProvider } from "@mui/material/styles";
import { theme } from './theme';
import './globals.css'

let store = createStore(reducer, applyMiddleware(thunk));
const rootElement = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
    <Provider store = {store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
