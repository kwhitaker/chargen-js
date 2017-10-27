//@flow
import React from 'react';
import { toPairs } from 'ramda';
import { genAllStats } from './abilities';
import { ABILITY_MODS, getModByRoll } from './types';
import type { StatTuple } from './types';

import './abilities-list.css';

type AbilitiesProps = {
  rollsAreGenerous?: boolean
};

const Ability = ([stat, roll]: StatTuple) => {
  const mods = toPairs(ABILITY_MODS[stat]);
  const computedMods = mods
    .map(m => `${m[0]}: ${getModByRoll(m[1])(roll)}`)
    .join(', ');

  return [
    <dt key={stat} className="ability">
      {stat}
    </dt>,
    <dd key={`${stat}-roll`} className="roll">
      {roll} ( {computedMods} )
    </dd>
  ];
};

const AbilitiesList = (props: AbilitiesProps) => {
  const { rollsAreGenerous } = props;
  const stats = genAllStats(rollsAreGenerous);
  const abilities = stats.map(Ability);
  return <dl className="abilities">{abilities}</dl>;
};

export default AbilitiesList;
