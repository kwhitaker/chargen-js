// @flow
import React, { Component } from 'react';
import AbilitiesList from './abilities/abilities-list';
import './character-sheet.css';

type CharacterSheetProps = {};

type CharacterSheetState = {};

class CharacterSheet extends Component<
  CharacterSheetProps,
  CharacterSheetState
> {
  render() {
    return (
      <div className="character-sheet">
        <AbilitiesList statsAreGenerous={false} />
      </div>
    );
  }
}

export default CharacterSheet;
