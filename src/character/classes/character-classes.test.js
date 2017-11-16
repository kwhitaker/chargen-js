//@flow
import { pluck } from 'ramda';
import * as classes from './character-classes';
import type { CharacterClass } from './types';

const charClasses: CharacterClass[] = require('../../rules/labyrinth-lord/classes.json');

describe('meetsReq', () => {
  test('returns true if the requirement is met', () => {
    const req = [['str', 10]];
    expect(classes.meetsReq(req)(['str', 10])).toBe(true);
  });

  test('returns false if the requirement isnt met', () => {
    const req = [['str', 10]];
    expect(classes.meetsReq(req)(['str', 8])).toBe(false);
  });

  test('returns true if there is no requirement', () => {
    const req = [];
    expect(classes.meetsReq(req)(['str', 10])).toBe(true);
  });
});

describe('meetsAllReqs', () => {
  test('returns true if all requirements are met', () => {
    const reqs = [['str', 10], ['int', 10]];
    const stats = [['str', 10], ['int', 10]];
    expect(classes.meetsAllReqs(reqs)(stats)).toBe(true);
  });

  test('returns false if all requirements all requirements are not met', () => {
    const reqs = [['str', 10], ['int', 10]];
    const stats = [['str', 10], ['int', 8]];
    expect(classes.meetsAllReqs(reqs)(stats)).toBe(false);
  });
});

describe('availableClasses', () => {
  test('it returns a list of classes based on stats', () => {
    let expected = ['cleric', 'dwarf', 'fighter'];
    let stats = [['con', 9], ['int', 3]];
    let result = classes.availableClasses(stats);
    // $FlowFixMe
    expect(pluck('name', result)).toEqual(expected);

    expected = expected.concat('elf').sort();
    stats = [['con', 9], ['int', 9]];
    result = classes.availableClasses(stats);
    // $FlowFixMe
    expect(pluck('name', result)).toEqual(expected);

    expected = ['cleric', 'fighter'];
    stats = [['con', 3], ['int', 3]];
    result = classes.availableClasses(stats);
    // $FlowFixMe
    expect(pluck('name', result)).toEqual(expected);
  });
});

describe('getCharClass', () => {
  test('it returns a character class based on the name', () => {
    expect(classes.getCharClass('elf')).toEqual(charClasses[2]);
  });
});

describe('getXp', () => {
  test('it returns an expected XP value based on level', () => {
    const level = 5;
    const cleric = classes.getCharClass('cleric');

    // $FlowFixMe
    const expected = cleric.progression[level - 1][0];
    // $FlowFixMe
    expect(classes.getXp(cleric)(level)).toEqual(expected);
  });

  test('it returns 0 if the level is out of bounds', () => {
    const level = 100;
    const cleric = classes.getCharClass('cleric');
    // $FlowFixMe
    expect(classes.getXp(cleric)(level)).toEqual(0);
  });
});
