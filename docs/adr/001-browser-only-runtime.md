# ADR 001: Keep the runtime browser-only and build-free

## Status

Accepted

## Context

Copper Coil is a small portfolio project intended to show code quality, architecture clarity, and operational simplicity.

A richer toolchain could add conveniences, but it would also increase the amount of infrastructure a reviewer has to parse before understanding the project itself.

## Decision

Keep the application as a browser-only static site with:

- plain HTML for structure
- plain CSS for presentation
- ES modules for behavior
- GitHub Pages for deployment
- Node's built-in test runner for logic verification

## Consequences

### Positive

- Fast to understand and review
- No dependency-install burden for readers who only want to inspect the code
- Minimal deployment and maintenance surface area
- Game logic remains portable and easy to test

### Negative

- No framework-level abstractions for component composition
- Less tooling support for larger-scale UI evolution
- Browser rendering remains manual rather than declarative

## Why this is acceptable here

The goal of this repository is not to maximize framework sophistication.

The goal is to show that even a small project can be engineered with discipline: clear boundaries, explicit tradeoffs, and low operational drag.
