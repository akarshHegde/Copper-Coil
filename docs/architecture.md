# Architecture Overview

## Summary

Copper Coil is intentionally built as a small static application with a clean separation between domain rules and browser integration.

The main architectural goal is to keep the game engine testable without a DOM, while keeping the rendering layer simple enough to inspect in a single sitting.

## Components

### `src/game.js`

This module contains the game domain logic:

- default board configuration
- initial state creation
- direction changes
- pause and resume transitions
- snake movement
- collision detection
- food placement

The functions in this module are designed to be pure or near-pure and are the primary unit-test target.

### `src/main.js`

This module owns browser-specific concerns:

- DOM lookup and board construction
- rendering state into cells and status labels
- keyboard and button event handling
- fixed-interval game loop execution

This split keeps the behavior layer easy to test and the UI layer easy to reason about.

### Static assets

- `index.html` provides semantic structure for the page
- `styles.css` provides layout, visual treatment, and responsive adjustments
- `.github/workflows/deploy-pages.yml` publishes the repository as a GitHub Pages site

## Data flow

1. `createInitialState()` creates the starting state.
2. `main.js` renders that state into the DOM.
3. User input updates direction or pause state.
4. The interval loop calls `stepGame()`.
5. The returned state becomes the new source of truth.
6. The UI is fully rerendered from state.

## Why this shape

This architecture intentionally favors clarity over abstraction depth.

- No framework is required to understand the rendering path.
- The game engine stays independent of browser APIs.
- Testing focuses on rules rather than UI snapshots.
- Deployment remains a static-hosting problem instead of an application-runtime problem.

## Operational model

The project is deployed as a static site using GitHub Pages.

That means:

- no server process
- no runtime dependencies in production
- no build step required before deploy
- low maintenance overhead for a portfolio repository
