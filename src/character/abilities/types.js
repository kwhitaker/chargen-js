// @flow
export type AbilityModTuple = [number, number, number | string];

export type AbilityMod = {
  affects: string,
  values: Array<AbilityModTuple>
};

export type Ability = { fullName: string, mods: Array<AbilityMod> };
export type Abilities = {
  [key: string]: Ability
};

export type StatTuple = [string, number];
