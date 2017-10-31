//@flow
import { assoc, pipe } from 'ramda';
import v4 from 'uuid';
import type { Character } from './types';
import { genAllStats } from './abilities/abilities';
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

export const generateRandomChar = (level?: number = 1): Character =>
  pipe(
    bootstrapChar,
    setName('Random Character'),
    setLevel(level),
    setXp(0),
    setAbilities(genAllStats()),
    setClass('fighter')
  )(level);
