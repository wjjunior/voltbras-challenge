#!/usr/bin/env bash

echo "Options: ["
echo "    1 - build"
echo "    2 - start containers"
echo "    3 - stop containers"
echo "    4 - restart containers"
echo "    5 - rebuild"
echo "    6 - destroy"
echo "]"
read -p "Select an option: " option

configure_app() {
    docker-compose exec voltbras-challenge-app npx prisma migrate save --experimental --name "init"
    docker-compose exec voltbras-challenge-app npx prisma migrate up --experimental
}

if [[ option -eq 1 ]]; then
    docker-compose up --detach --build

    configure_app
fi

if [[ option -eq 2 ]]; then
    docker-compose start
fi

if [[ option -eq 3 ]]; then
    docker-compose stop
fi

if [[ option -eq 4 ]]; then
    docker-compose restart
fi

if [[ option -eq 5 ]]; then
    docker-compose down
    docker-compose up --detach --build

    configure_app
fi

if [[ option -eq 6 ]]; then
    docker-compose down
fi