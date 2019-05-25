import { timeToNext } from "../src/js/bustimer";

const testTable = [
  {
    wkdays: [1, 2, 3, 4, 5],
    times: [[12, 0], [13, 0], [18, 0]]
  },
  {
    wkdays: [0, 6],
    times: []
  }
];

test("returns time to next bus departure", () => {
  const res = timeToNext({ h: 12, m: 30, s: 0, wkday: 1 }, testTable);
  expect(res[0]).toBe("00:30:00");
  expect(res[1]).toBe("05:30:00");
  expect(res[2]).toBe("23:30:00");
});

test("defaults works", () => {
  const res = timeToNext({ h: 12, m: 30, s: 0, wkday: 1 }, testTable);
  expect(res.length).toBe(3);
  expect(res[0]).toBe("00:30:00");
  expect(res[1]).toBe("05:30:00");
  expect(res[2]).toBe("23:30:00");
});

test("limits response length", () => {
  const res = timeToNext({ h: 12, m: 30, s: 0, wkday: 1 }, testTable, 2);
  expect(res.length).toBe(2);
  expect(res[0]).toBe("00:30:00");
  expect(res[1]).toBe("05:30:00");
});

test("takes different weekdays into account", () => {
  const res = timeToNext({ h: 12, m: 30, s: 0, wkday: 0 }, testTable);
  expect(res[0]).toBe("23:30:00");
});

test("returns no times for consecutive empty days", () => {
  const res = timeToNext({ h: 12, m: 30, s: 0, wkday: 6 }, testTable);
  expect(res.length).toBe(0);
});
