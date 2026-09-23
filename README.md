# Mad Games Tycoon 2 Calculator

A calculator for Mad Games Tycoon 2. Pick a genre and subgenre to see the design slider values, target groups and compatible topics, then get name ideas for your game.

## Features

- Development priority, design focus and design direction values for every genre and subgenre
- Target groups and compatible topics for each genre
- Topic search and random topic picks
- Game name ideas from the OpenAI API
- Shareable links: the selection is kept in the URL

## Getting started

### Prerequisites

- Docker and Docker Compose
- Make (optional, for the Makefile shortcuts)

### Environment setup

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

## Development with Docker

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

## Makefile shortcuts

```bash
make up      # start the container (runs the dev server)
make down    # stop the container
make build   # rebuild the image without cache
make bash    # open a shell in the container
make start   # up + bash
```
