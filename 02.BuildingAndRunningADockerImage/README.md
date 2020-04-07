# 02 Building and Running a Docker Image

## Create your Dockerfile

Create a `Dockerfile`. This is where you will add commands that will assemble the image.

This image should run a basic [Express](https://expressjs.com/) server that prints "Hello world" when a user visits [http://localhost:3000](http://localhost:3000)

If you've never used express before an example is here: [Hello World Express example](https://expressjs.com/en/starter/hello-world.html)

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

And lastly, a simple way to remove your image and container if something is wrong is the prune command:

```
docker system prune -a
```
