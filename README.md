## Installation

1. Install [node.js](https://nodejs.org/en/download/).
2. Install [npm](https://docs.npmjs.com/cli/install).
3. Run `npm install` from the command line (from the source code directory, where `package.json` is located).
4. Install [WebStorm](https://www.jetbrains.com/webstorm/download/).



# BackEnd
BackEnd application for meeba
The IDE of choice is [WebStorm](https://www.jetbrains.com/webstorm/).

## Development
1. Run `gulp develop` from the command line (from the source code directory).

# FrontEnd
FrontEnd application for meeba
The FrontEnd app is based on [react-slingshot boilerplate](https://github.com/coryhouse/react-slingshot).

## Development
1. **Run dev environment**: `npm start` - startup scripts will be started and the app will be served on locahost:3000 by default
2. **Run FrontEnd tests**: `npm run test-fe` - will run jest tests

## Production
3. **Build production bundle**: `npm run build` - a bundle will be created under /dist
