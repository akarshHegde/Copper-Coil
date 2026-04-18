# Copper Coil

Copper Coil is a browser-based Snake implementation built with plain HTML, CSS, and JavaScript.

The project is intentionally small, but it is structured to demonstrate habits that matter in production code: isolated domain logic, deterministic testing for the core rules, clear deployment mechanics, and documentation that explains why the code is shaped the way it is.

## Why this project exists

I used this project to show that even a lightweight interactive application can communicate engineering judgment well when it has:

- clear module boundaries
- behavior-focused tests
- explicit architectural tradeoffs
- a simple, low-friction deployment path

For staff-level roles, I want public repositories to show not just that the code works, but that the system is easy to understand, evolve, and operate.

## What it demonstrates

- A small state machine for game progression and user input
- Separation between pure game logic and DOM rendering concerns
- Deterministic tests over the game engine with Node's built-in test runner
- Zero-build static deployment through GitHub Pages
- Lightweight documentation of architecture and design decisions

## Architecture

The implementation is split into two primary layers:

- [`src/game.js`](./src/game.js): pure game rules, state transitions, collision handling, scoring, and food placement
- [`src/main.js`](./src/main.js): browser event wiring, rendering, button handling, and interval-driven game ticks

Supporting documentation:

- [Architecture overview](./docs/architecture.md)
- [ADR: Browser-only runtime](./docs/adr/001-browser-only-runtime.md)

## Testing

The core game engine is covered with behavior-focused tests in [`src/game.test.js`](./src/game.test.js).

Run the test suite with:

```bash
npm test
```

The tests validate:

- initial game state construction
- prevention of reverse-direction moves
- score and snake growth after eating food
- wall-collision game-over behavior

## Run locally

From the repository root:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy

The repository includes a GitHub Pages workflow at [`.github/workflows/deploy-pages.yml`](./.github/workflows/deploy-pages.yml).

The site is deployed from the `main` branch using GitHub Actions. After enabling Pages to use GitHub Actions, each push to `main` will publish the current static site.

## Tradeoffs and limitations

- The project intentionally avoids a framework or build pipeline to keep runtime and delivery complexity low.
- Rendering is DOM-based rather than canvas-based because clarity and maintainability mattered more than maximal graphical flexibility for this scope.
- The game loop is timer-driven and single-player only; it is not designed for persistence, telemetry, or extensibility beyond local browser play.

## What I owned

I built and organized the project end to end:

- interaction model and game mechanics
- DOM rendering structure and responsive layout
- deployment workflow for GitHub Pages
- test coverage for the game engine
- architecture and decision documentation

## Repository status

This is an actively curated portfolio project and one of the repositories I use to represent current engineering standards on my GitHub profile.
