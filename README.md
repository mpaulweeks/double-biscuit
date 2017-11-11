# double-biscuit
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
