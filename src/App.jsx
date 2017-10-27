import React, { Component } from 'react';
import { genAllStats } from './data/abilities/abilities';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <pre>{JSON.stringify(genAllStats(), null, 2)}</pre>
      </div>
    );
  }
}

export default App;
