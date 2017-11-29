//@flow
import { contains, intersection } from 'ramda';
import { generateSpellBook, getSpellsPerDayTable } from './spells';
import type { ClassSpells } from './types';
const spells: ClassSpells = require('../../rules/labyrinth-lord/spells.json');

describe('getSpellsPerDayTable', () => {
  it('returns a spell table when given a class which has spells', () => {
    const result = getSpellsPerDayTable('cleric');
    expect(result).toBeDefined();
  });

  it('returns undefined if a provided class has no spells', () => {
    const result = getSpellsPerDayTable('dwarf');
    expect(result).toBeUndefined();
  });

  it('returns undefined if it receives an invalid character class', () => {
    const result = getSpellsPerDayTable('foo');
    expect(result).toBeUndefined();
  });
});

describe('generateSpellBook', () => {
  it('generates a random list of spells given a class and a character level', () => {
    const clericSpells = spells['cleric'];
    //$FlowFixMe
    const perDay = getSpellsPerDayTable('cleric')[2];
    const result = generateSpellBook('cleric')(3);
    expect(result).not.toEqual({});
    expect(intersection(result[1], clericSpells[0]).length).toBe(perDay[0]);
    expect(intersection(result[2], clericSpells[1]).length).toBe(perDay[1]);
  });
});
