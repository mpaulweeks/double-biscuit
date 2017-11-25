# double-biscuit

[![CircleCI](https://circleci.com/gh/mpaulweeks/double-biscuit/tree/master.svg?style=svg)](https://circleci.com/gh/mpaulweeks/double-biscuit/tree/master)

Online Attack Tetris w/ Websockets

## Info

```
netstat -tulpn
```

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
- Figure out consistent shifting/beginning offset
- Add SCSS and base everything off block size (currently 30 grid, 15 upcoming)
- Move to middle on edge rotate
- height: 92%, need better method

## 2017-11-16 phone todo
- Second GameAI class that sets up many AI board, sets up callbacks to attack each other
- For oppogrid, purely manage with serialize/deserialize
- Implement reverse by rotating 3 times before checking collision
- Custom keys with inputs that equal your keypress, add lookup layer to map key code to action
- Put actions in constants.js, cleanup action names, include user ID in event
- Alternate animation
  - Draw over with white rectangle with increasing alpha
  - then draw gradient to wipe off screen
  - hold on black for a few frames to make it look like dropping

## 2017-11-24 phone todo
- Add destructor to Game.js
- Add purge() to InputListener
- Use CSS to rotate next/swap on mobile
- Fix bug with extra space on side of grid
