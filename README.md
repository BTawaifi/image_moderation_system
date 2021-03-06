# Moderation App

An application for moderating incoming image reports and sending the moderation result to a system using a callback Url


## Technologies Used Include

- [React](https://reactjs.org/)
- [TypeScript](https://typescriptlang.org)
- [TypeORM](https://typeorm.io/)
- [NodeJs](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)

> There are different README.md files inside each folder for standalone usage, including HTTP requests

> NOTE: Moderation Will fail if the callback URL doesn't recieve a Requst (ACID transaction rollback)

## Enviromental Variables

You can place the environment variables directly inside docker-compose.yml or using .env file

Create a *.env* file at project root with the following variables

> Get PREFILTER_API_* variables by signing up in https://sightengine.com/

```
MYSQL_HOST = mysqldb
MYSQL_USERNAME = root
MYSQL_PASSWORD = root
MYSQL_ROOT_PASSWORD = root
MYSQL_DATABASE = moderation_db
MYSQL_LOCAL_PORT = 3306
MYSQL_DOCKER_PORT = 3306

BACKEND_LOCAL_PORT = 3000
BACKEND_DOCKER_PORT = 3000
PREFILTER_API_USER = 
PREFILTER_API_SECRET = 
FILESERVER_HOST = http://fileserver

REACT_APP_FILESERVER_HOST = http://fileserver
REACT_APP_FILESERVER_LOCAL_PORT = 8080
REACT_APP_BACKEND_HOST = http://backend
REACT_APP_BACKEND_PORT = 3000

FILESERVER_LOCAL_PORT = 8080
FILESERVER_DOCKER_PORT = 8080

FRONTEND_LOCAL_PORT = 8000
FRONTEND_DOCKER_PORT = 80
PORT = 80
GENERATE_SOURCEMAP = false
```

# Usage
## Docker-Compose

```bash
docker-compose up
```

> If for some reason the previous command didn't work, go inside each folder and run the commands in README file (then run this command again)

> Frontend is available at http://localhost:8000/


## Requests

### Simulate Reciving New Image Report

```bash
POST http://localhost:3000/report

BODY {
    "userId": 1,
    "imageUrl": "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "callbackUrl": "https://images.pexels.com"
}
```

<p align="center">Made by BTawaifi</p>