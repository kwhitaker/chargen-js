//@flow
import { assoc, isNil, pipe, prop } from 'ramda';
import v4 from 'uuid';
import { genAllStats } from './abilities/abilities';
import {
  availableClasses,
  getCharClass,
  getXp
} from './classes/character-classes';
import { genRandomInt } from '../lib/utils/random-int';
import type { Character } from './types';
import type { StatTuple } from './abilities/types';

type SetCharProp<T> = (prop: T) => (c: Character) => any;
export const setName: SetCharProp<string> = name => assoc('name')(name);
export const setPlayerName: SetCharProp<string> = pName =>
  assoc('playerName')(pName);
export const setLevel: SetCharProp<number> = level => assoc('level')(level);
export const setXp: SetCharProp<number> = xp => assoc('xp')(xp);
export const setAbilities: SetCharProp<StatTuple[]> = abilities =>
  assoc('abilities')(abilities);
export const setClass: SetCharProp<string> = cClass => assoc('class')(cClass);

const setLevel1 = setLevel(1);

export const bootstrapChar: () => Character = () => ({
  id: v4(),
  name: undefined,
  level: undefined,
  playerName: undefined,
  xp: undefined,
  abilities: undefined,
  class: undefined
});

const setRandomClass = (c: Character): Character => {
  if (isNil(c.abilities)) {
    return c;
  }
  const avail = availableClasses(c.abilities);
  const cClass = avail[genRandomInt(0, avail.length - 1)];
  return setClass(cClass.name)(c);
};

const setXpFromRandomClass = (c: Character): Character => {
  if (isNil(c.class) || isNil(c.level)) {
    return c;
  }
  const cClass = getCharClass(c.class);
  // $FlowFixMe
  return setXp(getXp(cClass)(c.level))(c);
};

export const generateRandomChar = (level?: number = 0): Character =>
  pipe(
    bootstrapChar,
    setName('Random Character'),
    setAbilities(genAllStats()),
    setRandomClass,
    setLevel(level),
    setXpFromRandomClass
  )(level);
