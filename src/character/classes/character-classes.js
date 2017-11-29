//@flow
import {
  all,
  find,
  findLast,
  head,
  last,
  path,
  pipe,
  propEq,
  prop
} from 'ramda';
import type { ClassReq, CharacterClass, Level } from './types';
import type { StatTuple } from '../abilities/types';

const charClasses: CharacterClass[] = require('../../rules/labyrinth-lord/classes.json');
const gte = (min: number) => (val: number) => val >= min;

export const getCharClass = (name: string): ?CharacterClass =>
  find(propEq('name', name))(charClasses);

export const meetsReq = (reqs: ClassReq[]) => (
  [stat, roll]: StatTuple
): boolean => {
  const req = find(r => r[0] === stat)(reqs);

  return req ? gte(req[1])(roll) : true;
};

export const meetsAllReqs = (reqs: ClassReq[]) => (stats: StatTuple[]) =>
  all(meetsReq(reqs))(stats);

export const availableClasses = (stats: StatTuple[]) =>
  charClasses.filter(c => meetsAllReqs(c.requirements)(stats));

const maybeXp = (level: ?Level) => (level ? level[0] : 0);

export const getXp = (cClass: CharacterClass) => (level: number): number =>
  // $FlowFixMe
  pipe(
    prop('progression'),
    find(([xp, lvl, hd]: Level) => lvl === level),
    maybeXp
  )(cClass);

export const getThaco = (cClass: CharacterClass) => (level: number): number[] =>
  // $FlowFixMe
  path(['thaco', level - 1])(cClass);

export const getSaves = (cClass: CharacterClass) => (
  level: number
): number[] => {
  const saves = prop('saves', cClass);
  // $FlowFixMe
  return findLast(x => x[0] < level)(saves) || last(saves);
};
