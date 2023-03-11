start:
	docker-compose up -d

start-dev:
	docker-compose -f docker-compose.dev.yml up -d --force-recreate --build

stop:
	docker-compose down

stop-dev:
	docker-compose -f docker-compose.dev.yml down

logs:
	docker-compose logs -f

logs-dev:
	docker-compose -f docker-compose.dev.yml logs -f

restart:
	docker-compose restart

restart-dev:
	docker-compose -f docker-compose.dev.yml restart

inspect-dev:
	docker exec -it rest-api-dev sh