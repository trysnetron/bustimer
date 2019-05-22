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

function timeToNext(hour, minute, second, table) {
  const from = simpleTime(hour, minute, second);
  return table
    .map(t => simpleTime(t[0], t[1]) - from)
    .filter(t => t >= 0)
    .sort((a, b) => a > b)
    .map(t => prettyTime(t));
}

export default function createBustimer(root, stops) {
  const rootElem = document.querySelector(root);
  if (!rootElem) throw new Error(`Root element '${root}' not found`);

  const updateFuncs = stops.map(stop => {
    const mainElem = document.createElement("div");
    mainElem.classList.add("stop");

    const nameElem = document.createElement("h2");
    nameElem.classList.add("stopname");
    nameElem.innerText = stop.name;
    mainElem.appendChild(nameElem);

    const timeElem = document.createElement("div");
    timeElem.classList.add("timeleft");
    mainElem.appendChild(timeElem);

    const nextElem = document.createElement("div");
    mainElem.appendChild(nextElem);

    rootElem.appendChild(mainElem);

    return function update(hour, minute, second) {
      const next = timeToNext(hour, minute, second, stop.times);
      timeElem.innerText = next[0];
      nextElem.innerText = `Next: ${next[1]}`;
    };
  });

  function update() {
    const now = new Date();
    updateFuncs.forEach(f =>
      f(now.getHours(), now.getMinutes(), now.getSeconds())
    );
  }

  update();
  setInterval(update, 1000);
}
