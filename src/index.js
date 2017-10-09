import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainApp from './containers/mainApp';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import mainAppReducers from './reducers'

let store = createStore(
    mainAppReducers
);

const rootEl = document.getElementById('root')

const render = () => ReactDOM.render(
  <Provider store={store}>
    <MainApp />
  </Provider>,
  rootEl
)

render()
store.subscribe(render)

registerServiceWorker();
