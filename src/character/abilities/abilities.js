// @flow
import {
  dropLast,
  find,
  head,
  keys,
  last,
  pipe,
  prop,
  sort,
  sum,
  times
} from 'ramda';
import { genRandomInt } from '../../lib/utils/random-int';

import type { AbilityMod, Abilities, StatTuple } from './types';

const abilities: Abilities = require('../../rules/labyrinth-lord/abilities.json');

export const rollStat = () => genRandomInt(3, 18);

const roll4d6 = times(() => genRandomInt(1, 6), 4);

export const rollGenerousStat = () =>
  pipe(sort((a, b) => b - a), dropLast(1), sum)(roll4d6);

export const genStat = (stat: string, generous: ?boolean): StatTuple => [
  stat,
  generous ? rollGenerousStat() : rollStat()
];

export const genAllStats = (generous?: boolean) =>
  keys(abilities).map(s => genStat(s, generous));

const maybeMod = (n: ?(number[])) => (n ? last(n) : undefined);
const findMod: (r: number) => (m: AbilityMod) => ?number = (roll: number) =>
  pipe(
    prop('values'),
    find(([min, max, mod]) => roll >= min && roll <= max),
    maybeMod
  );

const lastOfFirst = pipe((head: any), last);

export const getModsByRoll = (stat: string) => (roll: number) => {
  const ability = abilities[stat];
  const mods = ability.mods.reduce(
    (acc, curr) =>
      acc.concat([
        [curr.affects, findMod(roll)(curr) || lastOfFirst(curr.values)]
      ]),
    []
  );
  return mods;
};
