//@flow
import React, { Component } from 'react';
import { tail } from 'ramda';
import { generateRandomChar } from '../character/actions';
import type { Character } from '../character/types';
import './app.css';

type AppState = {
  character: Character
};

const saveLabels = [
  'breath attacks',
  'poison/death',
  'petrify/paralyze',
  'wands',
  'spells/spell-like devices'
];

class App extends Component<any, AppState> {
  state = { character: generateRandomChar(1) };

  componentDidMount() {
    this.setState({
      character: generateRandomChar(1)
    });
  }

  render() {
    const { character } = this.state;
    const { class: charClass, level, alignment, hp } = character;

    return (
      <div className="app">
        <section className="character-sheet">
          <div className="char-info">
            <h2 className="char-class">{charClass}</h2>
            <ul className="secondary-info">
              <li className="entry">
                <strong className="entry-label">HP:</strong>
                {hp}
              </li>
              <li className="entry">
                <strong className="entry-label">Level:</strong>
                {level}
              </li>
              <li className="entry">
                <strong className="entry-label">Align:</strong>
                {alignment}
              </li>
            </ul>
          </div>
          {this.renderAbilities()}
          {this.renderSaves()}
          {this.renderToHit()}
        </section>
        <pre>{JSON.stringify(character, null, 2)}</pre>
      </div>
    );
  }

  renderAbilities() {
    const { character: { abilities } } = this.state;
    const elems = (abilities || []).map(([stat, roll]) => (
      <li key={stat} className="ability">
        <span className="ability-value">{roll}</span>
        <span className="ability-stat">{stat}</span>
      </li>
    ));

    return <ul className="character-abilities">{elems}</ul>;
  }

  renderSaves() {
    const { character: { saves } } = this.state;
    const elems = tail(saves || []).map((save, idx) => (
      <li key={idx} className="saving-throw">
        <span className="save-type">{saveLabels[idx]}</span>
        <strong className="save-value">{save}</strong>
      </li>
    ));

    return (
      <section className="character-saves">
        <h3 className="section-header">Saving Throws</h3>
        <ul className="saving-throws">{elems}</ul>
      </section>
    );
  }

  renderToHit() {
    const { character: { thaco } } = this.state;
    const elems = (thaco || []).map((roll, idx) => (
      <li key={idx - 6} className="to-hit">
        <span className="to-hit-ac">{idx - 6}</span>
        <span className="to-hit-roll">{roll}</span>
      </li>
    ));

    return (
      <section className="character-to-hit">
        <h3 className="section-header">
          To-Hit
          <span className="addl-info">(AC/Roll Needed)</span>
        </h3>
        <ul className="to-hit-matrix">{elems}</ul>
      </section>
    );
  }
}

export default App;
