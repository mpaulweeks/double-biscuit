# double-biscuit

[![CircleCI](https://circleci.com/gh/mpaulweeks/double-biscuit/tree/master.svg?style=svg)](https://circleci.com/gh/mpaulweeks/double-biscuit/tree/master)

Online Attack Tetris w/ Websockets

## Info

[Puyo Soundbank](https://puyonexus.com/forum/viewtopic.php?t=211)

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

## 2017-11-28 todo
- name singletons as such, to stand out
- splash screen
  - displays some tetros, drawn by Display
  - option for solo play
  - option for group play
- game screen
  - button to quit back to lobby
  - dynamically make enemy screens?
- matchmaking screen
  - input for name
  - search for game, join game with code, or create game (with private option)
  - if more than one person searching, select 1 as host
  - host has option to start once >1 player

## 2018-01-19 todo
  - Tom Brier Sonic 3 Gumball for bgm
  - Record my own sound effects
  - About page (like EDH calc) that links to YouTube
