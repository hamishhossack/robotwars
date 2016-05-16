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

Start server:
```sh
# set DEBUG env variable to get debug logs
DEBUG=robotwars:* npm start
# OR
# requires gulp to be installed globally
npm i -g gulp
gulp serve
```

Execute tests:
```sh
# compile with babel and run tests
npm test (or gulp mocha)

# use --code-coverage-reporter text to get code coverage for each file
gulp mocha --code-coverage-reporter text
```
