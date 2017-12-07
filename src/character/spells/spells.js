//@flow
import { assoc, find, propOr, take } from 'ramda';
import * as shuffle from 'shuffle-array';
import { getCharClass } from '../classes/character-classes';
import type { ClassSpells, Spell, SpellBook, SpellList } from './types';

const spells: ClassSpells = require('../../rules/labyrinth-lord/spells.json');

const getRandomSpellsFromList = (spellList: SpellList) => (
  count: number = 1
): Spell => shuffle.pick(spellList, { picks: count });

const spellListAtLevel = (spellLists: SpellList[]) => (
  lvl: number = 1
): SpellList[] =>
  lvl - 1 <= spellLists.length
    ? take(lvl, spellLists)
    : take(spellLists.length, spellLists);

const spellFeature = propOr(undefined, 'spells');

export const getSpellsPerDayTable = (className: string): ?Array<number[]> => {
  const charClass = getCharClass(className);
  if (!charClass) {
    return undefined;
  }

  return spellFeature(charClass);
};

export const generateSpellBook = (className: string) => (
  charLevel: number
): SpellBook => {
  const spellsForClass = spells[className];
  const spellsPerDay = getSpellsPerDayTable(className);

  if (!spellsPerDay) {
    return {};
  }

  const spellsPerDayAtLevel = spellsPerDay[charLevel - 1];

  if (!spellsPerDayAtLevel) {
    return {};
  }

  return spellsPerDayAtLevel.reduce((accum, spellCount, idx) => {
    const level = idx + 1;
    const availSpells = spellListAtLevel(spellsForClass)(level);
    const chosen = getRandomSpellsFromList(availSpells[idx])(spellCount);
    return assoc(`${level}`, Array.isArray(chosen) ? chosen : [chosen], accum);
  }, {});
};
