const getDryers = () => {
  let container = document.getElementById("dryerContainer");

  fetch("http://localhost:3000/dryers")
    .then((resp) => resp.json())
    .then((dryers) => {
      // debugger;
      dryers.forEach((dryer) => {
        let dry = new Dryer(dryer);
        container.innerHTML += dry.renderDryer();
      });
    });
};

const endDryer = (id) => {
  // debugger;
  dryerAvailable(id);
  document.getElementById(
    `dryer${id}btn`
  ).innerHTML = `<div>Dryer ${id} is in Use</div>`;

  document.getElementById(`dryer${id}btn`).innerHTML = `
    <div id="dryer${id}btn"><button onclick=startDryer(${id}) >Dryer ${id}</button></div>

    `;
  document.getElementById(
    `Dryer${id}Time`
  ).innerHTML = `    <div id="Dryer${id}Time">60</div>`;
};

let myDryer;

const startDryer = (id, time) => {
  document.getElementById(
    `dryer${id}btn`
  ).innerHTML = `<div>Dryer ${id} is in Use</div>`;
  dryerInUse(id);
  let myDryer = setInterval(function () {
    document.getElementById(`Dryer${id}Time`).innerText--;

    if (document.getElementById(`Dryer${id}Time`).innerText == 0) {
      clearInterval(myDryer);
      endDryer(id, time);
      dryerAvailable(id);
    }
  }, 300);
};

const dryerAvailable = (id) => {
  const dryer = {
    status: "Available",
  };

  fetch(`http://localhost:3000/dryers/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(dryer),
  });
};

const dryerInUse = (id) => {
  const dryer = {
    status: "In Use",
  };

  fetch(`http://localhost:3000/dryers/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(dryer),
  });
};

getDryers();
class Dryer {
  constructor(dryer) {
    this.id = dryer.id;
    this.time = dryer.time;
    this.status = dryer.status;
    Dryer.dryers << this;
  }

  renderDryer() {
    return `
    <div id="dryer${this.id}btn"><button onclick=startDryer(${this.id},${this.time}) >Dryer ${this.id}</button></div>
    <div id="Dryer${this.id}Time">${this.time}</div>
    `;
  }
}
