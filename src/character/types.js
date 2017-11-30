//@flow
import type { StatTuple } from './abilities/types';
import type { SpellList } from './spells/types';

export type Alignment = 'chaos' | 'law' | 'neutral';
const currencies = {
  cp: 'copper',
  sp: 'silver',
  gp: 'gold',
  ep: 'electrum',
  pp: 'platinum'
};

export type Currency = $Keys<typeof currencies>;

export type Character = {
  id: string,
  name: ?string,
  playerName: ?string,
  level: ?number,
  xp: ?number,
  abilities: ?(StatTuple[]),
  class: ?string,
  alignment: ?Alignment,
  spells?: SpellList,
  money: ?{
    [key: Currency]: number
  },
  thaco: ?(number[]),
  saves: ?(number[]),
  hp: ?number
};
