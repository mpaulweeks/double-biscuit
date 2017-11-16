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

## 2017-11-16 phone todo
- Brain.Onboardchange -> run callbacks to message opponents
- Second GameAI class that sets up many AI board, sets up callbacks to attack each other
- Primary GameBoard sets up callbacks to use sockets
- RemoveRows returns num, tick can use it to send attack events
- Brain.getTotalPendingAttacks
- For oppogrid, export list of non-null blocks
- Add serialize/deserialize to Block to row, col, id
- Look up color by BlockId, which is linked to the Tetro.name()
- Implement reverse by rotating 3 times before checking collision
- Custom keys with inputs that equal your keypress, add lookup layer to map key code to action
- Put actions and block name/Id/color in constants.js
- Test oppDisplay and serialize by mirroring solo screen
