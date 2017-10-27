// @flow
import { getModByRoll, standardMods } from './types';

const getStdMod = getModByRoll(standardMods);

test('getModByRoll returns the expected value', () => {
  const expected = -1;
  expect(getStdMod(8)).toBe(expected);
});

test('it defaults to the first mod if it cannot find a rule', () => {
  const expected = -3;
  expect(getStdMod(19)).toBe(expected);
});
