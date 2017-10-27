// @flow
import { assoc, find, equals, isNil } from 'ramda';

export const ABILITIES = {
  str: 'Strength',
  dex: 'Dexterity',
  con: 'Constitution',
  int: 'Intelligence',
  wis: 'Wisdom',
  cha: 'Charisma'
};

export type Stat = $Keys<typeof ABILITIES>;
export type StatTuple = [Stat, number];

type ModRule<T> = {
  shouldApply: (x: number) => boolean,
  mod: T
};

type Mods = {
  [key: Stat]: {
    [key: string]: ModRule<number | string>[]
  }
};

export const getModByRoll = (funcs: ModRule<*>[]) => (roll: number) => {
  const rule = find(r => r.shouldApply(roll))(funcs);
  return !isNil(rule) ? rule.mod : funcs[0].mod;
};

const lte = (max: number) => (x: number) => x <= max;
const is3 = equals(3);
const is18 = equals(18);
const max5 = lte(5);
const max8 = lte(8);
const max12 = lte(12);
const max15 = lte(15);
const max17 = lte(17);

const reverseNum = (x: number) => -x;
const reverseMod = (rule: ModRule<number>) =>
  assoc('mod', reverseNum(rule.mod), rule);

export const standardMods = [
  {
    shouldApply: is3,
    mod: -3
  },
  {
    shouldApply: max5,
    mod: -2
  },
  {
    shouldApply: max8,
    mod: -1
  },
  {
    shouldApply: max12,
    mod: 0
  },
  {
    shouldApply: max15,
    mod: 1
  },
  {
    shouldApply: max17,
    mod: 2
  },
  {
    shouldApply: is18,
    mod: 3
  }
];

export const narrowMods = [
  {
    shouldApply: is3,
    mod: 2
  },
  {
    shouldApply: max8,
    mod: 1
  },
  {
    shouldApply: max12,
    mod: 0
  },
  {
    shouldApply: max17,
    mod: -1
  },
  {
    shouldApply: is18,
    mod: -2
  }
];

export const reversedMods = standardMods.map(reverseMod);
export const reversedNarrowMods = narrowMods.map(reverseMod);

const LEAST_EDUCATED = 'Unable to read or write. Broken speech';
const CANT_READ_WRITE = 'Unable to read or write.';
const BASIC_ED = 'Partially able to read & write.';
const EDUCATED = 'Able to read & write.';

export const addlLangs = [
  {
    shouldApply: max12,
    mod: 0
  },
  {
    shouldApply: max15,
    mod: 1
  },
  {
    shouldApply: max17,
    mod: 2
  },
  {
    shouldApply: is18,
    mod: 3
  }
];

export const langProf = [
  {
    shouldApply: is3,
    mod: LEAST_EDUCATED
  },
  {
    shouldApply: max5,
    mod: CANT_READ_WRITE
  },
  {
    shouldApply: max8,
    mod: BASIC_ED
  },
  {
    shouldApply: max17,
    mod: EDUCATED
  },
  {
    shouldApply: is18,
    mod: EDUCATED
  }
];

export const retainerCount = [
  {
    shouldApply: is3,
    mod: 1
  },
  {
    shouldApply: max5,
    mod: 2
  },
  {
    shouldApply: max8,
    mod: 3
  },
  {
    shouldApply: max12,
    mod: 4
  },
  {
    shouldApply: max15,
    mod: 5
  },
  {
    shouldApply: max17,
    mod: 6
  },
  {
    shouldApply: is18,
    mod: 7
  }
];

export const retainerMorale = [
  {
    shouldApply: is3,
    mod: 4
  },
  {
    shouldApply: max5,
    mod: 5
  },
  {
    shouldApply: max8,
    mod: 6
  },
  {
    shouldApply: max12,
    mod: 7
  },
  {
    shouldApply: max15,
    mod: 8
  },
  {
    shouldApply: max17,
    mod: 9
  },
  {
    shouldApply: is18,
    mod: 10
  }
];

export const ABILITY_MODS: Mods = {
  str: {
    'To Hit, Damage, & Force Doors': standardMods
  },
  dex: {
    'Armor Class': reversedMods,
    'Missile To-Hit': standardMods,
    'Optional Initiative': narrowMods
  },
  con: {
    'Bonus HP per Hit Dice': standardMods
  },
  int: {
    'Additional Languages': addlLangs,
    'Language Proficiency': langProf
  },
  wis: {
    'Saving Throw vs Magic Effects': standardMods
  },
  cha: {
    'Reaction Adjustment': reversedNarrowMods,
    Retainers: retainerCount,
    'Retainer Morale': retainerMorale
  }
};
