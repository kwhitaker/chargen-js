//@flow
import { assoc, assocPath, isNil, keys, pipe, values } from 'ramda';
import v4 from 'uuid';
import { genAllStats } from './abilities/abilities';
import {
  availableClasses,
  getCharClass,
  getHdForLevel,
  getSaves,
  getSkillsForLevel,
  getThaco,
  getXp
} from './classes/character-classes';
import { generateSpellBook } from './spells/spells';
import { genRandomInt } from '../lib/utils/random-int';
import type { Alignment, Character, Currency } from './types';
import type { StatTuple } from './abilities/types';
import type { SpellBook } from './spells/types';
import type { Skill } from './classes/types';

type SetCharProp<T> = (prop: T) => (c: Character) => any; // Should return Character, but the types hate it for some reason
export const setName: SetCharProp<string> = name => assoc('name')(name);
export const setPlayerName: SetCharProp<string> = pName =>
  assoc('playerName')(pName);
export const setLevel: SetCharProp<number> = level => assoc('level')(level);
export const setXp: SetCharProp<number> = xp => assoc('xp')(xp);
export const setAbilities: SetCharProp<StatTuple[]> = abilities =>
  assoc('abilities')(abilities);
export const setClass: SetCharProp<string> = cClass => assoc('class')(cClass);
export const setAlignment: SetCharProp<Alignment> = align =>
  assoc('alignment')(align);
export const setMoney: SetCharProp<{ [key: Currency]: number }> = currency =>
  assocPath(['money', keys(currency)[0]])(values(currency)[0]);
export const setSpells: SetCharProp<SpellBook> = spells =>
  assoc('spells')(spells);
export const setThaco: SetCharProp<number[]> = thacoArr =>
  assoc('thaco')(thacoArr);
export const setSaves: SetCharProp<number[]> = saves => assoc('saves')(saves);
export const setHp: SetCharProp<number> = hp => assoc('hp')(hp);
export const setSkills: SetCharProp<Skill[]> = skills =>
  assoc('skills')(skills);

export const bootstrapChar: () => Character = () => ({
  id: v4(),
  name: undefined,
  level: undefined,
  playerName: undefined,
  xp: undefined,
  abilities: undefined,
  class: undefined,
  alignment: undefined,
  money: undefined,
  thaco: undefined,
  saves: undefined,
  hp: undefined
});

const setRandomClass = (c: Character): Character => {
  if (isNil(c.abilities)) {
    return c;
  }
  const avail = availableClasses(c.abilities);
  const cClass = avail[genRandomInt(0, avail.length)];
  return setClass(cClass.name)(c);
};

const setXpFromRandomClass = (c: Character): Character => {
  if (isNil(c.class) || isNil(c.level)) {
    return c;
  }
  const cClass = getCharClass(c.class);
  // $FlowFixMe
  return setXp(getXp(cClass)(c.level))(c);
};

const setRandomAlignment = (c: Character): Character =>
  setAlignment(['chaos', 'law', 'neutral'][genRandomInt(0, 2)])(c);

export const setRandomStartingGold = (c: Character): Character => {
  const gp = genRandomInt(3, 24) * 10;
  return setMoney({ gp })(c);
};

const setRandomSpells = (c: Character): Character =>
  // $FlowFixMe
  setSpells(generateSpellBook(c.class)(c.level))(c);

const setThacoForRandomCharacter = (c: Character): Character => {
  if (isNil(c.class) || isNil(c.level)) {
    return c;
  }

  const cClass = getCharClass(c.class);
  // $FlowFixMe
  return setThaco(getThaco(cClass)(c.level))(c);
};

const setSavesForRandomCharacter = (c: Character): Character => {
  if (isNil(c.class) || isNil(c.level)) {
    return c;
  }

  const cClass = getCharClass(c.class);
  // $FlowFixMe
  return setSaves(getSaves(cClass)(c.level))(c);
};

const generateHp = (c: Character): Character => {
  if (isNil(c.class) || isNil(c.level)) {
    return c;
  }

  const cClass = getCharClass(c.class);
  // $FlowFixMe
  const hd = getHdForLevel(cClass)(c.level);
  const hp = hd.reduce(
    (sum, hd, idx) => (idx >= 9 ? sum + hd : sum + genRandomInt(1, cClass.hd)),
    0
  );
  return setHp(hp)(c);
};

const setSkillsForRandomCharacter = (c: Character): Character => {
  if (isNil(c.class) || isNil(c.level)) {
    return c;
  }

  const cClass = getCharClass(c.class);
  // $FlowFixMe
  return setSkills(getSkillsForLevel(cClass)(c.level))(c);
};

export const generateRandomChar = (level?: number = 0): Character =>
  pipe(
    bootstrapChar,
    setName('Random Character'),
    setAbilities(genAllStats()),
    setRandomClass,
    setLevel(level),
    setXpFromRandomClass,
    // $FlowFixMe
    setRandomAlignment,
    generateHp,
    setThacoForRandomCharacter,
    setSavesForRandomCharacter,
    setSkillsForRandomCharacter,
    setRandomStartingGold,
    setRandomSpells
  )(level);
