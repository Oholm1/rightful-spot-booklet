# Rightful Spot — Encryption Dashboard

A Node.js + Fastify web service with:

- 🔐 AES-256-CBC encryption via `/encrypt`
- 📊 Live system thread status at `/status`
- 📄 Static frontend served from `/public`

Originally developed on Glitch. Now portable and deployable anywhere.

## Endpoints

- `GET /` → `index.html`
- `GET /dashboard.html` → dashboard view
- `POST /encrypt` → `{ data, password }` → returns base64-encoded encrypted output
- `GET /status` → returns `{ threads, idleThreads, utilization, queueSize }`

## Local setup

```bash
npm install
node server.js
Update README to reflect encryption service and API layout
