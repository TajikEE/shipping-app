# Shipping app

Simple app to list and add parcels. It can be filtered by country and description (description needs to be at leaast 3 characters) and all parcel entry fields are required. Date is auto filled to current day if not changed.

Note that the boilerplate readmes are present in each directory along with some boilerplate app controller/components so you do not need to spend your time on the cli generated code.

## Run the project

Clone the repo from github, then do the following:

For frontend, run these commands from frontend dir:
```
npm i

npm run start
```

The backend can be run hassle free with docker-compose from backend dir:

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

Make sure that your following ports are free: 3000 for backend and 4200 for frontend.

# Run tests

There are some backend tests which can be run by:
```
npm run test:watch
```
