# E-Commerce Backend API

> Production-ready MERN e-commerce REST API

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Git & GitHub (Export / Release)](#git--github-export--release)
- [Contributing](#contributing)
- [License & Author](#license--author)

## Project Overview

This repository implements a backend REST API for an e-commerce application. It provides user authentication, product management, cart and wishlist functionality, order processing, coupon support, payment records, and administrative dashboards. The API is documented with Swagger and includes integration tests.

## Features

- JWT-based authentication (register/login, password reset)
- Product CRUD with image upload (Cloudinary)
- Cart & wishlist management
- Order creation and admin order management
- Coupons: creation and apply
- Payment records and verification endpoints
- Role-based access (admin vs user)
- Request rate limiting, security headers, and logging
- Swagger API docs exposed under `/api/docs`

## Tech Stack

- Node.js (CommonJS) and Express
- MongoDB / Mongoose
- Cloudinary for image storage
- Nodemailer for email
- Jest + Supertest for tests
- Swagger (swagger-jsdoc + swagger-ui-express)

## Repository Structure

Top-level folders (important ones):

- `src/` — Application source code
  - `config/` — DB, Cloudinary, mail config
  - `controllers/`, `routes/`, `models/`, `services/`, `middleware/`
  - `docs/swagger.js` — OpenAPI definitions (used by Swagger UI)
- `tests/` — Integration tests and test setup

See the code for more files and details.

## Getting Started

### Prerequisites

- Node.js (16+ recommended)
- MongoDB (hosted or local) or MongoDB connection string
- A Cloudinary account for image uploads (optional for image features)

### Installation

Clone the repo and install dependencies:

```bash
git clone <your-repo-url>
cd E-commrce-Backend
npm install
```

### Environment Variables

Create a `.env` file at the project root and set at least the following variables:

- `PORT` — server port (default: `2000`)
- `NODE_ENV` — `development` | `production` | `test`
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret used to sign JWT tokens
- `JWT_EXPIRE` — token expiration (e.g. `7d`)
- `FRONTEND_URL` — frontend base URL (used for reset links)
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `MAIL_HOST` — SMTP host (for sending emails)
- `MAIL_PORT` — SMTP port
- `MAIL_USER` — SMTP username
- `MAIL_PASS` — SMTP password
- `MAIL_FROM` — default from address for emails
- `DISABLE_EMAIL` — set to `true` to skip sending emails in envs
- `MAX_FILE_SIZE` — max upload size in bytes (optional)
- `CORS_ORIGIN` — comma separated allowed origins
- `JSON_BODY_LIMIT` — JSON body parser size (default `10kb`)
- `URLENCODED_BODY_LIMIT` — urlencoded parser size (default `10kb`)
- `RATE_LIMIT_WINDOW_MS` — rate limit window in ms
- `RATE_LIMIT_MAX` — max requests per window
- `API_BASE_URL` — optional base URL for Swagger servers

Add any other provider keys you use for payments (e.g., Stripe) if you extend payment flows.

## Running the App

Common npm scripts (from `package.json`):

- `npm run start` — start production server (`node src/server.js`)
- `npm run dev` — start dev server with `nodemon` (`nodemon src/server.js`)
- `npm test` — run Jest tests
- `npm run test:watch` — watch tests
- `npm run test:coverage` — run tests with coverage

Example local run (development):

```bash
cp .env.example .env   # or create .env manually
npm run dev
```

The API server exposes Swagger UI at: `/api/docs` (e.g., `http://localhost:2000/api/docs`).

## API Documentation

This project uses Swagger via `src/docs/swagger.js`. Start the server and open `/api/docs` to view and explore endpoints (register, login, products, cart, orders, payments, coupons, dashboard, etc.).

Key endpoints (examples):

- `POST /api/users/register` — register
- `POST /api/users/login` — login (returns JWT)
- `GET /api/products` — list products
- `POST /api/products` — create product (admin, multipart/form-data)
- `POST /api/cart` — add to cart (auth required)
- `POST /api/orders` — place order (auth required)

All authenticated endpoints expect an `Authorization: Bearer <token>` header.

## Testing

Run tests with:

```bash
npm test
```

The repo includes integration tests in the `tests/` folder and uses `mongodb-memory-server` for in-memory testing.

## Git & GitHub Export / Release

If you want to prepare and export this project to GitHub (or create a release):

1. Initialize and add remote (if not already):

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin git@github.com:<your-username>/e-commerce-backend-api.git
git push -u origin main
```

2. Create a release / tag:

```bash
git tag -a v1.0.0 -m "v1.0.0"
git push origin v1.0.0
```

3. To export a zip/tarball from GitHub, use the repository's Releases or `Code` → `Download ZIP`.

4. Add a `README.md` (this file), `.gitignore`, and a clear `LICENSE` before publishing.

5. (Optional) Add CI (GitHub Actions) for tests and linting. A simple workflow can run `npm ci` and `npm test` on PRs.

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Implement and test
4. Open a PR with a clear description and tests

Please run tests locally before opening PRs.

## License & Author

This project is licensed under `ISC` (see `package.json`).

**Author:** Rajendra Bist

---

If you'd like, I can also:

- add a `.env.example` file generated from detected env vars
- create a `LICENSE` file
- add GitHub Actions CI workflow for tests

Tell me which of those you'd like me to add next.
