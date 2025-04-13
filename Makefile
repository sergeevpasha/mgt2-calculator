.PHONY: up down build bash start

up:
	@docker compose up -d

down:
	@docker compose down

build:
	@docker compose build --no-cache

bash:
	@docker exec -it mgt2calculator bash

start:
	@docker compose up -d && docker exec -it mgt2calculator bash
