//@flow
import { all, isNil, omit, values } from 'ramda';
import { bootstrapChar, generateRandomChar } from './actions';

test('bootStrapChar generates a character w/ a random id and nothing else', () => {
  const result = bootstrapChar();
  expect(result.id).not.toBe(undefined);
  expect(all(isNil)(values(omit(['id'], result)))).toBe(true);
});

describe('generateRandomChar', () => {
  test('it generates a random character of the given level', () => {
    const result = generateRandomChar(10);
    expect(result.level).toEqual(10);
    expect(result.name).toEqual('Random Character');
    expect(result.abilities).toHaveLength(6);
    expect(result.class).toBeDefined();
    expect(result.xp).toBeDefined();
    expect(result.alignment).toBeDefined();
    //$FlowFixMe
    expect(result.money.gp).toBeGreaterThanOrEqual(3);
  });

  test('it generates a level 0 character if no level is given', () => {
    const result = generateRandomChar();
    expect(result.level).toEqual(0);
  });
});
