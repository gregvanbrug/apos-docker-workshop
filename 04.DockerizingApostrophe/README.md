# 04 Dockerizing Apostrophe

## Requirements

Apostrophe needs a couple things to run, Node and MongoDB. We'll also want to be able to persist data when the site is started and persist images users upload.

We'll use the `docker-compose` command to create the network and each of our containers.

# Apostrophe Image

First let's create our Apostrophe Image.

Make a new `Dockerfile` in the root of your project.

Open that file and define the base image and working directory.

```
FROM node:12

WORKDIR /app
```

Next, let's install our dependencies:

```
COPY package.json .

RUN npm i
```

Now, we'll add our files.

```
COPY lib lib
COPY scripts/wait-for-it.sh scripts/wait-for-it.sh
COPY views views
COPY app.js .
```

And lastly, we'll start Apostrophe.

```
CMD [ "./scripts/wait-for-it.sh", "mongo:27017", "--", "node", "app.js" ]
```

NOTE: Here we're using a utility script `wait-for-it.sh` to tell Apostrophe to wait to start until Mongo is available on port `27017`. More on that [here](https://docs.docker.com/compose/startup-order/)

# Compose-ing our Network

Now we'll define our network.

Create a `docker-compose.yml` file in your project root.

First, define the version of compose we'll use and some generic services

```
version: "3"

services:
  apostrophe:
    container_name: apostrophe
  mongo:
    container_name: mongo
```

Next lets configure our Apostrophe container:

```
apostrophe:
  container_name: apostrophe
  restart: always
  build: .
  ports:
    - "3000:3000"
  volumes:
    - ./data/uploads:/app/public/uploads
  environment:
    - APOS_MONGODB_URI=mongodb://mongo:27017/db
  depends_on:
    - mongo
```

Now, we'll configure our Mongo container:

```
mongo:
  container_name: mongo
  image: mongo
  restart: always
  volumes:
    - ./data/db:/data/db
  expose:
    - "27017"
```

Finally, fire up the network with `docker-compose`

```
docker-compose up
```

If everything works, you should see your Apostrophe site at (localhost:3000)[http://localhost:3000]

To stop all the containers, run

```
docker-compose down
```

If somethings not quite right, check the terminal log or Docker Desktop log to debug the issue. Then, after making your modifications restart the network using

```
docker-compose up --build
```

The `--build` argument tells Docker to rebuild the images before starting the new containers. Without that argument, Docker will restart the network using the cached, "broken" images.

## Adding the Admin user

After the containers are running, we can add the admin user. But, unlike how we added the admin user previously, we need to add the user _inside_ the container where Apostrophe is running.

To view running containers, run

```
docker ps
```

Note the id of the `mysite_apostrophe` container.

To run a command in the container, run

```
docker exec -it { your container id } /bin/bash
```

This will essentially ssh you into the Apostrophe container. From there you can run the `apostrophe-users:add` command.

Then to exit the container, run `exit`. You should now be able to log in to your site as the admin user.
