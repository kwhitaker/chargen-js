//@flow
import v4 from 'uuid';
import Lockr from 'lockr';
import { assoc } from 'ramda';
import type { Character } from '../character/types';
import * as characters from './store';

Lockr.prefix = 'chargen';

const testCharacter: Character = {
  id: v4(),
  name: 'Foobar',
  level: undefined,
  abilities: undefined,
  playerName: undefined,
  class: undefined,
  xp: undefined
};

describe('characters', () => {
  afterEach(() => Lockr.flush());
  describe('getCharacters', () => {
    test('returns an empty array if there are no characters', () => {
      const expected = [];

      expect(characters.getCharacters()).toEqual(expected);
    });

    test('returns a list of characters when they exist', () => {
      const expected = [testCharacter];
      Lockr.set('characters', expected);

      expect(characters.getCharacters()).toEqual(expected);
    });
  });

  describe('getCharacter', () => {
    test('returns a character if there is one', () => {
      const expected = testCharacter;
      Lockr.set('characters', [expected]);

      expect(characters.getCharacter(testCharacter.id)).toEqual(expected);
    });

    test('returns undefined if there is no matching character', () => {
      expect(characters.getCharacter(testCharacter.id)).toBe(undefined);
    });
  });

  describe('createCharacter', () => {
    test('it creates a character', () => {
      const expected = testCharacter;
      characters.createCharacter(testCharacter);

      expect(characters.getCharacter(expected.id)).toEqual(expected);
    });
  });

  describe('updatedCharacter', () => {
    test('it updated an existing character', () => {
      const updated = assoc('name', 'baz', testCharacter);
      characters.createCharacter(testCharacter);

      expect(characters.getCharacter(testCharacter.id)).toEqual(testCharacter);
      characters.updateCharacter(updated);
      expect(characters.getCharacter(updated.id)).toEqual(updated);
    });

    test('it returns the existing characters if it is given an unknown id', () => {
      const expected = [testCharacter];
      const updated = assoc('id', 'foo', testCharacter);
      characters.createCharacter(testCharacter);
      characters.updateCharacter(updated);
      expect(characters.getCharacters()).toEqual(expected);
    });
  });

  describe('deleteCharacter', () => {
    test('it deletes a character', () => {
      characters.createCharacter(testCharacter);
      expect(characters.getCharacter(testCharacter.id)).toEqual(testCharacter);
      characters.deleteCharacter(testCharacter.id);

      expect(characters.getCharacter(testCharacter.id)).toBe(undefined);
    });
  });
});
