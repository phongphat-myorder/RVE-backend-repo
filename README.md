# Backend

This repository contains the **backend service** for the RVE workshop application. The backend is built with **Express.js**, **TypeScript**, **MongoDB**, and **Redis**, and is designed to follow the **12-Factor App** principles.

### `.env.example`

An example environment file is provided:

```bash
.env.example
```

Before running the application, create your own `.env` file based on this example:

```bash
cp .env.example .env
```

Then fill in the required values (database URL, Redis configuration, ports, etc.).

> ⚠️ The application validates required environment variables at startup and will **fail fast** if any required configuration is missing.

---

## Install Dependencies

```bash
npm install
```

---

## Running the Backend

### Development Mode

Runs the application using `ts-node-dev` with `auto-reload`:

```bash
npm start
```

Runs the application using `ts-node-dev` with `Not auto-reload`:

```bash
npm run start:dev
```

---

### Production Build

Build the TypeScript source code:

```bash
npm run build
```

Start the production server:

```bash
npm run start:prod
```

---

## Docker Support

This backend service is designed to run inside containers and supports horizontal scaling.

When deployed with Docker Compose or an orchestrator:

- The service runs as a **stateless process**
- MongoDB and Redis are used as backing services
- Graceful shutdown is supported via `SIGTERM` and `SIGINT`

---

## License

ISC License
