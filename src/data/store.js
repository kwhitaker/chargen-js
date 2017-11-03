//@flow
import Lockr from 'lockr';
import { append, find, findIndex, reject, pipe, propEq, update } from 'ramda';
import type { Character } from '../character/types';

const hasId = propEq('id');
const cSet = (key: string) => (val: number | string | Array<any> | Object) =>
  Lockr.set(key, val);
const setChars = cSet('characters');

Lockr.prefix = 'chargen';

export const getCharacters: () => Character[] = () =>
  Lockr.get('characters') || [];

export const getCharacter = (id: string): ?Character =>
  find(hasId(id), getCharacters());

export const createCharacter = (char: Character) =>
  pipe(getCharacters, append(char), setChars)(char);

export const updateCharacter = (char: Character) => {
  const chars = getCharacters();
  const idx = findIndex(hasId(char.id), chars);
  if (idx === -1) {
    return;
  }
  setChars(update(idx, char, chars));
};

export const deleteCharacter: (id: string) => (c: Character) => void = id =>
  pipe(getCharacters, reject(hasId(id)), setChars)(id);
