import { timeToNext } from "./bustimer";
import stops from "./stops";

(function mountApp(root, stops) {
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

    return function update(hour, minute, second, weekday) {
      const next = timeToNext(
        { h: hour, m: minute, s: second, wkday: weekday },
        stop.table
      );
      if (next.length > 0) {
        timeElem.innerText = next[0];
        nextElem.innerText = `Next: ${next[1]}`;
      } else {
        timeElem.innerText = "no busses";
        nextElem.innerText = "today or tomorrow";
      }
    };
  });

  function update() {
    const now = new Date();
    updateFuncs.forEach(f =>
      f(now.getHours(), now.getMinutes(), now.getSeconds(), now.getDay())
    );
  }

  update();
  setInterval(update, 1000);
})("#app", stops);
