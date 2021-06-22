# Project Catwalk

The Hack Reactor front end capstone project to create a client-facing retail web portal using React.


## Installation
````
git clone https://github.com/hr-rfe1-dagobah/fe-capstone
cd fe-capstone
npm install
````

Within the /server directory, copy the contents of config.example.js into a new file config.js. Replace the token with a valid Github token

## Development Work
To view the site in the browser you will need to transpile with Babel and start the Express proxy server.

Transpile (and automatically re-transpile on file changes):
````
npm run build
````

Start the server:
````
npm start
````

## Testing
This project tests using Jest for both the server and the front end. The frond end also makes use of React Testing Library and MSW (Mock Service Workers). The use of MSW means that test API calls do not need the Express server running.

To test the server:
````
npm run test-server
````

To test the frontend:
````
npm test
````
