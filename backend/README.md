# Moderation App Backend

1. The Backend recieves image report request
2. sends them to the prefilter (as url or multipart/form-data) and recive a report and perform a score calculation 3. communicates with the moderation file server to stores a local clone of the image
4. store the results in mysql database

The Backend also hold the logic for the backoffice (to perform CRUD on the reports, moderation), after the moderation is done the results are sent back using the CallbackUrl and archived

We are using Sight Engine for prefilter please acquire PREFILTER_API_USER and PREFILTER_API_SECRET by signing up at

`` https://sightengine.com/ ``


## Using Docker

### Standalone setup without Docker-Compose

1. Edit the Dockerfile to specify the enviromental variables
2. Build the image

```bash
    docker build --tag moderation_backend .
```

3. Create a container from the image

```bash
    docker run -p 3000:3000 moderation_backend
```


## Database Initialization

You need a mysql installation local or docker (included in a seperate folder) and to initializate the database

> Use the code in ../mysql/create-local-db.sql file to initialize the database


## Enviromental Variables

> Different depending on your database configuration

```
MYSQL_HOST = "localhost"
MYSQL_LOCAL_PORT = "3306"
MYSQL_USERNAME = "root"
MYSQL_PASSWORD = "root"
MYSQL_DATABASE = "moderation_db"

BACKEND_LOCAL_PORT = "3000"
FILESERVER_HOST = "http://localhost"
FILESERVER_LOCAL_PORT = "8080"
PREFILTER_API_USER = 
PREFILTER_API_SECRET = 
```


## Scripts

### For Development

```bash
yarn run dev
```

### For Production

```bash
yarn run build
yarn run start
```


## Requests
### Create New Report

```bash
curl --location --request POST 'http://localhost:3000/report' \
--data-raw '{
    "userId": 1,
    "imageUrl": "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "callbackUrl": "https://images.pexels.com"
}'
```

## Backoffice Requests

### Get All Reports

```bash
curl --location --request GET 'http://localhost:3000/backoffice/report' \
--data-raw ''
```


### Get One Report

```bash
curl --location -g --request GET 'http://localhost:3000/backoffice/report/{{REPORT_ID}}' \
--data-raw ''
```


### Delete Report

```bash
curl --location -g --request DELETE 'http://localhost:3000/backoffice/report/{{REPORT_ID}}' \
--data-raw ''
```


### Moderate And Archive Report

```bash
curl --location -g --request PUT 'http://localhost:3000/backoffice/report/{{REPORT_ID}}' \
--data-raw '{
    "status":"Accepted"
}'
```