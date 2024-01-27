// Setup
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const carWidth = 100;
const carHeight = 50;
const all = [
  {
    id: "1",
    name: "Luís",
    picture: "https://ca.slack-edge.com/TFN6RMAJG-UFRC6V78V-594070069b16-512",
  },
  {
    id: "2",
    name: "Lucas",
    picture: "https://ca.slack-edge.com/TFN6RMAJG-U021KR9FV5J-aa2ab2dad5d4-512",
  },
  {
    id: "3",
    name: "Djian",
    picture: "https://ca.slack-edge.com/TFN6RMAJG-U01E31WQGJY-df4b50b6c639-512",
  },
  {
    id: "4",
    name: "Guilherme",
    picture: "https://ca.slack-edge.com/TFN6RMAJG-U035GG11ZA6-1185da594dee-512",
  },
  {
    id: "5",
    name: "Wagner",
    picture: "https://ca.slack-edge.com/TFN6RMAJG-U058VDEGP42-eb72827aed8c-512",
  },
  {
    id: "6",
    name: "Rafa",
    picture: "https://ca.slack-edge.com/TFN6RMAJG-U01A1K1CV9T-b6f6a99bad0b-72",
  },
  {
    id: "7",
    name: "João",
    picture: "https://ca.slack-edge.com/TFN6RMAJG-U03LESP00H2-4f0d1703176d-512",
  },
  {
    id: "8",
    name: "Filipe",
    picture: "https://ca.slack-edge.com/TFN6RMAJG-U03TADPMFCH-a8b1925a6055-512",
  },
  {
    id: "9",
    name: "Matheus",
    picture: "https://ca.slack-edge.com/TFN6RMAJG-U01AFDM0T0U-3fc9e33c7361-512",
  },
  {
    id: "10",
    name: "Tiago",
    picture: "https://ca.slack-edge.com/TFN6RMAJG-U02057B4W31-557ffa775071-512",
  },
  {
    id: "11",
    name: "Natan",
    picture: "https://ca.slack-edge.com/TFN6RMAJG-U04C6GLABQE-72030d04f5a2-512",
  }
];
const cars = all.map((x) => new Car(new Member(x), carHeight, carWidth));

// Btns
let playButton = document.getElementById("play");
let resetButton = document.getElementById("reset");
let addButton = document.getElementById("add");
let removeButton = document.getElementById("remove");

// Events
playButton.addEventListener("click", setSpeed);
resetButton.addEventListener("click", setup);
addButton.addEventListener("click", addCars);
removeButton.addEventListener("click", removeCars);
window.addEventListener("resize", setCanvas);

// Vars/Consts
const carsAmount = 11;
const border = 12;
let roadWidth;
let roadHeight;
let lane;
let intervalId;
let isGameOver = false;
let tick = 0;
let fps = 0;
let lastTime = 0;

// Draw
function drawRoad() {
  // Grass
  ctx.fillStyle = "#4cbb17";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // Road
  ctx.fillStyle = "#2c2c2c";
  ctx.fillRect(0, canvas.height / 6, roadWidth, roadHeight);
  // Borders;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, canvas.height / 6 - border, roadWidth, border);
  ctx.fillRect(0, canvas.height / 6 + roadHeight, roadWidth, border);
  // Lanes
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.setLineDash([20, 10]);

  let y = canvas.height / 6;
  lane = roadHeight / cars.length;
  for (let i = 1; i < cars.length; i++) {
    let newY = y + lane * i;
    ctx.beginPath();
    ctx.moveTo(0, newY);
    ctx.lineTo(roadWidth, newY);
    ctx.stroke();
  }
  ctx.setLineDash([]);
}

function drawCars() {
  let y = canvas.height / 6;
  cars.forEach((car, index) => {
    car.height = Math.min(carHeight, lane);
    car.y = y + lane * (index + 1) - lane / 2 - car.height / 3;
    car.draw(ctx);
  });
}

function drawFPS() {
  ctx.fillStyle = "#ffffff";
  ctx.font = "12px Arial";
  ctx.fillText("FPS: " + fps, 2, 12);
}

function resetCars() {
  cars.forEach((car) => {
    car.reset();
  });
}

function addCars() {
  let m = all[cars.length];
  if (!m) return;
  cars.push(new Car(new Member(m), carHeight, carWidth));
  setup();
}

function removeCars() {
  cars.pop();
  setup();
}

function setSpeed() {
  cars.forEach((car) => {
    car.speed = Math.random() * 10 + 5;
  });
}

function moveCars() {
  cars.forEach((car) => {
    car.move();
  });
}

function checkWinner() {
  let finishers = 0;
  cars.forEach((car) => {
    if (car.x > roadWidth - carWidth - 10) {
      winner = car;
      car.speed = 0;
      car.showText = true;
      finishers++;
    }
  });
  if (finishers == cars.length) {
    isGameOver = true;
  }
}
function update() {
  tick++;
  drawRoad();
  moveCars();
  drawCars();
  drawFPS();
  checkWinner();
  requestAnimationFrame(update);
}

function setup() {
  isGameOver = false;
  resetCars();
  drawRoad();
  drawCars();
  resetCars();
}

function setCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  roadWidth = canvas.width;
  roadHeight = canvas.height * (2 / 3);
  lane = roadHeight / cars.length;
}

function start() {
  setCanvas();
  setup();
  update();
}

start();

setInterval(() => {
  fps = tick;
  tick = 0;
}, 1000);
