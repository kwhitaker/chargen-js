//@flow
import { contains } from 'ramda';
import { getRandomSpellAtLevel, getSpellTable } from './spells';
import type { ClassSpells } from './types';
const spells: ClassSpells = require('../../rules/labyrinth-lord/spells.json');

describe('getRandomSpellAtLevel', () => {
  it('gets a random spell of the defined level from the list', () => {
    const result = getRandomSpellAtLevel('cleric')(2);
    const list = spells['cleric'][1];
    expect(contains(result, list)).toBe(true);
  });
});

describe('getSpellTable', () => {
  it('returns a spell table when given a class which has spells', () => {
    const result = getSpellTable('cleric');
    expect(result).toBeDefined();
  });

  it('returns undefined if a provided class has no spells', () => {
    const result = getSpellTable('dwarf');
    expect(result).toBeUndefined();
  });

  it('returns undefined if it receives an invalid character class', () => {
    const result = getSpellTable('foo');
    expect(result).toBeUndefined();
  });
});
