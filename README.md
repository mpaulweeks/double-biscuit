# double-biscuit

[![CircleCI](https://circleci.com/gh/mpaulweeks/double-biscuit/tree/master.svg?style=svg)](https://circleci.com/gh/mpaulweeks/double-biscuit/tree/master)

Online Attack Tetris w/ Websockets

## Plan

### FE
- Javascript with React
- Engine that runs game logic
- Watcher that delegates websocket events to Engine
- Display that reads Watcher/Engine for game state info and displays
  - Responsible for animations?

### BE
- Possibly Golang?
- Webserver to deliver static files
- Workers for running websockets among players

## todo
- Move display logic out of Brain
- Add collision check to new block spawn
