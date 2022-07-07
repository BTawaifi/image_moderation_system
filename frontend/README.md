# Moderation App Frontend

Serves Images and Stores Them

## Using Docker

### Standalone setup without Docker-Compose

1. Edit the Dockerfile to specify the enviromental variables
2. Build the image

```bash
    docker build --tag moderation_frontend .
```

3. Create a container from the image (internal port depends on nginx setup)

```bash
    docker run -p 8000:80 moderation_frontend
```

## Enviromental Variables

> Different depending on your database configuration

```
PORT=8000
GENERATE_SOURCEMAP=false
REACT_APP_FILESERVER_HOST = http://localhost
REACT_APP_FILESERVER_LOCAL_PORT = 8080
REACT_APP_BACKEND_HOST = http://localhost
REACT_APP_BACKEND_PORT = 3000
```

## Scripts

### For Development

```bash
yarn run dev
```

### For Production

```bash
yarn run build
```

### Serve Static Files

```bash
serve -s build -p 8000
```

or

```bash
yarn run serve
```