# Copper Coil

A minimal classic Snake game built with plain HTML, CSS, and JavaScript.

## Run locally

```bash
cd "/Users/akarshhegde/Documents/New project"
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Deploy with GitHub Pages

This repo is set up to deploy as a static GitHub Pages site from the `main` branch using the workflow in [.github/workflows/deploy-pages.yml](/Users/akarshhegde/Documents/New%20project/.github/workflows/deploy-pages.yml).

After you push the repo to GitHub:

1. Open the repository on GitHub.
2. Go to `Settings` -> `Pages`.
3. Under `Build and deployment`, set `Source` to `GitHub Actions`.
4. Push to `main` or rerun the `Deploy GitHub Pages` workflow.

Your game will then be available at:

`https://<your-github-username>.github.io/<repository-name>/`

## Controls

- Arrow keys or `WASD` to steer
- `Space` to pause or resume
- `Restart` to reset the game
