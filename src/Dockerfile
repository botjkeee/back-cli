# syntax = docker/dockerfile:experimental

ARG NODE_VERSION
FROM node:$NODE_VERSION-alpine AS build_app

WORKDIR /usr/src/app/
RUN apk add make g++ gcc python3 git && npm install -g npm@latest

COPY package*.json /usr/src/app/
RUN npm ci --no-audit

COPY . /usr/src/app

FROM node:$NODE_VERSION-alpine AS build_modules

WORKDIR /usr/src/app/
RUN apk add make g++ gcc python3 git && npm install -g npm@latest

COPY package*.json /usr/src/app/
RUN npm ci --only=production --no-audit

FROM node:$NODE_VERSION-alpine

WORKDIR /app
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["npm", "start"]

RUN apk add --no-cache tini

COPY --from=build_modules /usr/src/app/node_modules /app/node_modules
COPY --from=build_app /usr/src/app /app
COPY package*.json /app/
