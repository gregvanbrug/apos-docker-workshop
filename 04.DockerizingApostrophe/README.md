# Dockerizing Apostrophe

## Requirements

Apostrophe needs a couple things to run, Node and MongoDB. We'll also want persistent data when the site is started.

We'll use `docker-compose` to create a network for each of our containers and provide some Volumes so that we can persist some data.

## Compose

In the `mysite` directory, create a `docker-compose.yml` file. This is where you'll define your services.

You'll also need a `Dockerfile` to define the Apostrophe image. This should be similar to the Express example created in the prior TODO.

Once you've configured your services in your compose file start the network using

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

The `--build` argument tells Docker to rebuild the images before starting the new containers. Without that argument, Docker will restart the network using the cached and "broken" images.

## Adding the Admin user

After the containers are running, we can add the admin user. But, unlike how we added the admin user previously, we need to add the user inside the container where Apostrophe is running.

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
