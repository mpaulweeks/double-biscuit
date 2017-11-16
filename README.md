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
- Improve key repeating
- Add iOS controls
- Add SCSS and base everything off block size (currently 30 grid, 15 upcoming)
- Move to middle on edge rotate
- Add swap piece
- Add music
