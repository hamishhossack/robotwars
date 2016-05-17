# Robot Wars

## Getting Started

Clone the repo:
```sh
git clone git@github.com:hamishhossack/robotwars.git
cd robotwars
```

Install dependencies:
```sh
npm install
```

Create Database
```sh
docker run -d -p 2017:27017 --name mongo mongo
```
> NOTE: Change the IP address to match your mongo instance (Docker or other), please change in server/config/env/{development,production,test}.js

Start server in Docker:
```sh
docker build -t robotwars .
docker run -d -p 3000:3000 --name robotwars robotwars
```

Execute tests:
```sh
# compile with babel and run tests
npm test (or gulp mocha)

# use --code-coverage-reporter text to get code coverage for each file
gulp mocha --code-coverage-reporter text
```

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

### Test input:

5 5

1 2 N

LMLMLMLMM

3 3 E

MMRMMRMRRM

Expected output:

1 3 N

5 1 E
