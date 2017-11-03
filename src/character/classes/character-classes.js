//@flow
import { all, find } from 'ramda';
import type { ClassReq, CharacterClass } from './types';
import type { StatTuple } from '../abilities/types';

const charClasses: CharacterClass[] = require('../../rules/labyrinth-lord/classes.json');
const gte = (min: number) => (val: number) => val >= min;

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
