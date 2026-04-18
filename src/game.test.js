import assert from "node:assert/strict";
import test from "node:test";

import {
  createInitialState,
  setDirection,
  stepGame,
  togglePause,
} from "./game.js";

test("createInitialState builds a centered snake with score and food", () => {
  const state = createInitialState(undefined, () => 0);

  assert.deepEqual(state.snake, [
    { x: 8, y: 8 },
    { x: 7, y: 8 },
    { x: 6, y: 8 },
  ]);
  assert.equal(state.direction, "right");
  assert.equal(state.nextDirection, "right");
  assert.equal(state.score, 0);
  assert.equal(state.status, "running");
  assert.deepEqual(state.food, { x: 0, y: 0 });
});

test("setDirection rejects reversing into the snake body", () => {
  const state = createInitialState();
  const nextState = setDirection(state, "left");

  assert.equal(nextState, state);
});

test("togglePause switches between running and paused states", () => {
  const state = createInitialState();
  const paused = togglePause(state);
  const resumed = togglePause(paused);

  assert.equal(paused.status, "paused");
  assert.equal(resumed.status, "running");
});

test("stepGame grows the snake and increments score after eating food", () => {
  const state = {
    snake: [
      { x: 2, y: 2 },
      { x: 1, y: 2 },
      { x: 0, y: 2 },
    ],
    direction: "right",
    nextDirection: "right",
    food: { x: 3, y: 2 },
    score: 0,
    status: "running",
  };

  const nextState = stepGame(state, undefined, () => 0);

  assert.equal(nextState.score, 1);
  assert.equal(nextState.snake.length, 4);
  assert.deepEqual(nextState.snake[0], { x: 3, y: 2 });
  assert.notDeepEqual(nextState.food, { x: 3, y: 2 });
});

test("stepGame returns game-over when the snake hits a wall", () => {
  const state = {
    snake: [{ x: 15, y: 0 }],
    direction: "right",
    nextDirection: "right",
    food: { x: 5, y: 5 },
    score: 0,
    status: "running",
  };

  const nextState = stepGame(state);

  assert.equal(nextState.status, "game-over");
});
