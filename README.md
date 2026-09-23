# 🎮 Mad Games Tycoon 2 Calculator

A web application to help players of Mad Games Tycoon 2 calculate optimal game design parameters and generate creative game names.

## ✨ Features

- 🎯 Genre and subgenre selection
- 🎲 Topic selection based on genre compatibility
- 🎪 Random topic generation
- 🤖 Game name generation using AI
- 📊 Detailed genre information display

## 🚀 Getting Started

### Prerequisites

- 🐳 Docker and Docker Compose (for containerized development)
- 🔧 Make (optional, for using Makefile commands)

### 🔐 Environment Setup

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Configure the following environment variables in your `.env` file:
```env
# Docker Configuration
DOCKER_NODEJS_PORT=3023

# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here
```

## 🐳 Docker Development

The Dockerfile's default startup command runs `yarn install --immutable` with `src/` mounted at `/var/www`, then starts the Nuxt dev server (`yarn dev`). Dependencies are installed into `src/node_modules`. After pulling dependency changes or switching branches, restart the container to sync dependencies. Startup fails if installation would require changing `yarn.lock`. Custom commands passed to `docker compose run` replace this default command and skip automatic installation.

1. Build and start the container:
```bash
docker compose up --build -d
```

The app is served at `http://localhost:${DOCKER_NODEJS_PORT}`.

2. Follow the dev server logs:
```bash
docker compose logs -f app
```

3. Open a shell in the container:
```bash
docker compose exec app bash
```

4. Stop the container:
```bash
docker compose down
```

## 🔧 Using Makefile

```bash
make up      # start the container (runs the dev server)
make down    # stop the container
make build   # rebuild the image without cache
make bash    # open a shell in the container
make start   # up + bash
```
