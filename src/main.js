import {
  DEFAULT_CONFIG,
  createInitialState,
  setDirection,
  stepGame,
  togglePause,
} from "./game.js";

const TICK_MS = 140;
const board = document.querySelector("#board");
const score = document.querySelector("#score");
const status = document.querySelector("#status");
const restartButton = document.querySelector("#restart-button");
const pauseButton = document.querySelector("#pause-button");
const controlButtons = document.querySelectorAll("[data-direction]");

let state = createInitialState(DEFAULT_CONFIG);

function buildBoard() {
  const cells = [];

  for (let index = 0; index < DEFAULT_CONFIG.width * DEFAULT_CONFIG.height; index += 1) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.setAttribute("role", "gridcell");
    board.append(cell);
    cells.push(cell);
  }

  return cells;
}

const cells = buildBoard();

function cellIndex(point) {
  return point.y * DEFAULT_CONFIG.width + point.x;
}

function render() {
  for (const cell of cells) {
    cell.className = "cell";
  }

  state.snake.forEach((segment, index) => {
    const className = index === 0 ? "cell cell--snake cell--head" : "cell cell--snake";
    cells[cellIndex(segment)].className = className;
  });

  if (state.food) {
    cells[cellIndex(state.food)].className = "cell cell--food";
  }

  score.textContent = String(state.score);
  status.textContent = getStatusText(state.status);
  pauseButton.textContent = state.status === "paused" ? "Resume" : "Pause";
}

function getStatusText(gameStatus) {
  switch (gameStatus) {
    case "paused":
      return "Game paused. Press pause again or hit space to continue.";
    case "game-over":
      return "Game over. Restart to try again.";
    case "won":
      return "You filled the whole board. Restart to play again.";
    default:
      return "Use arrow keys or WASD to steer. Avoid the walls and yourself.";
  }
}

function restart() {
  state = createInitialState(DEFAULT_CONFIG);
  render();
}

function handleDirectionChange(nextDirection) {
  state = setDirection(state, nextDirection);
  render();
}

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  const directionMap = {
    arrowup: "up",
    w: "up",
    arrowdown: "down",
    s: "down",
    arrowleft: "left",
    a: "left",
    arrowright: "right",
    d: "right",
  };

  if (key === " ") {
    event.preventDefault();
    state = togglePause(state);
    render();
    return;
  }

  const nextDirection = directionMap[key];

  if (!nextDirection) {
    return;
  }

  event.preventDefault();
  handleDirectionChange(nextDirection);
});

restartButton.addEventListener("click", restart);
pauseButton.addEventListener("click", () => {
  state = togglePause(state);
  render();
});

controlButtons.forEach((button) => {
  button.addEventListener("click", () => {
    handleDirectionChange(button.dataset.direction);
  });
});

window.setInterval(() => {
  state = stepGame(state, DEFAULT_CONFIG);
  render();
}, TICK_MS);

render();
