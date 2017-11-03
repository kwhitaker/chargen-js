//@flow
import { pluck } from 'ramda';
import * as classes from './character-classes';
import type { CharacterClass } from './types';

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
    let expected = ['cleric', 'dwarf'];
    let stats = [['con', 9], ['int', 3]];
    let result = classes.availableClasses(stats);
    expect(pluck('name', result)).toEqual(expected);

    expected = expected.concat('elf');
    stats = [['con', 9], ['int', 9]];
    result = classes.availableClasses(stats);
    expect(pluck('name', result)).toEqual(expected);

    expected = ['cleric'];
    stats = [['con', 3], ['int', 3]];
    result = classes.availableClasses(stats);
    expect(pluck('name', result)).toEqual(expected);
  });
});
