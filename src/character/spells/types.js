//@flow

export type Spell = string;
export type SpellList = Spell[];
export type SpellBook = {
  [key: number]: SpellList
};
export type ClassSpells = {
  [key: string]: SpellList[]
};
