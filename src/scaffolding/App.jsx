//@flow
import React, { Component } from 'react';
import v4 from 'uuid';
import type { Character } from '../character/types';
import {
  getCharacter,
  getCharacters,
  createCharacter,
  deleteCharacter
} from '../data/store';

import './app.css';

type AppState = {
  characters: Character[]
};

class App extends Component<any, AppState> {
  state = { characters: [] };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { characters } = this.state;
    const elems = characters.length ? (
      <ul className="characters">{characters.map(this.renderCharacterItem)}</ul>
    ) : (
      <p>No Characters</p>
    );

    return (
      <div className="app">
        {elems}
        <button onClick={this.onClickCreate}>Create!</button>
      </div>
    );
  }

  renderCharacterItem = (char: Character) => (
    <li key={char.id} className="character-item">
      <a onClick={() => this.onClickCharacter(char.id)}>{char.name}</a>
      &nbsp;
      <a onClick={() => this.onDeleteCharacter(char.id)}>&times;</a>
    </li>
  );

  onClickCharacter = (id: string) => {
    alert(`clicked ${id}`);
  };

  onClickCreate = () => {
    const id = v4();
    const name = `Character ${id}`;

    createCharacter({
      id,
      name,
      level: 0,
      xp: undefined,
      playerName: undefined,
      class: undefined,
      abilities: undefined
    });
    this.fetchData();
  };

  onDeleteCharacter = (id: string) => {
    deleteCharacter(id);
    this.fetchData();
  };

  fetchData = () => this.setState(() => ({ characters: getCharacters() }));
}

export default App;
