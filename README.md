# Shipping app

Simple app to list and add parcels. It can be filtered by country and description (description needs to be at leaast 3 characters) and all parcel entry fields are required. Date is auto filled to current day.

# Run with docker

Project can be run hassle free with docker-compose.

Clone the repo from github, then do the following:

1. create an .env file from .env.example 
2. 
```
npm i 
```

3. 
```
docker-compose build

docker-compose up
```

Note that your port 3000 should be free because docker will expose that to the outside world.

# Run tests

There are some backend tests which can be run by:
```
npm run test:watch
```
