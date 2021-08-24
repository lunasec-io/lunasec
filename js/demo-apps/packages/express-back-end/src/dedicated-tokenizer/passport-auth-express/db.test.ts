import { getUserById } from './db';

test('testing user id', () => {
  expect(getUserById('1').firstName).toBe('Gil');
  expect(getUserById('1').lastName).toBe('Amran');
});
