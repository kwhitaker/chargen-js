//@flow
import Lockr from 'lockr';
import { find, reject, propEq } from 'ramda';
import type { Character } from 'character/types.js';

const hasId = propEq('id');

Lockr.prefix = 'chargen';

export const getCharacters: () => Character[] = () =>
  Lockr.get('characters') || [];

export const getCharacter: (id: string) => Character = id =>
  find(hasId(id), getCharacters());

export const createCharacter: (c: Character) => void = char => {
  const existing = getCharacters();
  const updated = existing.concat(char);
  Lockr.set('characters', updated);
};

export const deleteCharacter: (id: string) => void = id => {
  const existing = getCharacters();
  const updated = reject(hasId(id), existing);
  Lockr.set('characters', updated);
};
