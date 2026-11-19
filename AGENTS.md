# AGENTS.md: e2e-test-cicd-be

Project memory for agents working in this repository. Read it before changing anything. Keep it short and true; update it in the same pull request when a fact here changes.

## What this is
- The **backend** of the "E2E Test Project" in Alpha. Its frontend is `e2e-test-cicd-fe`.
- Node.js + TypeScript. Created from an older Alpha starter: there is **no HTTP server yet**. `src/index.ts` only exports `SERVICE_NAME`, and `package.json` has no runtime dependencies.

## Run and check
- `npm install`, `npm run build` (`tsconfig.build.json` to `dist/`), `npm start` runs `dist/index.js`, `npm run dev` uses ts-node.
- Before a pull request: `npm run typecheck`, `npm run lint` (`src` and `tests`), `npm test`.

## When adding the API
- Follow the project's other backends: export an Express `app` from `src/app.ts` (CORS, JSON body, routes) and start it from `src/index.ts` on `PORT` (default 3000), so tests can import `app` with supertest without opening a port.
- Add `GET /health` returning `{ "status": "ok" }`: Render's health check needs it.
- Allowed browser origins come from `CORS_ORIGINS` (comma-separated). `.env.example` lists `http://localhost:3000`, but the Vite frontend runs on `http://localhost:5173`; use that origin.
- All configuration (ports, URLs, origins, secrets) comes from env, never literals.

## Rules
- Unit tests: Jest + ts-jest in `tests/unit/`, mirroring `src/`, ending in `.spec.ts`.
- Work lands on `dev`, then is promoted to `uat` and `main`, by pull request only.
- `.github/workflows/ci.yml` runs tests with coverage, lint and a security scan, and deploys to Render only once the repository has the Render deploy-hook secrets and the variable `ALPHAORCH_DEPLOY=true` (see README). Do not add secrets from an agent.
- This repository is public: never commit secrets or real customer data. Commit `package-lock.json` whenever dependencies change.
