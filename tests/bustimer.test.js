import { timeToNext } from '../src/js/bustimer';

const testTimes = [
  [12, 0],
  [13, 0],
  [18, 0]
]

test('returns time to next bus departure', () => {
  const res = timeToNext({ h: 12, m: 30, s: 0 }, testTimes);
  expect(res[0]).toBe('00:30:00');
  expect(res[1]).toBe('05:30:00');
  expect(res[2]).toBe('23:30:00');
});

test('defaults works', () => {
  const res = timeToNext({ h: 12, m: 30, s: 0 }, testTimes);
  expect(res.length).toBe(3);
  expect(res[0]).toBe('00:30:00');
  expect(res[1]).toBe('05:30:00');
  expect(res[2]).toBe('23:30:00');
});

test('limits response length', () => {
  const res = timeToNext({ h: 12, m: 30, s: 0 }, testTimes, 2);
  expect(res.length).toBe(2);
  expect(res[0]).toBe('00:30:00');
  expect(res[1]).toBe('05:30:00');
});