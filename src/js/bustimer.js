function simpleTime(hour = 0, minute = 0, second = 0) {
  return (hour * 60 + minute) * 60 + second;
}

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

export function timeToNext({ h, m, s }, times, max = 3) {
  const from = simpleTime(h, m, s);
  return times
    .concat(times.map(t => [t[0] + 24, t[1]]))
    .map(t => simpleTime(t[0], t[1]) - from)
    .filter(t => t >= 0)
    .sort((a, b) => a > b)
    .filter((t, i) => i < max)
    .map(t => prettyTime(t));
}
