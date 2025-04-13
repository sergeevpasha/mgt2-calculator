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
DOCKER_NODEJS_PORT=3000

# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here
```

## 🐳 Docker Development

The project includes Docker configuration for containerized development. To use it:

1. Build and start the containers:
```bash
docker compose up -d
```

2. To stop the containers:
```bash
docker compose down
```

3. To enter container:
```bash
docker compose exec -it mgt2calculator bash
```

4. Install dependencies in the container:
```bash
yarn install
```

5. Start dev server in the container:
```bash
yarn dev
```

## 🔧 Using Makefile

The project includes a Makefile for common development tasks:

```bash
# Start development environment
make dev

# Build the application
make build

# Run tests
make test

# Clean build artifacts
make clean

# Install dependencies
make install
```