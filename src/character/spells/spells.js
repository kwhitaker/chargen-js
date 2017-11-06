//@flow
import { find, pipe, propEq } from 'ramda';
import { genRandomInt } from '../../lib/utils/random-int';
import { getCharClass } from '../classes/character-classes';
import type { ClassSpells, Spell, SpellList } from './types';
import type { CharacterClass, ClassFeature } from '../classes/types';

const spells: ClassSpells = require('../../rules/labyrinth-lord/spells.json');
const charClasses: CharacterClass[] = require('../../rules/labyrinth-lord/classes.json');

const getRandomSpellFromList = (spellList: SpellList): Spell =>
  spellList[genRandomInt(1, spellList.length)];

const spellListAtLevel = (spellLists: SpellList[]) => (lvl: number = 1) =>
  spellLists[lvl - 1];

const spellFeature = propEq('name', 'spells');

export const getRandomSpellAtLevel = (className: string) => (
  lvl: number
): Spell => {
  const spellList = spellListAtLevel(spells[className])(lvl);
  return spellList ? getRandomSpellFromList(spellList) : '';
};

export const getSpellTable = (className: string): ?Array<string | number> => {
  const charClass = getCharClass(className);
  if (!charClass) {
    return undefined;
  }

  const feature = find(spellFeature, charClass.features);
  return feature ? feature.table : undefined;
};
