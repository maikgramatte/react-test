import React, { Component } from 'react'
import ResultGrid from './ResultGrid';

class mainApp extends Component {
    render() {
      return (
        <div style={{padding: '1rem'}}>
          <div className="panel">
              <h2>Alexander Street React.js Grid-PropType</h2>
          </div>

          <ResultGrid />
        </div>
      )
    }
  }
  
  export default mainApp;