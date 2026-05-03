# Bubbasaur

A custom Wordle-inspired game built for family play and easy self-hosting. This project combines a Kotlin/Spring backend with a Next.js frontend to create a lightweight word game experience that can be played anytime, not just once per day.

## Project Summary

This app is inspired by playing Wordle with family. It provides a flexible way to play multiple word puzzles in a single session, while also being simple enough to host and maintain.

The current workspace contains:

- `api/` — Kotlin + Spring Boot backend for game state, word validation, and API endpoints.
- `web/` — Next.js frontend for the game UI, keyboard, guesses board, and user interactions.

## Tech Stack

- Backend: Kotlin, Spring Boot, Gradle
- Frontend: Next.js, React, TypeScript, Tailwind-style CSS modules
- Deployment target (frontend): AWS S3 + CloudFront
- Deployment target (backend): Elastic Beanstalk tentatively, with EC2 + Docker considered as an alternative

## Architecture

- The frontend is served as a static site or CDN-backed app through AWS S3 + CloudFront.
- The backend provides REST endpoints for game logic and persistence.
- Future operations may use Docker for containerized deployment of the backend if moving from Elastic Beanstalk to EC2.

## Development Notes

- `api/` contains the Kotlin server application and tests.
- `web/` contains the React/Next.js web app and UI components.
- Hosting is expected to separate frontend static delivery from backend application hosting.

## Future Deployment Plans

- Frontend: host on AWS S3 with CloudFront distribution for global caching and fast delivery.
- Backend: start with Elastic Beanstalk for managed application deployment.
- Optional backend path: move to EC2 instances with Docker for more control over environment and scaling.

## Goals

- Build a family-friendly Wordle-style experience.
- Support many rounds of play rather than one daily puzzle.
- Keep deployment simple while allowing future scaling on AWS.
- Expand the platform over time to include additional games, such as a word spelling game and other family-friendly puzzles.
