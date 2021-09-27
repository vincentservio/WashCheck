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

const startWasher = (id) => {
  document.getElementById(
    `${id}btn`
  ).innerHTML = `<div>Washer ${id} is in Use</div>`;

  if (document.getElementById(`Washer${id}Time`).innerText > 0) {
    setInterval(function () {
      console.log("CLicked");

      document.getElementById(`Washer${id}Time`).innerText--;
    }, 3000);
  }
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
    <div id="${this.id}btn"><button onclick=startWasher(${this.id}) >Washer ${this.id}</button></div>
    <div id="Washer${this.id}Time">${this.time}</div>
    `;
  }
}
