FROM node:19-slim

WORKDIR /app

COPY app.js .
COPY package.json .
COPY package-lock.json .

RUN npm install

RUN apt update && \
    apt install -y wget netcat && \
    wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && \
    chmod +x /usr/bin/wait-for

ENTRYPOINT [ "node", "app.js"]
