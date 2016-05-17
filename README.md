# Robot Wars

## Getting Started

**Clone the repo:**
```sh
git clone git@github.com:hamishhossack/robotwars.git
cd robotwars
```

**Install dependencies:**
```sh
npm install
```

**Create Database:**
> **NOTE:** Change the IP address to match your mongo instance (Docker or other), please change in server/config/env/{development,production,test}.js

```sh
docker run -d -p 2017:27017 --name mongo mongo
```

**Start server:**
```sh
npm i -g gulp
gulp serve
```

**Execute tests:**
```sh
# compile with babel and run tests
gulp mocha
# use --code-coverage-reporter text to get code coverage for each file
gulp mocha --code-coverage-reporter text
```

## How to play the game

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/7fe888e473c80a2aa7fc)
> The API calls are in order to this section on *How to play the game*, **BEWARE** you need to update `TYPE._id.GOES.HERE` on all requests with the returned.

**Prerequisites**

**init()** Create ROBOT-ONE - `# POST localhost:3000/api/robots/`
```json
{
  "name": "ROBOT-ONE",
  "coordinateX": 1,
  "coordinateY": 2,
  "bearing": "N"
}
```
**.then()** Create ROBOT-TWO - `# POST localhost:3000/api/robots/`
```json
{
  "name": "ROBOT-TWO",
  "coordinateX": 3,
  "coordinateY": 3,
  "bearing": "E"
}
```
**.then()** Create Game with your ROBOT-ONE & ROBOT-TWO - `# POST localhost:3000/api/games/`
```json
{
  "name": "GAME1",
  "boundaryX": 5,
  "boundaryY": 5,
  "robots": ["ROBOT-ONE._id.GOES.HERE", "ROBOT-TWO._id.GOES.HERE"]
}
```
**Commands**

**.then()** Make a move with player ROBOT-ONE - `# POST localhost:3000/api/commands/move`
```json
{
  "gameId": "GAME._id.GOES.HERE",
  "robotId": "ROBOT-ONE._id.GOES.HERE",
  "direction": "LMLMLMLMM"
}
```

**.then()** Make a move with ROBOT-TWO - `# POST localhost:3000/api/commands/move`
```json
{
  "gameId": "GAME._id.GOES.HERE",
  "robotId": "ROBOT-TWO._id.GOES.HERE",
  "direction": "MMRMMRMRRM"
}
```

**.then()** Get ROBOT-ONE - `# GET localhost:3000/api/robots/${ROBOT-ONE._id.GOES.HERE}`

**.then()** Get ROBOT-TWO - `# GET localhost:3000/api/robots/${ROBOT-TWO._id.GOES.HERE}`


## Criteria

A fleet of hand built robots are due to engage in battle for the annual “Robot Wars” competition. Each robot will be placed within a rectangular battle arena and will navigate their way around the arena using a built in computer system.

A robot’s location and heading is represented by a combination of x and y co-ordinates and a letter representing one of the four cardinal compass points. The arena is divided up into a grid to simplify navigation. An example position might be 0, 0, N which means the robot is in the bottom left corner and facing North.

Build an API that the competition organisers can integrate with in order to move and navigate the robot. The only prerequisite is the API should be written in Node JS and responses should be in JSON format. How you take inputs and co-ordinates is entirely up to you.

The possible letters are ‘L’, ‘R’ and ‘M’. ‘L’ and ‘R’ make the robot spin 90 degrees to the left or right respectively without moving from its current spot while ‘M’ means move forward one grid point and maintain the same heading. Assume that the square directly North from (x, y) is (x, y+1).

### Input

The first line of input is the upper-right coordinates of the arena, the lower-left coordinates are assumed to be (0, 0).

The rest of the input is information pertaining to the robots that have been deployed. Each robot has two lines of input - the first gives the robot’s position and the second is a series of instructions telling the robot how to move within the arena.

The position is made up of two integers and a letter separated by spaces, corresponding to the x and y coordinates and the robot’s orientation. Each robot will finish moving sequentially, which means that the second robot won’t start to move until the first one has finished moving.

### Output

The API response should be JSON containing each robots final coordinates and heading.

Acceptance criteria

In order to confirm your API is working correctly, we have provided some test input and output for your use. Implement these details however you consider most appropriate.

### Test Case:

**Inputs:**
Game area boundaries: 5 5

First Player Position: 1 2 N

First Player Move: LMLMLMLMM

Second Player Position: 3 3 E

Second Player Move: MMRMMRMRRM

**Expected output:**

First Player Finish: 1 3 N

Second Player Finish: 5 1 E
