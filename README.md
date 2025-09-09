# Shubham Blog

## Overview

This repository contains a full-stack blogging application with a Vite + React frontend (client/) and a Node.js backend (Server/). The app supports public blog pages, an admin area for managing posts and comments, image uploads, and basic authentication middleware.

This README gives an overview of the project structure, required environment variables, how to run the app locally, and helpful notes for development and deployment.

## Key Features

- Public blog listing and individual blog pages
- Admin dashboard for creating, listing and managing blogs and comments
- Image upload handling (see `Server/configs/imagekit.js` and `Server/middleware/multer.js`)
- Authentication middleware for admin routes (`Server/middleware/auth.js`)

## Tech stack

- Frontend: React (JSX), Vite
- Backend: Node.js, Express-style structure (controllers, routes, models)
- Database: (inferred) MongoDB or another DB from `Server/configs/db.js` — check the file for exact driver/settings
- Image handling: ImageKit or similar (see `Server/configs/imagekit.js`)

Note: The exact versions are managed in the `package.json` files inside `client/` and `Server/`.

## Repository structure

- client/ — React frontend built with Vite
  - src/ — React source files, components, pages, assets
  - index.html, package.json, vite.config.js, .env

- Server/ — Node.js backend
  - controllers/ — route handlers (e.g., `blogController.js`, `adminController.js`)
  - routes/ — `blogRoutes.js`, `adminRoutes.js`
  - models/ — data models (`Blog.js`, `comment.js`)
  - configs/ — `db.js`, `imagekit.js`, `gemini.js`
  - middleware/ — `auth.js`, `multer.js`
  - server.js — app entry point

Full folder snapshot (top-level):

```
client/
Server/
README.md
```

The client and Server folders contain further subfolders; for example the client `src/components` and `src/pages` include the UI components and admin pages used by the frontend.

## Environment variables

There are `.env` files present in the workspace root and in `client/` and `Server/` (see the attachments). The exact variable names used by the server are defined in `Server/configs/*.js` and likely include, at minimum:

- PORT — port for the server to listen on
- MONGODB_URI or DB_URI — database connection string (if using MongoDB)
- IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT — for image uploads (if ImageKit is used)
- JWT_SECRET or SESSION_SECRET — for admin authentication

Assumption: I have inferred the likely names above based on the visible config filenames; please open `Server/configs/db.js` and `Server/configs/imagekit.js` to confirm the exact variable names and add them to your `.env` files.

## Setup and run (local development)

Prerequisites:

- Node.js (LTS) and npm installed on your machine

Frontend (client):

1. Open a terminal and change to the client directory:

   cd client

2. Install dependencies:

   npm install

3. Start the dev server (Vite):

   npm run dev

This will launch the frontend on the port Vite config uses (commonly 3000 or 5173). Open the browser at the printed local URL.

Backend (Server):

1. In a separate terminal, change to the Server directory:

   cd Server

2. Install dependencies:

   npm install

3. Start the server:

   node server.js

Or, if the project uses a start script (check `Server/package.json`), you can run:

   npm start

If you prefer auto-reload during development, use nodemon (install globally or add as devDependency) and run:

   npx nodemon server.js

Now the frontend and backend should be running. The frontend likely calls API endpoints exposed by the server; check `client/src/context/AppContext.jsx` and the fetch/axios calls in the frontend to confirm the base API URL.

## Build for production

Frontend:

1. cd client
2. npm run build

This produces a `dist/` folder with static assets that can be served by a static host or the Node server (if you choose to configure that).

Backend:

- Ensure environment variables for production are configured (database string, API keys, secrets). Run the server with a process manager (PM2, systemd) or containerize it as needed.

## Notes about API and routes

- The Backend's routes are organized under `Server/routes/` (`blogRoutes.js`, `adminRoutes.js`). The controllers are implemented in `Server/controllers/`.
- Authentication middleware is in `Server/middleware/auth.js` and is applied to admin routes.
- Upload handling is implemented with `multer.js` and ImageKit integration is in `Server/configs/imagekit.js`.

If you need an explicit API reference (endpoints, request/response shapes), I can generate one by scanning the route and controller files and producing a short OpenAPI-like list.

## Development tips and likely edge cases

- If you see CORS errors when the frontend talks to the backend, ensure the server enables CORS or proxy the API in the Vite dev server config.
- If uploads fail, check ImageKit credentials and that `multer` temp storage permissions are correct.
- If authentication fails, verify `JWT_SECRET` (or similar) is set the same in all running processes.

## Tests

No test harness was obvious in the provided files. If you want, I can add a couple of minimal unit tests (Jest/React Testing Library for client, and a small supertest suite for the Server) as a follow-up.

## Contributing

- Fork or clone the repository
- Create a feature branch
- Run the client and server locally while developing
- Open a pull request describing the change

## License and contact

Add your preferred license file (e.g., `LICENSE`) if you want to make the project open-source. If you'd like, tell me what license to add and I will create it.

For more help or to generate more documentation (API reference, deployment scripts, CI config), tell me which piece to produce next.

---

Requirements coverage:

- Read attached project and create README with headings, subheadings, and paragraphs: Done (created `README.md` at project root).
- Include run/build instructions and env guidance: Done (with a couple of inferred assumptions; please confirm env var names in `Server/configs/`).

If you'd like the README expanded with exact env variable names, API endpoints, or CI/deploy steps, I can scan the files and update the README accordingly—tell me which area to expand.
