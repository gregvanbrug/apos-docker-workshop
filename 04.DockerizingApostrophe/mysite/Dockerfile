FROM node:12

WORKDIR /app

COPY package.json .

RUN npm i

COPY lib lib
COPY scripts/wait-for-it.sh scripts/wait-for-it.sh
COPY views views
COPY app.js .

CMD [ "./scripts/wait-for-it.sh", "mongo:27017", "--", "node", "app.js" ]
