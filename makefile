start:
	cd tetris-app && yarn start

test:
	cd tetris-app && yarn test

deploy:
	cd tetris-app && yarn deploy

websocket:
	cd go/src/double-biscuit/ws && make run

websocket-bg:
	nohup make websocket > /dev/null &
