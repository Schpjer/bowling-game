# Bowling Game
This repository consist of three service:
- Calculator service
- Rolls service
- Presenter service

## How to start the project
Run yarn install in the three different services so node_modules mount
Run Docker-compsose up -d from the root of the project

## Test endpoints
After docker compos is up and running you can call the following endpoints:
- (POST) http://localhost:3000/rolls to push an Array of Rounds to redis which the calculator service them consumes and calculates each individual round score.
- (POST) http://localhost:3001/present/score returns string with score repentation of rounds in the body
