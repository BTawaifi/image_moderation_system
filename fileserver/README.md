# Moderation App File Server

Serves Images and Stores Them

> interacting directly with it is not recommended

## Using Docker

### Standalone setup without Docker-Compose

1. Edit the Dockerfile to specify the enviromental variables
2. Build the image

```bash
    docker build --tag moderation_fileserver .
```

3. Create a container from the image

```bash
    docker run -p 8080:8080 moderation_fileserver
```

## Enviromental Variables

> Different depending on your database configuration

```
FILESERVER_DOCKER_PORT=8080
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

### Store New Image

```bash
curl --location --request POST 'http://localhost:8080/report' \
--data-raw '{
    "userId": 1,
    "imageUrl": "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "callbackUrl": "https://images.pexels.com"
}'
```


### Get One Image

```bash
curl --location -g --request GET 'http://localhost:8080/images/{{imageLocation}}' \
--data-raw ''
```
