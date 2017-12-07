//@flow
import React, { Component } from 'react';
import { all, isEmpty, tail, toPairs } from 'ramda';
import { Github } from 'react-feather';
import { generateRandomChar } from '../character/actions';
import { getCharClass } from '../character/classes/character-classes';
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
          {this.renderSpells()}
          {this.renderSkills()}
          {this.renderFeatures()}
          {this.renderMoney()}
        </section>
        <p className="disclaimer">
          This character generator is intentionally limited in scope, and
          doesn't handle certain things (such as picking equipment, appearance,
          etc). I might expand the features at a later date, but I make no
          guarantees.
        </p>
        <p className="disclaimer">
          This code is copyright{' '}
          <a
            href="http://kevin-whitaker.net"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kevin Whitaker.
          </a>{' '}
          Laybrinth Lord is copyright{' '}
          <a
            href="http://goblinoidgames.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Goblinoid Games
          </a>.
        </p>
        <p className="github">
          <a
            href="https://github.com/kwhitaker/chargen-js"
            title="Fork on Github"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
          </a>
        </p>
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

  renderSpells() {
    const { character: { spells = {} } } = this.state;
    if (isEmpty(spells)) {
      return null;
    }

    const elems = toPairs(spells).map(([level, ...rest]) => (
      <li key={level} className="spell-level">
        <strong>level {level}:</strong> {rest.join(', ')}
      </li>
    ));

    return (
      <section className="character-spells">
        <h3 className="section-header">Spells</h3>
        <ul className="spell-list">{elems}</ul>
      </section>
    );
  }

  renderSkills() {
    const { character: { skills = [] } } = this.state;
    if (isEmpty(skills)) {
      return null;
    }

    const elems = skills.map(({ name, value, type = '%' }) => (
      <li key={name} className="skill">
        <strong>{name}:</strong>
        &nbsp;
        {value}
        {type}
      </li>
    ));

    return (
      <section className="character-skills">
        <h3 className="section-header">Skills</h3>
        <ul className="skill-list">{elems}</ul>
      </section>
    );
  }

  renderFeatures() {
    const { character: { class: charClass } } = this.state;
    const features = getCharClass(charClass).features;

    if (isEmpty(features)) {
      return null;
    }

    const elems = features.map(({ name, list = [], pageNum }) => (
      <li key="name" className="feature">
        {name} (page: {pageNum})
        {isEmpty(list) ? null : (
          <p className="feature-values">{list.join(', ')}</p>
        )}
      </li>
    ));

    return (
      <section className="character-features">
        <h3 className="section-header">Features</h3>
        <ul className="feature-list">{elems}</ul>
      </section>
    );
  }

  renderMoney() {
    const { character: { money = {} } } = this.state;
    const moneyArr = toPairs(money);
    if (all(isEmpty)(moneyArr)) {
      return null;
    }

    const elems = moneyArr.map(([type, count]) => (
      <li key={type} className="currency">
        <span className="value">{count}</span>
        <strong>{type}</strong>
      </li>
    ));

    return (
      <section className="character-money">
        <h3 className="section-header">Money</h3>
        <ul className="currency-list">{elems}</ul>
      </section>
    );
  }
}

export default App;
