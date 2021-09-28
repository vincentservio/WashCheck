const getWashers = () => {
  let container = document.getElementById("washerContainer");

  fetch("http://localhost:3000/washers")
    .then((resp) => resp.json())
    .then((washers) => {
      // debugger;
      washers.forEach((washer) => {
        let wash = new Washer(washer);
        container.innerHTML += wash.renderWasher();
      });
    });
};

const washerAvailable = (id) => {
  const washer = {
    status: "Available",
  };

  fetch(`http://localhost:3000/washers/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(washer),
  });
};

const washerInUse = (id) => {
  const washer = {
    status: "In Use",
  };

  fetch(`http://localhost:3000/washers/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(washer),
  });
};

const endWasher = (id, time) => {
  // debugger;
  washerAvailable(id);
  document.getElementById(`washer${id}btn`).innerHTML = `
    <div id="washer${id}btn"><button onclick=startWasher(${this.id},${this.time}) >Washer ${id}</button></div>

    `;
  document.getElementById(
    `Washer${id}Time`
  ).innerHTML = `    <div id="Washer${id}Time">${time}</div>`;
};
let myWash;

const startWasher = (id, time) => {
  // debugger;
  document.getElementById(
    `washer${id}btn`
  ).innerHTML = `<div>Washer ${id} is in Use</div>`;
  washerInUse(id);
  let myWash = setInterval(function () {
    document.getElementById(`Washer${id}Time`).innerText--;
    if (document.getElementById(`Washer${id}Time`).innerText == 0) {
      clearInterval(myWash);
      endWasher(id, time);
      washererAvailable(id);
    }
  }, 300);
};

getWashers();
class Washer {
  constructor(washer) {
    this.id = washer.id;
    this.time = washer.time;
    this.status = washer.status;
    Washer.washers << this;
  }

  renderWasher() {
    return `
    <div id="washer${this.id}btn"><button onclick=startWasher(${this.id},${this.time}) >Washer ${this.id}</button></div>
    <div id="Washer${this.id}Time">${this.time}</div>
    `;
  }
}
