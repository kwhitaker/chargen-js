//@flow
import type { StatTuple } from './abilities/types';

export type Character = {
  id: string,
  name: ?string,
  playerName: ?string,
  level: ?number,
  xp: ?number,
  abilities: ?StatTuple,
  class: ?string
};
