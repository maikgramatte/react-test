import React, { Component } from 'react';
import logo from './logo.svg';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import MainApp from './containers/mainApp';
import mainAppReducers from './reducers'

let store = createStore(
  mainAppReducers,
  +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends Component {
  render() {
    return (
      <Provider store={store} className="App">
        <MainApp 
          value={store.getState()}
          onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
          onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
        />
      </Provider>
    );
  }
}

export default App;
