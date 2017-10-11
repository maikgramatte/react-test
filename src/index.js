import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainApp from './containers/mainApp';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import mainAppReducers from './reducers'
import thunk from "redux-thunk";

let store = createStore(
    mainAppReducers,
    applyMiddleware(thunk)
);

const rootEl = document.getElementById('root');
console.log(
  rootEl.getAttribute('data-type')
);

const render = () => ReactDOM.render(
  <Provider store={store}>
    <MainApp />
  </Provider>,
  rootEl
)

render()
store.subscribe(render)

registerServiceWorker();
