export const SUN = 0;
export const MON = 1;
export const TUE = 2;
export const WED = 3;
export const THU = 4;
export const FRI = 5;
export const SAT = 6;

/**
 * Returns the number of seconds corresponding to the given hour, number and seconds
 * @param {number} hour
 * @param {number} minute
 * @param {number} second
 */
function simpleTime(hour = 0, minute = 0, second = 0) {
  return (hour * 60 + minute) * 60 + second;
}

/**
 * Returns the given number of seconds as a pretty string
 * @param {number} simpleTime Seconds
 */
function prettyTime(simpleTime) {
  const hour = Math.floor(simpleTime / 3600);
  const minute = Math.floor((simpleTime - hour * 3600) / 60);
  const second = simpleTime % 60;
  return (
    hour.toString().padStart(2, "0") +
    ":" +
    minute.toString().padStart(2, "0") +
    ":" +
    second.toString().padStart(2, "0")
  );
}

/**
 * Returns the bus times for a given day from a table
 * @param {object} table Table object for busstop
 * @param {number} wkday The wanted day
 */
function getDailyTimes(table, wkday) {
  wkday = wkday % 7;
  const matchingTable = table.find(t => t.wkdays.includes(wkday));
  if (!matchingTable) throw new Error("No times for given day");
  return matchingTable.times;
}

/**
 * Get the next bustimes from a table object given a specific time
 * @param {object} time The time to calculate nex times from
 * @param {object} table A table object
 * @param {number} max Max number of returned times
 */
export function timeToNext({ h, m, s, wkday }, table, max = 3) {
  const from = simpleTime(h, m, s);
  return getDailyTimes(table, wkday)
    .concat(getDailyTimes(table, wkday + 1).map(t => [t[0] + 24, t[1]]))
    .map(t => simpleTime(t[0], t[1]) - from)
    .filter(t => t >= 0)
    .sort((a, b) => a > b)
    .filter((t, i) => i < max)
    .map(t => prettyTime(t));
}
