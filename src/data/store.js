//@flow
import Lockr from 'lockr';
import { append, find, findIndex, reject, pipe, propEq, update } from 'ramda';
import type { Character } from 'character/types.js';

const hasId = propEq('id');
const cSet = (key: string) => (val: number | string | Array<any> | Object) =>
  Lockr.set(key, val);
const setChars = cSet('characters');

Lockr.prefix = 'chargen';

export const getCharacters: () => Character[] = () =>
  Lockr.get('characters') || [];

export const getCharacter: (id: string) => Character = id =>
  find(hasId(id), getCharacters());

export const createCharacter: (c: Character) => void = char =>
  pipe(getCharacters, append(char), setChars)(char);

export const updateCharacter: (c: Character) => void = char => {
  const chars = getCharacters();
  const idx = findIndex(hasId(char.id), chars);
  if (idx === -1) {
    return;
  }
  setChars(update(idx, char, chars));
};

export const deleteCharacter: (id: string) => (c: Character) => void = id =>
  pipe(getCharacters, reject(hasId(id)), setChars)(id);
