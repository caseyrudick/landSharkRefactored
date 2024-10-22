import React from 'react';
import ReactDOM from 'react-dom';
import reduxThunk from "redux-thunk"
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from "redux"
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './Components/App';
import reducers from './Reducers'
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
)

ReactDOM.render(
  <Provider store={store}>
    <App/>  
  </Provider>,
  document.getElementById('root')
);

// create a form that saves data to our redux store, 
// add validators to each field 
// then pushes this data to our backend 