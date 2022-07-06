# Moderation Database

Basic mysql setup including schema and table auto creation script

## Enviromental Variables

> Different depending on your database configuration

```
MYSQL_HOST = mysqldb
MYSQL_USERNAME = root
MYSQL_PASSWORD = root
MYSQL_ROOT_PASSWORD = root
MYSQL_DATABASE = moderation_db
MYSQL_LOCAL_PORT = 3306
MYSQL_DOCKER_PORT = 3306
```

## Docker-Compose

```bash
docker-compose up
```

> If for some reason the previous command didn't work, go inside each folder and run the commands in README file (then run this command again)


## MYSQL Database

### Standalone setup without Docker-Compose

1. Edit the Dockerfile to specify the enviromental variables
2. Build the image

```bash
    docker build --tag moderation_mysqldb .
```

3. Create a container from the image

```bash
    docker run -p 3306:3306 moderation_mysqldb
```
