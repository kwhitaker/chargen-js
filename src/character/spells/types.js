//@flow

export type Spell = string;
export type SpellList = Spell[];
export type ClassSpells = {
  [key: string]: SpellList[]
};
