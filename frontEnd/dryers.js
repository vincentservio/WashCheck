const onClick = () => {
  document.getElementById(
    "washer1"
  ).innerHTML = `<div>Washer 1 Being Used</div>`;

  setInterval(function () {
    console.log("CLicked");
    if (document.getElementById("washer1Time").innerText > 0) {
      document.getElementById("washer1Time").innerText--;
    }
  }, 3000);
};

// document.getElementById("Container").innerHTML = `
// <div  id="washer1"><button onclick=onClick()>Wash 1</button></div>
// <div  id="washer1Time">38</div>

// <button id="washer2">Wash 2</button>
// <div id="washer2Time">38</div>

// `
{
  /* <button id="Dryer1">Dry 1</button>
<div id="Dryer1Time">60</div>
<button id="Dryer2">Dry 2</button>
<div id="Dryer2Time"
>60</div>; */
}
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

const startDryer = (id) => {
  document.getElementById(
    `${id}btn`
  ).innerHTML = `<div>Dryer ${id} is in Use</div>`;

  if (document.getElementById(`Dryer${id}Time`).innerText > 0) {
    setInterval(function () {
      console.log("CLicked");

      document.getElementById(`Dryer${id}Time`).innerText--;
    }, 3000);
  }
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
    <div id="${this.id}btn"><button onclick=startDryer(${this.id}) >Dryer ${this.id}</button></div>
    <div id="Dryer${this.id}Time">${this.time}</div>
    `;
  }
}
