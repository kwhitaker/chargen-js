// @flow
import { dropLast, keys, pipe, sort, sum, times } from 'ramda';
import { ABILITIES } from './types';
import type { Stat, StatTuple } from './types';

const genRandomInt = (min: number, max: number) =>
  Math.floor(max - Math.random() * (max - min));

export const rollStat = () => genRandomInt(3, 18);

const roll4d6 = times(() => genRandomInt(1, 6), 4);

export const rollGenerousStat = () =>
  pipe(sort((a, b) => b - a), dropLast(1), sum)(roll4d6);

export const genStat = (stat: Stat, generous: ?boolean): StatTuple => [
  stat,
  generous ? rollGenerousStat() : rollStat()
];

export const genAllStats = (generous?: boolean) =>
  keys(ABILITIES).map((s: Stat) => genStat(s, generous));
