# 02 Building and Running a Docker Image

## Create your Dockerfile

Create a `Dockerfile`. This is where you will add commands that will assemble the image.

This image should run a basic [Express](https://expressjs.com/) server that prints "Hello world" when a user visits [http://localhost:3000](http://localhost:3000)

## Defining the Dockerfile

Create a `Dockerfile` in the root of your project.

First, well define the image we'd like to use as our base.

Express is a Node Application, so we'll use a current version of Node.

```
FROM node:12
```

Now we'll define a working directory where we'll place our files.

```
WORKDIR /usr/src/app
```

Next, we'll add our dependencies.

```
COPY package.json .

RUN npm i
```

Now we can add our Express Application.

```
COPY app.js
```

Our app should run on port `:3000` so we'll need to expose that to the host machine.

```
EXPOSE 3000
```

And now we can run our app.

```
CMD ["node", "app.js"]
```

## Building your Image

To build the image, you'll use the image build command:

```
docker image build . --tag express:0.1
```

To run the container, you'll use the container run command:

```
docker container run --publish 3000:3000 --detach --name my-express express:0.1
```

`--publish` exposes the port to the host, `--detach` runs the container in the background, and `--name` provides a name to your container.

If you don't see what you expect, check the Docker Desktop log. More than likely it'll provide a clue to what went wrong.

## Stoping the container

First, we'll need the containers id

To get a list of all the currently running containers, run:

```
docker ps
```

You should see something like the following:

```
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
6f73b4306d27        express:0.1         "docker-entrypoint.s…"   33 seconds ago      Up 32 seconds       0.0.0.0:3000->3000/tcp   my-express
```

Copy the container id and now run the stop command

```
docker stop { YOUR CONTAINER ID }
```

Alternatively, you may also do this through the Docker Desktop Application.
