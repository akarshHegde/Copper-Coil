export const DIRECTIONS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

export const DEFAULT_CONFIG = {
  width: 16,
  height: 16,
};

export function createInitialState(config = DEFAULT_CONFIG, rng = Math.random) {
  const startX = Math.floor(config.width / 2);
  const startY = Math.floor(config.height / 2);
  const snake = [
    { x: startX, y: startY },
    { x: startX - 1, y: startY },
    { x: startX - 2, y: startY },
  ];

  return {
    snake,
    direction: "right",
    nextDirection: "right",
    food: placeFood(config, snake, rng),
    score: 0,
    status: "running",
  };
}

export function setDirection(state, nextDirection) {
  if (!DIRECTIONS[nextDirection]) {
    return state;
  }

  const current = DIRECTIONS[state.nextDirection ?? state.direction];
  const next = DIRECTIONS[nextDirection];
  const isReverse = current.x + next.x === 0 && current.y + next.y === 0;

  if (isReverse && state.snake.length > 1) {
    return state;
  }

  if (nextDirection === state.direction) {
    return state;
  }

  return {
    ...state,
    nextDirection,
  };
}

export function togglePause(state) {
  if (state.status === "game-over" || state.status === "won") {
    return state;
  }

  return {
    ...state,
    status: state.status === "paused" ? "running" : "paused",
  };
}

export function stepGame(state, config = DEFAULT_CONFIG, rng = Math.random) {
  if (state.status !== "running") {
    return state;
  }

  const moveDirection = state.nextDirection ?? state.direction;
  const direction = DIRECTIONS[moveDirection];
  const nextHead = {
    x: state.snake[0].x + direction.x,
    y: state.snake[0].y + direction.y,
  };

  if (isOutsideBoard(nextHead, config)) {
    return {
      ...state,
      direction: moveDirection,
      nextDirection: moveDirection,
      status: "game-over",
    };
  }

  const willEat = arePointsEqual(nextHead, state.food);
  const collisionBody = willEat ? state.snake : state.snake.slice(0, -1);

  if (collisionBody.some((segment) => arePointsEqual(segment, nextHead))) {
    return {
      ...state,
      direction: moveDirection,
      nextDirection: moveDirection,
      status: "game-over",
    };
  }

  const nextSnake = willEat
    ? [nextHead, ...state.snake]
    : [nextHead, ...state.snake.slice(0, -1)];

  if (nextSnake.length === config.width * config.height) {
    return {
      ...state,
      snake: nextSnake,
      direction: moveDirection,
      nextDirection: moveDirection,
      score: state.score + 1,
      food: null,
      status: "won",
    };
  }

  return {
    ...state,
    snake: nextSnake,
    direction: moveDirection,
    nextDirection: moveDirection,
    score: willEat ? state.score + 1 : state.score,
    food: willEat ? placeFood(config, nextSnake, rng) : state.food,
  };
}

export function placeFood(config, snake, rng = Math.random) {
  const openCells = [];

  for (let y = 0; y < config.height; y += 1) {
    for (let x = 0; x < config.width; x += 1) {
      const occupied = snake.some((segment) => segment.x === x && segment.y === y);

      if (!occupied) {
        openCells.push({ x, y });
      }
    }
  }

  if (openCells.length === 0) {
    return null;
  }

  const index = Math.floor(rng() * openCells.length);
  return openCells[index];
}

export function arePointsEqual(a, b) {
  return Boolean(a) && Boolean(b) && a.x === b.x && a.y === b.y;
}

function isOutsideBoard(point, config) {
  return (
    point.x < 0 ||
    point.y < 0 ||
    point.x >= config.width ||
    point.y >= config.height
  );
}
