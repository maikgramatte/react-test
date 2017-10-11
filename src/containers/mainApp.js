import React, { Component } from 'react'
import ResultGrid from './ResultGrid';

class mainApp extends Component {
    render() {
      return (
        <div>
          <div className="ui segment panel">
              <h2>Alexander Street React.js Grid-PropType</h2>
          </div>

          <ResultGrid />
        </div>
      )
    }
  }
  
  export default mainApp;