import React, { Component } from 'react';
import CharacterSheet from '../character/character-sheet';

import logo from './logo.svg';
import './app.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <h1 className="app-title">Welcome to React</h1>
        </header>
        <CharacterSheet />
      </div>
    );
  }
}

export default App;
