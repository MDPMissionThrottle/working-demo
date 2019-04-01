import React, { Component } from 'react';
import './App.css';
import logo from './image001.png'
import SmsHandler from './smsform';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} />
          <SmsHandler />
        </header>
      </div>
    );
  }
}

export default App;
