FROM node:19-alpine3.17

WORKDIR /app

COPY app.js .
COPY package.json .
COPY package-lock.json .

RUN npm install

ENTRYPOINT [ "node", "app.js"]
