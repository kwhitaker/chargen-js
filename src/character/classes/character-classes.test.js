//@flow
import { findLast, last, pluck } from 'ramda';
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
    let expected = [
      'cleric',
      'dwarf',
      'fighter',
      'halfling',
      'magic-user',
      'thief'
    ];
    let stats = [['con', 9], ['int', 3]];
    let result = classes.availableClasses(stats);
    // $FlowFixMe
    expect(pluck('name', result)).toEqual(expected);

    expected = expected.concat('elf').sort();
    stats = [['con', 9], ['int', 9]];
    result = classes.availableClasses(stats);
    // $FlowFixMe
    expect(pluck('name', result)).toEqual(expected);

    expected = ['cleric', 'fighter', 'magic-user', 'thief'];
    stats = [['con', 3], ['int', 3]];
    result = classes.availableClasses(stats);
    // $FlowFixMe
    expect(pluck('name', result)).toEqual(expected);
  });
});

describe('getCharClass', () => {
  test('returns a character class based on the name', () => {
    expect(classes.getCharClass('elf')).toEqual(charClasses[2]);
  });
});

describe('getXp', () => {
  test('returns an expected XP value based on level', () => {
    const level = 5;
    const cleric = classes.getCharClass('cleric');

    // $FlowFixMe
    const expected = cleric.progression[level - 1][0];
    // $FlowFixMe
    expect(classes.getXp(cleric)(level)).toEqual(expected);
  });

  test('returns 0 if the level is out of bounds', () => {
    const level = 100;
    const cleric = classes.getCharClass('cleric');
    // $FlowFixMe
    expect(classes.getXp(cleric)(level)).toEqual(0);
  });
});

describe('getThaco', () => {
  test('returns a thaco array for a class, given a level', () => {
    const level = 5;
    const cleric = classes.getCharClass('cleric');
    // $FlowFixMe
    const expected = cleric.thaco[level - 1];
    // $FlowFixMe
    expect(classes.getThaco(cleric)(level)).toEqual(expected);
  });
});

describe('getSaves', () => {
  test('returns the saves array for a class, given a level', () => {
    const level = 10;
    const cleric = classes.getCharClass('cleric');
    // $FlowFixMe
    const expected = findLast(x => x[0] < level)(cleric.saves);
    // $FlowFixMe
    expect(classes.getSaves(cleric)(level)).toEqual(expected);
  });

  test('returns the last save array if the level exceeds the range allowed', () => {
    const level = 22;
    const cleric = classes.getCharClass('cleric');
    // $FlowFixMe
    const expected = last(cleric.saves);
    // $FlowFixMe
    expect(classes.getSaves(cleric)(level)).toEqual(expected);
  });
});

describe('getHdForLevel', () => {
  test('returns an HD array for a class, given a level', () => {
    const level = 10;
    const cleric = classes.getCharClass('cleric');
    // $FlowFixMe
    const result = classes.getHdForLevel(cleric)(level);
    expect(result.length).toEqual(level);

    result.forEach(i => {
      // $FlowFixMe
      expect(i).toEqual(cleric.progression[i - 1][2]);
    });
  });
});
