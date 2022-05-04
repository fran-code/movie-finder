# movie-finder
Film search engine using the ombd api. Search for any film by entering its title. By clicking on the results, you will be able to see more information about the film. It is possible to mark the film as a favourite using the button provided.

The project can be started individually in each of its parts (with "npm start command") or with the Docker Compose that is already configured, to do this from the path from which it is found, we must run the command "docker-compose up -d --build" and this starts the project on ports 3000 (front), 4004 (http and socket api) and 27017 (mongo) in detached mode, so these ports must be free.

# TEST
To run the unit tests, the command "npm run test" must be executed. To run the end to end tests with cypress you must run the command "npm run cy:open" which opens the cypress console to run the tests against the project on localhost:3000.
