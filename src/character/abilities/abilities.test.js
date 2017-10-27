// @flow

import { keys, times } from 'ramda';
import { test, expect } from 'jest';
import { ABILITIES } from './types';
import { genStat, genAllStats, rollGenerousStat, rollStat } from './abilities';

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

test('genStat pairs a particular stat with a value', () => {
  const newStat = genStat('str');
  expect(newStat[0]).toBe('str');
  gte3(newStat[1]);
  lte18(newStat[1]);
});

test('genAllStats generates a stats matrix', () => {
  const expected = genAllStats();
  expect(expected.length).toBe(keys(ABILITIES).length);
});
