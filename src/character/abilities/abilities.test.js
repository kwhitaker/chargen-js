// @flow
import { keys, times } from 'ramda';
import type { Abilities } from './types';
import {
  genStat,
  genAllStats,
  getModsByRoll,
  rollGenerousStat,
  rollStat
} from './abilities';

const abilities: Abilities = require('../../rules/labyrinth-lord/abilities.json');
const gte3 = (val: number) => expect(val).toBeGreaterThanOrEqual(3);
const lte18 = (val: number) => expect(val).toBeLessThanOrEqual(18);

test('rollStat generates a number between 3 and 18', () => {
  // Hacky, but it gives us decent coverage
  times(() => {
    const stat = rollStat();
    gte3(stat);
    lte18(stat);
  }, 1000);
});

test('rollGenerousStat generates a number between 3 and 18', () => {
  times(() => {
    const stat = rollGenerousStat();
    gte3(stat);
    lte18(stat);
  }, 1000);
});

describe('genAllStats', () => {
  test('pairs a particular stat with a value', () => {
    const newStat = genStat('str');
    expect(newStat[0]).toBe('str');
    gte3(newStat[1]);
    lte18(newStat[1]);
  });

  test('generates a stats matrix', () => {
    const expected = genAllStats();
    expect(expected.length).toBe(keys(abilities).length);
  });
});

describe('getModsByRoll', () => {
  test('returns every mod for a given stat and roll', () => {
    const getDex = getModsByRoll('dex');
    const expected = [
      ['armor class', 2],
      ['missile to-hit', -2],
      ['optional initiative', 1]
    ];
    const mods = getDex(4);
    expect(mods).toEqual(expected);
  });

  test('returns the default if given an unknown number', () => {
    const getDex = getModsByRoll('dex');
    const expected = [
      ['armor class', 3],
      ['missile to-hit', -3],
      ['optional initiative', 2]
    ];
    const mods = getDex(1);
    expect(mods).toEqual(expected);
  });
});
