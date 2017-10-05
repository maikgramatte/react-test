import React, { Component } from 'react'
import ResultGrid from './ResultGrid';

class mainApp extends Component {
    constructor(props) {
      super(props)
    }
   
    render() {
      return (
        <div>
          <div className="panel">
              <h2>Alexander Street React PropType</h2>
          </div>

          <ResultGrid />
        </div>
      )
    }
  }
  
  export default mainApp;